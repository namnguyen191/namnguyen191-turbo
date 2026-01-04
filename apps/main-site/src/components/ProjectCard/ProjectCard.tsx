import chroma from 'chroma-js';
import type { ReactElement } from 'react';

import { RotatingCard } from '../RotatingCard/RotatingCard';
import { ToolTip } from '../ToolTip/ToolTip';
import GithubIconUrl from './images/github-square-brands.svg';
import styles from './ProjectCard.module.scss';

export type ProjectCardProps = {
  title: string;
  stacks: [string, string, string, string, string?];
  description: string;
  siteUrl?: string;
  githubUrl?: string;
  primaryColor?: string;
  imgUrl: string;
};

export const ProjectCard = (props: ProjectCardProps): ReactElement => {
  const { title, stacks, description, siteUrl, githubUrl, imgUrl, primaryColor = '#fff' } = props;

  const cssVariables = {
    '--non-hover-bg': `linear-gradient(
      152deg,
      #fff,
      ${chroma(primaryColor).brighten(0.8).hex()}
    )`,
    '--card-front-bg': chroma(primaryColor).darken(1.2).hex(),
    '--card-front-bg-img-url': `url(${imgUrl})`,
    '--card-front-title-color': chroma(primaryColor).brighten(2).hex(),
    '--card-front-title-bg': `linear-gradient(
      to right bottom,
      ${chroma(primaryColor).brighten(0.5).alpha(0.75).hex()},
      ${chroma(primaryColor).darken(1.8).alpha(0.75).hex()}
    )`,
    '--card-back-bg': `linear-gradient(
        to right bottom,
        #000,
        ${chroma(primaryColor).darken(0.5).hex()}
    )`,
    '--card-back-url-bg': `linear-gradient(
          52deg,
          ${chroma(primaryColor).darken(1).hex()},
          ${chroma(primaryColor).brighten(1.8).hex()}
    )`,
    '--card-back-non-hover-url-bg': `linear-gradient(
          to right,
          ${chroma(primaryColor).darken(1).hex()},
          ${chroma(primaryColor).darken(1.5).hex()}
    )`,
    '--card-back-github-url-hover-color': chroma('#101d2c').brighten(0.9).hex(),
  } as React.CSSProperties;

  return (
    <div className={styles['project-card-container']} style={cssVariables}>
      <RotatingCard>
        <div className={styles['front-container']} key="front">
          <div className={styles['top']}>
            <div className={styles['title']}>
              <span>{title}</span>
            </div>
          </div>
          <div className={styles['bottom']}>
            <ul>
              {stacks.map((stack) => (
                <li key={stack}>{stack}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles['back-container']} key="back">
          {description && <span className={styles['description']}>{description}</span>}
          {siteUrl && (
            <a href={siteUrl} className={styles['siteUrl']} target="_blank" rel="noreferrer">
              View Site
            </a>
          )}
          {githubUrl && (
            <ToolTip text="Github Source">
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <img src={GithubIconUrl} className={styles['githubUrl']} />
              </a>
            </ToolTip>
          )}
        </div>
      </RotatingCard>
    </div>
  );
};
