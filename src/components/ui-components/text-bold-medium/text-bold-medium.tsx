import React from "react";
import { Typography } from "@alfalab/core-components/typography";
import { TextType } from "types";

export const TextBoldMedium: React.FC<TextType> = React.memo(({ text }) => {
  return (
    <React.Fragment>
      <Typography.Text tag="span" weight="bold" view="primary-medium">
        {text}
      </Typography.Text>
    </React.Fragment>
  );
});
