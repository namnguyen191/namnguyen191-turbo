import type { ReactElement } from 'react';

import { RotatingCard } from '../RotatingCard/RotatingCard';
import styles from './ToBeContinuedCard.module.scss';

export const ToBeContinuedCard = (): ReactElement => {
  return (
    <div className={styles['to-be-continued-card-container']}>
      <RotatingCard>
        <div className={styles['card-front-container']} key="front">
          <span>And More To Come!</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: 'auto',
              background: '#fff',
              display: 'block',
            }}
            width="15rem"
            height="15rem"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <g transform="translate(20 50)">
              <circle cx={0} cy={0} r={6} fill="#e15b64">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.375s"
                  calcMode="spline"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  values="0;1;0"
                  keyTimes="0;0.5;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g transform="translate(40 50)">
              <circle cx={0} cy={0} r={6} fill="#f8b26a">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.25s"
                  calcMode="spline"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  values="0;1;0"
                  keyTimes="0;0.5;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g transform="translate(60 50)">
              <circle cx={0} cy={0} r={6} fill="#abbd81">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.125s"
                  calcMode="spline"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  values="0;1;0"
                  keyTimes="0;0.5;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g transform="translate(80 50)">
              <circle cx={0} cy={0} r={6} fill="#81a3bd">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="0s"
                  calcMode="spline"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  values="0;1;0"
                  keyTimes="0;0.5;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </div>

        <div className={styles['card-back-container']} key="back">
          <span>&ldquo;I’M STILL LEARNING.&rdquo; MICHELANGELO</span>
        </div>
      </RotatingCard>
    </div>
  );
};
