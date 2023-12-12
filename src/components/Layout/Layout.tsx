import { SideNavigation } from '../../containers/SideNavigation/SideNavigation';
import { List } from '../../containers/UsersList/List';

import styles from './layout.module.scss';

export const Layout = () => (
  <div className={styles.wrapper}>
    <SideNavigation />
    <List />
  </div>
);
