import type { ReactElement } from 'react';

import databaseImgUrl from '../../../assets/database.svg';
import deploymentImgUrl from '../../../assets/deployment.svg';
import developmentImgUrl from '../../../assets/development.svg';
import frontendImgUrl from '../../../assets/front-end.svg';
import { FloatingCard } from '../../../components/FloatingCard/FloatingCard';
import styles from './SectionSkills.module.scss';

export const SectionSkills = (): ReactElement => {
  return (
    <section className={styles['section-skills-container']} id="stacks">
      <FloatingCard
        imgSrc={frontendImgUrl}
        items={[
          'HTML | CSS | JAVASCRIPT',
          'ANGULAR | REACT | REDUX',
          'Webpack | WASM',
          'FIGMA | ADOBEXD',
        ]}
        title="FRONT-END"
      />
      <FloatingCard
        imgSrc={developmentImgUrl}
        items={['NODEJS WITH EXPRESS', 'ASP.NET', 'NestJS', 'MVC | WEB API']}
        title="BACK-END"
      />
      <FloatingCard
        imgSrc={databaseImgUrl}
        items={['MYSQL', 'MONGODB', 'POSTGRES', 'SQL SERVER']}
        title="DATABASE"
      />
      <FloatingCard
        imgSrc={deploymentImgUrl}
        items={[
          'TRAVIS CI | JENKINS',
          'DOCKER | KUBERNETES',
          'AWS | GOOGLE CLOUD | HEROKU',
          'GIT & GITHUB | NX Monorepo',
        ]}
        title="DEVOPS"
      />
    </section>
  );
};
