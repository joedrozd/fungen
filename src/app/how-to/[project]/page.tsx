import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, Check, Clock3, Lightbulb, Signal } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/activities";
import { getProjectPhoto } from "@/lib/how-to-photos";
import { projects, projectTopics, summarizeProject } from "@/lib/home-projects";
import { ProjectCard } from "../ProjectCard";
import { howToMetadata } from "../metadata";
import styles from "../how-to.module.css";

type PageProps = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ id }) => ({ project: id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { project: id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  const title = project.searchTitle ?? `How to ${project.title.charAt(0).toLowerCase()}${project.title.slice(1)}`;
  const photo = getProjectPhoto(id, projectTopics[project.category].photo);
  return howToMetadata(`${title} | Fungen`, project.description, `${BASE_URL}/how-to/${id}`, "article", photo);
}

export default async function ProjectPage({ params }: PageProps) {
  const { project: id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  const topic = projectTopics[project.category];
  const photo = getProjectPhoto(id, topic.photo);
  const { level, time } = summarizeProject(project);
  const related = project.related.flatMap((relatedId) => {
    const guide = projects.find((item) => item.id === relatedId);
    return guide ? [summarizeProject(guide)] : [];
  });
  const breadcrumb = [{ name: "How-to", href: "/how-to" }, { name: project.title }];
  const trail = [
    { name: "Home", item: BASE_URL },
    { name: "How-to", item: `${BASE_URL}/how-to` },
    { name: project.title, item: `${BASE_URL}/how-to/${id}` },
  ];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
      }} />
      <Navigation breadcrumb={breadcrumb} />
      <main id="main-content" tabIndex={-1} className={styles.guide}>
        <article>
          <header className={styles.guideHeader}>
            <figure>
              <div className={styles.guidePhoto}>
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 934px) calc(100vw - 80px), 854px" style={{ objectPosition: photo.position }} />
              </div>
              <figcaption className={styles.photoCredit}>
                Illustrative photo by <a href={photo.url}>{photo.photographer} on Pexels</a>
              </figcaption>
            </figure>
            <div className={styles.guideIntro}>
              <Link href={`/how-to#${project.category}`}><ArrowLeft size={15} aria-hidden="true" />{topic.name}</Link>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <dl className={styles.guideMeta}>
                <div>
                  <dt className="sr-only">Estimated time</dt>
                  <dd><Clock3 size={15} aria-hidden="true" />{time}</dd>
                </div>
                <div>
                  <dt className="sr-only">Skill level</dt>
                  <dd><Signal size={15} aria-hidden="true" />{level}</dd>
                </div>
              </dl>
              <nav aria-label="On this page" className={styles.guideJumps}>
                <Button asChild size="sm"><a href="#steps">Jump to steps <ArrowDown aria-hidden="true" /></a></Button>
                <Button asChild size="sm" variant="outline"><a href="#tools">Tools and materials</a></Button>
                <Button asChild size="sm" variant="outline"><a href="#finish">Finishing checks</a></Button>
              </nav>
            </div>
          </header>

          <div className={styles.guideBody}>
            <section>
              <h2>Before you start</h2>
              <p>{project.preparation}</p>
            </section>

            <section id="tools" tabIndex={-1}>
              <h2>Tools and materials</h2>
              <ul className={styles.supplies} role="list">
                {project.supplies.map((supply) => (
                  <li key={supply}><Check size={15} aria-hidden="true" />{supply}</li>
                ))}
              </ul>
            </section>

            <section id="steps" tabIndex={-1}>
              <h2>Step-by-step instructions</h2>
              <ol className={styles.steps} role="list">
                {project.steps.map(([title, detail], index) => (
                  <li key={title}>
                    <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="finish" tabIndex={-1}>
              <h2>Check the result</h2>
              <p>{project.finish}</p>
              <div className={styles.tip}>
                <Lightbulb size={18} aria-hidden="true" />
                <div>
                  <h3>Troubleshooting</h3>
                  <p>{project.tip}</p>
                </div>
              </div>
            </section>
            {project.sources && (
              <section>
                <h2>References</h2>
                <ul className={styles.sources}>
                  {project.sources.map(({ href, label }) => (
                    <li key={href}><a className="text-primary underline underline-offset-4" href={href}>{label}</a></li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>

        <nav aria-label="Related how-to guides" className={styles.related}>
          <h2>Try another guide</h2>
          <ul className={styles.projectGrid}>
            {related.map((guide) => <ProjectCard key={guide.id} project={guide} />)}
          </ul>
          <Button asChild variant="outline" size="lg"><Link href="/how-to#guide-library">Browse all how-to guides</Link></Button>
        </nav>
      </main>
    </>
  );
}
