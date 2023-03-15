import React from "react";
import { useNavigate } from "react-router-dom";
import { Space } from "@alfalab/core-components/space";
import { Button } from "@alfalab/core-components/button";
import { Typography } from "@alfalab/core-components/typography";

import styles from "./not-found.module.css";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.not_found}>
      <Space direction="vertical" align="center" size={20}>
        <Space
          direction="horizontal"
          className={styles.not_found__text}
          fullWidth
        >
          <Typography.Title tag="h1" view="large">
            Извините, что-то пошло не так
          </Typography.Title>
        </Space>
        <Space direction="horizontal">
          <Button view="secondary" block onClick={handleClick}>
            Главная страница
          </Button>
        </Space>
      </Space>
    </div>
  );
};
