import {
  BaseSelectChangePayload,
  OptionShape,
} from '@alfalab/core-components/select';

export type ProductSelectType = {
  text: string;
  options: OptionShape[];
  selected: OptionShape | string;
  name: string;
  handleChangeSelect: (e: BaseSelectChangePayload) => void;
};
