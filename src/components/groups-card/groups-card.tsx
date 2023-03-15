import React from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { ProductsCard } from "components/products-card";
import { GroupsCardType } from "./types";

import style from "./groups-card.module.css";

export const GroupsCard: React.FC<GroupsCardType> = React.memo(({ items }) => {
  return (
    <div className={style.groups__card}>
      {items.map(({ title, description, products }, id) => (
        <Space direction="vertical" fullWidth key={id} size={0}>
          <Space
            className={style.groups__card_title}
            direction="vertical"
            fullWidth
          >
            <Typography.Title tag="h1" view="xlarge" weight="bold">
              {title}
            </Typography.Title>
          </Space>
          <Space
            className={style.groups__card_sub_title}
            direction="vertical"
            fullWidth
          >
            <Typography.Title tag="h6" view="small" weight="medium">
              {description}
            </Typography.Title>
          </Space>
          <Space
            className={style.groups__card__products}
            direction="horizontal"
            wrap
            size={0}
          >
            {products.map((value, id) => (
              <ProductsCard {...value} key={id} />
            ))}
          </Space>
        </Space>
      ))}
    </div>
  );
});
