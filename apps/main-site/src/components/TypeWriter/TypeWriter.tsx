import { type ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import styles from './TypeWriter.module.scss';

export type TypeWriterProps = {
  writerTexts: string[];
  typeSpeed?: number;
  pauseTime?: number;
};

export const TypeWriter = (props: TypeWriterProps): ReactElement => {
  const { writerTexts, typeSpeed = 180, pauseTime = 2000 } = props;

  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const wordIndex = useRef(0);
  const typeDelay = useRef(3000);

  const type = useCallback(() => {
    // Current Word Index
    const currentWordIndex = wordIndex.current % writerTexts.length;

    // Full Text of the current word
    const fullText = writerTexts[currentWordIndex]!;

    // Check if in Deleting State
    if (isDeleting) {
      // Remove a char
      setDisplay((cur) => cur.substring(0, cur.length - 1));
    } else {
      // Add a char
      setDisplay((cur) => fullText.substring(0, cur.length + 1));
    }

    // If is in deleting mode, speed up typing speed
    typeDelay.current = isDeleting ? typeSpeed / 2 : typeSpeed;

    // Check if the word is complete
    if (!isDeleting && display === fullText) {
      // Pause at the end of the word
      typeDelay.current = pauseTime;
      // Set delete to true
      setIsDeleting(true);
    } else if (isDeleting && display === '') {
      // Change mode to writing
      setIsDeleting(false);
      // Move to the next word
      wordIndex.current++;
      // Pause before typing again
      typeDelay.current = pauseTime;
    }
  }, [display, isDeleting, pauseTime, typeSpeed, writerTexts]);

  useEffect(() => {
    setTimeout(() => {
      type();
    }, typeDelay.current);
  });

  return <div className={styles['type-writer-container']}>{display}</div>;
};
