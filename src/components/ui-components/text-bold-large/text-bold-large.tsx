import React from "react";
import { Typography } from "@alfalab/core-components/typography";
import { TextType } from "types";

export const TextBoldLarge: React.FC<TextType> = React.memo(({ text }) => {
  return (
    <React.Fragment>
      <Typography.Text tag="span" weight="bold" view="primary-large">
        {text}
      </Typography.Text>
    </React.Fragment>
  );
});
