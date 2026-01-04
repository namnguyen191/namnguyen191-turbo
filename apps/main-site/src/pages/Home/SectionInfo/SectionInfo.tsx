import type { ReactElement } from 'react';

import githubImgUrl from '../../../assets/github.svg';
import gmailImgUrl from '../../../assets/gmail.svg';
import linkedInImgUrl from '../../../assets/linkedin.svg';
import { AnimatedLink } from '../../../components/AnimatedLink/AnimatedLink';
import styles from './SectionInfo.module.scss';

export const SectionInfo = (): ReactElement => {
  return (
    <section className={styles['section-info-container']} id="about">
      <div className={styles['container']}>
        <h3>About Me</h3>
        <p>
          Hi there! I&apos;m Nam Nguyen from Toronto, Canada. I&apos;m currently a Full-time
          Front-end Developer at IBM. I recently graduated from York University and got my Bsc in
          Computer Science. I&apos;m a huge fan of web development and love spending my time
          learning more about web-based technologies.
        </p>
        <span className={styles['quote']}>
          “ Your mind is programmable – if you&apos;re not programming your mind, someone else will
          program it for you ” ‐ Jeremy Hammond
        </span>
      </div>
      <div className={styles['container']}>
        <h3>Contact Me At:</h3>
        <span className={styles['contact-link-container']}>
          <img src={linkedInImgUrl} alt="Linked Icon" width={35} height={35} />
          <AnimatedLink
            linkName="@LinkedIn: Nam Nguyen"
            url="https://www.linkedin.com/in/nam-nguyen-865226132"
          />
        </span>
        <span className={styles['contact-link-container']}>
          <img src={gmailImgUrl} alt="Gmail Icon" width={35} height={35} />
          <AnimatedLink
            linkName="@GMail: hoangnamnguyen191"
            url="mailto:hoangnamnguyen191@gmail.com"
          />
        </span>
        <span className={styles['contact-link-container']}>
          <img src={githubImgUrl} alt="Github Icon" width={35} height={35} />
          <AnimatedLink linkName="@GitHub: namnguyen191" url="https://github.com/namnguyen191" />
        </span>
      </div>
    </section>
  );
};
