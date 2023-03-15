import React from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { DescriptionType } from "./types";
import { ProductForm } from "components/product-form";

import styles from "./description-with-from.module.css";

export const DescriptionWithForm: React.FC<DescriptionType> = React.memo(
  (props) => {
    const {
      id,
      preview,
      title,
      price,
      colors,
      sizes,
      stickerNumbers,
      description,
      availability,
    } = props;

    const renderForm = () => {
      return availability ? (
        <ProductForm
          id={id}
          title={title}
          preview={preview}
          price={price}
          colors={colors}
          sizes={sizes}
          stickerNumbers={stickerNumbers}
        />
      ) : (
        <Typography.Title
          tag="h2"
          weight="medium"
          view="small"
          color="negative"
        >
          Товара нет в наличии
        </Typography.Title>
      );
    };

    return (
      <div className={styles.product_description}>
        <Space direction="vertical" fullWidth size={15}>
          <Typography.Title tag="h1" weight="medium" view="small">
            {title}
          </Typography.Title>

          <Typography.Title tag="h2" weight="bold" view="small">
            {price} ₽
          </Typography.Title>

          {renderForm()}

          <Space
            direction="vertical"
            className={styles.product_description__text}
          >
            <Typography.Text tag="p" weight="medium" view="primary-small">
              {description}
            </Typography.Text>
          </Space>
        </Space>
      </div>
    );
  }
);
