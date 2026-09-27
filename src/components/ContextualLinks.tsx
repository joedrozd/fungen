import Link from "next/link";
import type { ContextualLink } from "@/lib/activities";

export function ContextualLinks({ links }: { links?: ContextualLink[] }) {
  if (!links?.length) return null;
  return (
    <div className="my-6 space-y-3 text-foreground leading-relaxed">
      {links.map((link) => (
        <p key={link.href}>{link.before}{" "}<Link href={link.href} className="text-primary underline underline-offset-2">{link.label}</Link>{link.after}</p>
      ))}
    </div>
  );
}
