import { NextResponse } from "next/server";
import { getGitHubContributionsMultiYear } from "@/lib/github";

export async function GET() {
  const yearlyContributions = await getGitHubContributionsMultiYear(3, "kirtanchandak");

  return NextResponse.json({ yearlyContributions });
}
