import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { ProjectSummary } from "@/lib/home-projects";
import styles from "./how-to.module.css";

export function ProjectCard({
  project,
  heading: Heading = "h3",
  anchor = false,
}: {
  project: ProjectSummary;
  heading?: "h3" | "h4";
  anchor?: boolean;
}) {
  return (
    <li id={anchor ? project.id : undefined} className={styles.cardAnchor}>
      <Link href={`/how-to/${project.id}`} aria-labelledby={`${project.id}-title`} prefetch={false} className={styles.projectCard}>
        <div className={styles.cardMeta}>
          <span className={styles.levelBadge} data-level={project.level}>{project.level}</span>
          <span><Clock3 size={14} aria-hidden="true" />{project.time}</span>
        </div>
        <Heading id={`${project.id}-title`}>{project.title}</Heading>
        <p>{project.description}</p>
        <span className={styles.cardAction} aria-hidden="true">View guide <ArrowRight size={16} /></span>
      </Link>
    </li>
  );
}
