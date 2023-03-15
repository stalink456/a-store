import React from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";

import styles from "./footer.module.css";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Space direction="horizontal" fullWidth>
        <Typography.Text tag="p" weight="medium" color="disabled">
          © ООО «Альфа Фьюче Пипл», 2023
        </Typography.Text>
      </Space>
    </div>
  );
};
