import React, { useRef } from "react";
import { Space } from "@alfalab/core-components/space";
import { Button } from "@alfalab/core-components/button";
import { IconButton } from "@alfalab/core-components/icon-button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "components/menu";
import { TitleLink } from "components/ui-components/title-link";
import { useSidePanel } from "hooks/use-side-panel";

import styles from "./header.module.css";

export const Header: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { open, handleOpenMenu } = useSidePanel(menuRef);

  return (
    <div className={styles.header}>
      <Space direction="horizontal" className={styles.header__container}>
        <Space direction="horizontal">
          <TitleLink
            view="large"
            tag="h1"
            weight="bold"
            text="A-Store"
            route="/"
          />
        </Space>

        <Space className={styles.header__menu} direction="horizontal" size={8}>
          <IconButton
            icon={GiHamburgerMenu}
            view="primary"
            size="xs"
            onClick={handleOpenMenu}
          />
          <Button
            className={styles.header__menu_button}
            view="ghost"
            onClick={handleOpenMenu}
          >
            меню
          </Button>
        </Space>
      </Space>
      <Menu ref={menuRef} open={open} handleOpenMenu={handleOpenMenu} />
    </div>
  );
};
