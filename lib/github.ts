export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

export interface YearContributions {
  year: number;
  total: number;
  days: ContributionDay[];
}

const GITHUB_USERNAME = "kirtanchandak";

/**
 * Fetches contribution calendar from GitHub GraphQL API for a specific year.
 * Pass `from` and `to` as ISO date strings (e.g. "2024-01-01T00:00:00Z").
 */
export async function getGitHubContributionsForYear(
  year: number,
  username = GITHUB_USERNAME
): Promise<YearContributions | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not found — returning null for year", year);
    return null;
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username, from, to } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const cal =
      data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!cal) return null;

    const days: ContributionDay[] = [];
    for (const week of cal.weeks) {
      for (const day of week.contributionDays) {
        const c = day.contributionCount;
        let level = 0;
        if (c > 0) level = 1;
        if (c > 3) level = 2;
        if (c > 6) level = 3;
        if (c > 10) level = 4;
        days.push({ date: day.date, count: c, level });
      }
    }

    return { year, total: cal.totalContributions ?? 0, days };
  } catch (err) {
    console.error(`Error fetching GitHub contributions for ${year}:`, err);
    return null;
  }
}

/**
 * Fetches contributions for the last N years in parallel.
 */
export async function getGitHubContributionsMultiYear(
  yearsBack = 3,
  username = GITHUB_USERNAME
): Promise<YearContributions[]> {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: yearsBack }, (_, i) => currentYear - i);

  const results = await Promise.all(
    years.map((y) => getGitHubContributionsForYear(y, username))
  );

  return results.filter((r): r is YearContributions => r !== null);
}
