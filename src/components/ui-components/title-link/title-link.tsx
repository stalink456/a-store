import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { TitleLinkType } from './types';

export const TitleLink: React.FC<TitleLinkType> = React.memo(
  ({ view, tag, weight, text, route, children }) => {
    return (
      <React.Fragment>
        <Link to={route}>
          <Typography.Title tag={tag} weight={weight} view={view}>
            {text}
          </Typography.Title>
          {children}
        </Link>
      </React.Fragment>
    );
  }
);
