import React from "react";
import { Space } from "@alfalab/core-components/space";
import { TitleLink } from "components/ui-components/title-link";
import { LoadableImage } from "components/ui-components/loadable-image";
import { MainPictureType } from "./types";

import styles from "./main-picture.module.css";

export const MainPicture: React.FC<MainPictureType> = ({
  src,
  text,
  route,
}) => {
  return (
    <React.Fragment>
      <Space className={styles.main__picture} direction="horizontal" fullWidth>
        <TitleLink tag="h1" weight="bold" text={text} route={route}>
          <LoadableImage src={src} alt={text} />
        </TitleLink>
      </Space>
    </React.Fragment>
  );
};
