import React from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { Select } from "@alfalab/core-components/select";
import { ProductSelectType } from "./types";
import { capitalizeFirstLetter } from "utils/common";

export const TitleWithSelect: React.FC<ProductSelectType> = React.memo(
  ({ text, options, selected, name, handleChangeSelect }) => {
    return (
      <React.Fragment>
        <Space direction="vertical">
          <Typography.Text tag="p">
            {capitalizeFirstLetter(text)}
          </Typography.Text>
        </Space>
        <Select
          options={options}
          name={name}
          optionsSize="s"
          selected={selected}
          onChange={handleChangeSelect}
          placeholder={`Выберите ${text}`}
          block
        />
      </React.Fragment>
    );
  }
);
