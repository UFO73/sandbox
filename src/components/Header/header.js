import { forwardRef } from 'react';
import styles from './header.module.css';
import Magnetic from '../magnetic/magnetic';

const Header = forwardRef(function index(props, ref) {
  return (
    <div className={styles.header}>
        <Magnetic>
          <div className={styles.burger}>
            <div ref={ref} className={styles.bounds}></div>
          </div>
        </Magnetic>
    </div>
  )}
)

export default Header