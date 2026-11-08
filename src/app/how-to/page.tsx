import Link from "next/link";
import { ArrowDown, ArrowRight, Hammer, Shirt, Wrench } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/activities";
import { projects, projectTopics, summarizeProject } from "@/lib/home-projects";
import { ProjectBrowser } from "./ProjectBrowser";
import { howToMetadata } from "./metadata";
import styles from "./how-to.module.css";

const title = "DIY & Home How-to Guides | Fungen";
const description = `Browse ${projects.length} step-by-step home guides, from quick repairs, cleaning and paper crafts to woodworking and sewing. Filter by skill and hands-on time.`;
const url = `${BASE_URL}/how-to`;

export const metadata = howToMetadata(title, description, url, "website");

const groups = Object.entries(projectTopics).map(([id, topic]) => ({
  id,
  name: topic.name,
  description: topic.description,
  photo: topic.photo,
  guides: projects.filter((project) => project.category === id).map(summarizeProject),
})).filter((group) => group.guides.length);

const startingPoints = [
  { href: "/how-to/tighten-a-cabinet-handle", title: "Tighten a loose cabinet handle", label: "Quick repair", icon: Wrench },
  { href: "/how-to/fold-a-fitted-sheet", title: "Fold a fitted sheet", label: "Everyday skill", icon: Shirt },
  { href: "/how-to/build-a-freestanding-book-crate", title: "Build a wooden book crate", label: "Longer project", icon: Hammer },
];

export default function HowToPage() {
  const guides = groups.flatMap((group) => group.guides);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "How-to", item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "DIY & home how-to guides",
      url,
      description,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `${url}/${guide.id}`,
        })),
      },
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Navigation breadcrumb={[{ name: "How-to" }]} />
      <main id="main-content" tabIndex={-1} className={styles.hub}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{projects.length} step-by-step guides</p>
            <h1>DIY &amp; home <span>how-to guides</span></h1>
            <p>
              Fix a loose handle, learn an everyday skill or take on a weekend build.
              See what you need, how long it takes and how to check the finished result.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href="#guide-library">Find a guide <ArrowDown aria-hidden="true" /></a>
            </Button>
          </div>
          <section className={styles.quickStart} aria-labelledby="quick-start-heading">
            <h2 id="quick-start-heading">A few places to start</h2>
            <ul>
              {startingPoints.map(({ href, title, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <Icon size={17} aria-hidden="true" />
                    <span><strong>{title}</strong><small>{label}</small></span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </header>

        <ProjectBrowser groups={groups} />
      </main>
    </>
  );
}
