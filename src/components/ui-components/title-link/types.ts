import { TitleProps } from '@alfalab/core-components/typography';

export type TitleLinkType = TitleProps & {
  text: string;
  route: string;
  children?: React.ReactNode;
};
