import { FunctionComponent, useState, useRef, useCallback } from "react";
import styles from "./navBar.module.css";
import { ProfileDropdownMenu } from "./profileDropdown";

const NavBar: FunctionComponent = ({userName}) => {
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const openDropdownMenu = useCallback(() => {
    setDropdownMenuOpen(true);
  }, []);



  return (
    <>
      <nav className={styles.navbar}>
        <h2 className={styles.jairamFruitCompany}>Jairam Fruit Company</h2>
        <div
          className={styles.profile}
          ref={profileContainerRef}
          // onClick={openDropdownMenu}
        >
          <ProfileDropdownMenu userName={userName}/>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
