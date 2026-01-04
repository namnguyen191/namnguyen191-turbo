import type { CSSProperties, ReactElement } from 'react';

import djuiImgUrl from '../../../assets/dj-ui.webp';
import namPhotoUrl from '../../../assets/nam-photo-no-bg.webp';
import natourImgUrl from '../../../assets/natour.webp';
import { BubbleDisplay } from '../../../components/BubbleDisplay/BubbleDisplay';
import { TypeWriter } from '../../../components/TypeWriter/TypeWriter';
import styles from './SectionIntro.module.scss';

export const SectionIntro = (): ReactElement => {
  return (
    <div
      className={styles['section-intro-container']}
      id="home"
      style={
        {
          '--nam-photo-url': `url(${namPhotoUrl})`,
        } as CSSProperties
      }
    >
      <div className={styles['head-lines']}>
        <h1>
          Nam Nguyen The{' '}
          <div className={styles['type-writer-container']}>
            <TypeWriter writerTexts={['Developer', 'Designer', 'Learner']} pauseTime={1500} />
          </div>
        </h1>
        <span>Welcome to my page!</span>
      </div>

      <div className={styles['top-3-projects']}>
        <h2>Top Projects</h2>
        <BubbleDisplay
          title="DJ UI"
          description="Angular | NX"
          imgUr={djuiImgUrl}
          url="https://fullstacknam.dev/dj-ui"
        />
        <BubbleDisplay
          title="Natours"
          description="Sass | Advanced CSS"
          imgUr={natourImgUrl}
          url="https://namnguyen191.github.io/Natours/"
        />
        <BubbleDisplay
          title="Snake game"
          description="WASM with Rust"
          imgUr="https://i0.wp.com/tilcode.blog/wp-content/uploads/2019/04/Screen-Shot-2019-04-28-at-17.51.16.png?fit=998%2C574&ssl=1"
          url="https://fullstacknam.dev/js-rust-snake-game/"
        />
        <BubbleDisplay
          title="Clipit!"
          description="Angular"
          imgUr="https://github.com/namnguyen191/clipit/blob/master/src/assets/img/1.jpg?raw=true"
          url="https://clipit-drab.vercel.app/"
        />
      </div>
    </div>
  );
};
