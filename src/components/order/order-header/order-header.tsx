import React from "react";
import { IconButton } from "@alfalab/core-components/icon-button";
import { Typography } from "@alfalab/core-components/typography";
import { Space } from "@alfalab/core-components/space";
import { TfiArrowLeft, TfiClose } from "react-icons/tfi";
import { useOrder } from "hooks/use-order";

import styles from "./order-header.module.css";

export const OrderHeader: React.FC = () => {
  const { handleOnCLose } = useOrder();

  return (
    <React.Fragment>
      <Space direction="horizontal" fullWidth className={styles.order__header}>
        <IconButton icon={TfiArrowLeft} size="s" onClick={handleOnCLose} />
        <Typography.Title tag="h3" weight="bold">
          Ваш заказ
        </Typography.Title>
        <IconButton icon={TfiClose} size="s" onClick={handleOnCLose} />
      </Space>
    </React.Fragment>
  );
};
