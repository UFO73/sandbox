import styles from '../index.css'
import { useRef } from 'react';
import Header from './Header/header';
import StickyCursor from './StickyCursor/stickyCursor';

export const App = () => {
  const stickyElement = useRef();

  return (
    <main className={styles.main}>
      <Header ref={stickyElement}/>
      <StickyCursor stickyElement={stickyElement}/>
    </main>
  );
};
