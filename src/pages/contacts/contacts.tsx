import React from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { TextBoldLarge } from "components/ui-components/text-bold-large";
import { TextBoldMedium } from "components/ui-components/text-bold-medium";
import { YandexMap } from "components/yandex-map";

import styles from "./contacts.module.css";

export const Contacts: React.FC = () => {
  return (
    <div className={styles.contacts}>
      <Space direction="vertical" fullWidth align="start">
        <Space direction="horizontal" size={5}>
          <Typography.Title
            className={styles.contacts__title}
            tag="h1"
            view="xlarge"
            weight="bold"
          >
            Контакты
          </Typography.Title>
        </Space>

        <Space direction="vertical" className={styles.contacts__info} fullWidth>
          <Space direction="vertical" size={0}>
            <TextBoldMedium text="+7 906 061 60 20" />
            <TextBoldMedium text=" info@alfabankstore.ru" />
          </Space>

          <TextBoldMedium text="г. Москва, пр-т Андропова, 18 корп. 3" />

          <Space direction="vertical" size={0}>
            <TextBoldLarge text="пн-чт:" />
            <TextBoldMedium text="10:00—19:00" />
            <TextBoldLarge text="пт:" />
            <TextBoldMedium text=" 10:00—17:30" />
          </Space>

          <TextBoldMedium text=" Принимаем к оплате карты Visa, Mastercard, МИР." />
        </Space>
        <YandexMap />
      </Space>
    </div>
  );
};
