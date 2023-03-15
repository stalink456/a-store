import React, { forwardRef } from "react";
import { MenuLinks } from "./menu-links";
import { MenuFooter } from "./menu-footer";
import { TitleLink } from "components/ui-components/title-link";
import { Space } from "@alfalab/core-components/space";
import { IconButton } from "@alfalab/core-components/icon-button";
import { TfiClose } from "react-icons/tfi";
import { SidePanelType } from "types";

import styles from "./menu.module.css";

export const Menu = React.memo(
  forwardRef<HTMLDivElement, SidePanelType>(({ open, handleOpenMenu }, ref) => {
    return (
      <div className={`${styles.menu} ${open ? styles.active : ""}`} ref={ref}>
        <Space direction="vertical">
          <Space className={styles.menu__header} direction="horizontal">
            <TitleLink
              view="xlarge"
              tag="h1"
              weight="bold"
              text="A-Store"
              route="/"
            />
          </Space>
          <Space direction="horizontal">
            <IconButton
              className={styles.menu_close}
              icon={TfiClose}
              size="s"
              onClick={handleOpenMenu}
            />
          </Space>
        </Space>
        <MenuLinks />
        <MenuFooter />
      </div>
    );
  })
);
