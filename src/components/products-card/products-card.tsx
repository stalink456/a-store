import React from "react";
import { Link } from "react-router-dom";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { LoadableImage } from "components/ui-components/loadable-image";
import { ProductsCardType } from "./types";

import styles from "./products-card.module.css";

export const ProductsCard: React.FC<ProductsCardType> = ({
  id,
  preview,
  title,
  subtitle,
  price,
}) => {
  return (
    <div className={styles.products_card}>
      <Link to={`/product/${id}`}>
        <Space direction="vertical" size={0} wrap>
          <Space direction="horizontal">
            <LoadableImage src={preview} alt={title} />
          </Space>
          <Space direction="horizontal">
            <Typography.Title tag="h6" view="xsmall" weight="medium">
              {title}
            </Typography.Title>
          </Space>
          {subtitle ? (
            <Space direction="horizontal">
              <Typography.Text
                tag="p"
                view="primary-medium"
                weight="bold"
                color="tertiary-inverted"
                data-testid={`subtitle-${id}`}
              >
                {subtitle}
              </Typography.Text>
            </Space>
          ) : null}
          <Space direction="horizontal" size={0}>
            <Typography.Text
              tag="p"
              weight="bold"
              view="primary-large"
              data-testid={`price-${id}`}
            >
              {price} ₽
            </Typography.Text>
          </Space>
        </Space>
      </Link>
    </div>
  );
};
