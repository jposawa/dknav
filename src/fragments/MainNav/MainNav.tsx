import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import { ROUTES } from "@/constants";

import styles from "./MainNav.module.css";

export const MainNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to={ROUTES.MODULES.path}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : styles.link
        }
      >
        <AppstoreOutlined />
        {ROUTES.MODULES.label}
      </NavLink>

      <NavLink
        to={ROUTES.PROFILE.path}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.linkActive}` : styles.link
        }
      >
        <UserOutlined />
        {ROUTES.PROFILE.label}
      </NavLink>
    </nav>
  );
};
