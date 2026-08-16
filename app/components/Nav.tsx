import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Nav() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-[720px] items-center justify-between px-6 pb-2 pt-7 max-sm:px-5 max-sm:pt-5">
        <Link
          href="/#top"
          className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-900 no-underline"
        >
          Kirtan Chandak
        </Link>
        <nav className="flex items-center gap-7 max-sm:gap-4" aria-label="Page">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-900 no-underline transition-colors hover:text-neutral-500 max-sm:text-[13px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
