import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import {
  BLACKLISTED_CONTRIBUTORS,
  CONTRIBUTORS,
} from "@site/data/contributors";
import { Contributor } from "@site/data/Contributors.interface";

const studyYears = [
  {
    number: "1",
    title: "Première année",
    description: "Fondations, algorithmes, logique et systèmes.",
    to: "/docs/category/year-1",
  },
  {
    number: "2",
    title: "Deuxième année",
    description:
      "Conception, complexité, optimisation et intelligence artificielle.",
    to: "/docs/category/year-2",
  },
  {
    number: "3",
    title: "Troisième année",
    description: "Les ressources de cette année arrivent prochainement.",
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Ressources pour les étudiants ENSI</p>
        <h1>{siteConfig.title}</h1>
        <p className={styles.heroCopy}>
          Cours, exercices, corrections et outils pour avancer avec plus de
          clarté tout au long de l'année.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/docs/intro">
            Commencer à explorer
          </Link>
          <a
            className={styles.secondaryAction}
            href="https://github.com/Yahya8bit/ensi-survival-kit"
          >
            Voir le projet
          </a>
        </div>
      </div>
    </header>
  );
}

interface ContributorListProps {
  contributors: Contributor[];
}

const ContributorList: React.FC<ContributorListProps> = ({ contributors }) => {
  if (contributors.length === 0) return null;

  return (
    <section
      className={styles.contributors}
      aria-labelledby="contributors-title"
    >
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Communauté</p>
        <h2 id="contributors-title">Construit avec les étudiants</h2>
      </div>
      <div className={styles.avatarGrid}>
        {contributors.map((e) => (
          <a
            key={e.id}
            className={styles.contributor}
            title={`${e.login}: ${e.contributions} contributions`}
            target="_blank"
            rel="noopener noreferrer"
            href={e.html_url}
          >
            <img src={e.avatar_url} alt={`Profil GitHub de ${e.login}`} />
          </a>
        ))}
      </div>
    </section>
  );
};

const filteredContributors = CONTRIBUTORS.filter(
  (e) => !BLACKLISTED_CONTRIBUTORS.find((x) => x === e.login)
);

export default function Home(): JSX.Element {
  return (
    <Layout title={`Home`} description="">
      <HomepageHeader />
      <main>
        <section className={styles.studySection} aria-labelledby="study-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Votre espace d'étude</p>
            <h2 id="study-title">Trouver le bon point de départ</h2>
            <p>
              Naviguez par année, retrouvez les supports de cours et gardez les
              exercices à portée de main.
            </p>
          </div>
          <div className={styles.yearGrid}>
            {studyYears.map((year) => {
              const content = (
                <>
                  <span className={styles.yearNumber} aria-hidden="true">
                    {year.number}
                  </span>
                  <span>
                    <strong>{year.title}</strong>
                    <small>{year.description}</small>
                  </span>
                </>
              );

              return year.to ? (
                <Link className={styles.yearLink} key={year.title} to={year.to}>
                  {content}
                </Link>
              ) : (
                <div className={styles.yearPlaceholder} key={year.title}>
                  {content}
                </div>
              );
            })}
          </div>
        </section>
        <ContributorList contributors={filteredContributors} />
      </main>
    </Layout>
  );
}
