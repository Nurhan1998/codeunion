import { Menu } from 'antd';

import { menuItems } from './constants';
import styles from './sideNavigation.module.scss';
export const SideNavigation = () => (
  <Menu
    rootClassName={styles.menu}
    // style={{
    //   width: 100,
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   gap: 10,
    // }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
    items={menuItems}
  />
);
