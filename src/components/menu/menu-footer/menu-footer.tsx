import React from "react";
import { IconButton } from "@alfalab/core-components/icon-button";
import { Space } from "@alfalab/core-components/space";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";

import styles from "./menu-footer.module.css";

export const MenuFooter = () => {
  return (
    <React.Fragment>
      <Space direction="vertical" className={styles.menu__footer}>
        <Space direction="horizontal">
          <IconButton
            className={styles.menu__footer_icon}
            icon={GrMail}
            size="xs"
            href="mailto:info@alfabankstore.ru"
            target="_blank"
            data-testid="icon-1"
          />
          <IconButton
            className={styles.menu__footer_icon}
            icon={BsTelephoneFill}
            size="xs"
            href="tel:+7 906 061-60-20"
            target="_blank"
            data-testid="icon-2"
          />
          <IconButton
            className={styles.menu__footer_icon}
            icon={IoLogoWhatsapp}
            size="xs"
            href="https://wa.me/79060616020"
            target="_blank"
            data-testid="icon-3"
          />
        </Space>
      </Space>
    </React.Fragment>
  );
};
