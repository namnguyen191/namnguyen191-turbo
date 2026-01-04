import { type ReactElement, useEffect, useState } from 'react';

import { ToBeContinuedCard } from '../../../components/CustomEndingCard/ToBeContinuedCard';
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { ProjectCard, type ProjectCardProps } from '../../../components/ProjectCard/ProjectCard';
import { getFile, getUserRepos, type Repo } from '../../../utils/api/github.api';
import styles from './SectionProjects.module.scss';

type RepoMetaData = {
  imgUrl: string;
  stacks: [string, string, string, string, string?];
  primaryColor: string;
  title: string;
};

const getProjects = async (): Promise<ProjectCardProps[]> => {
  const pageLength = 100;
  let page = 1;

  const accumulatedRepo: Repo[] = [];
  while (true) {
    const repos = await getUserRepos({
      user: 'namnguyen191',
      pageLength,
      pageNumber: page,
    });

    if (!repos) break;
    accumulatedRepo.push(...repos);

    if (repos?.length < pageLength) break;

    page++;
  }

  const projectCardsProps: ProjectCardProps[] = [];

  for (const repo of accumulatedRepo) {
    if (repo.topics.indexOf('featured') === -1) continue;

    const readme = await getFile('namnguyen191', repo.name, repo.default_branch, 'README.md');

    if (!readme) continue;

    const metaDataRegex = /(?<=\*\*\*MetaData\*\*\*\s*)(.*?)(?=\s*\*\*\*MetaData\*\*\*)/gs;
    const jsonRegex = /{(.*?)}/gs;

    const rawJson = readme.match(metaDataRegex)?.[0]?.match(jsonRegex)?.[0];

    if (!rawJson) {
      console.warn('invalid or non-existing meta data for project: ', repo.full_name);
      continue;
    }

    let parseMetaData: RepoMetaData;
    try {
      parseMetaData = JSON.parse(rawJson);
    } catch (_error) {
      console.warn('something went wrong trying to parse project meta data: ', rawJson);
      continue;
    }

    const projectCardProp: ProjectCardProps = {
      ...parseMetaData,
      description: repo.description ?? 'No description',
      siteUrl: repo.homepage ?? 'https://github.com',
      githubUrl: repo.html_url,
    };
    projectCardsProps.push(projectCardProp);
  }

  return projectCardsProps;
};

export const SectionProjects = (): ReactElement => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const renderProjectsCard = (): ReactElement | ReactElement[] => {
    if (loading) return <LoadingSpinner scale="3" />;

    if (!projects.length) return <div>There&rsquo;s no project to display</div>;

    return projects.map((project) => (
      <div key={project.githubUrl} className={styles['card-animation-container']}>
        <ProjectCard {...project} />
      </div>
    ));
  };

  useEffect(() => {
    if (loading) {
      getProjects().then((projectsMetaData) => {
        setLoading(false);
        setProjects(projectsMetaData);
      });
    }
  }, [loading]);

  return (
    <section className={styles['section-projects-container']} id="projects">
      <h3>PROJECTS PORTFOLIO</h3>
      <div className={styles['cards-container']}>
        {renderProjectsCard()}
        <ToBeContinuedCard />
      </div>
    </section>
  );
};
