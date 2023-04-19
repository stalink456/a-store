import React from 'react';
import { Page } from 'components/ui-components/page';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { GroupsCard } from 'components/groups-card';
import { Loading } from 'components/ui-components/loading';
import { useYourDesign } from 'hooks/use-your-design';

import style from './your-design.module.css';

export const YourDesign: React.FC = () => {
  const { groups, isLoading } = useYourDesign();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <div className={style.your_design}>
        <Space className={style.your_design__container} direction='vertical'>
          <Space direction='horizontal'>
            <Typography.Title
              className={style.your_design__title}
              tag='h1'
              view='xlarge'
              weight='bold'
            >
              Свой дизайн
            </Typography.Title>
          </Space>
          <Space direction='horizontal'>
            <Typography.Title
              className={style.your_design__subtitle}
              tag='h6'
              view='small'
              weight='medium'
            >
              Выберите вещь, а затем — цвет, размер и стикер. Перенесём стикер
              на вещь как на фото
            </Typography.Title>
          </Space>
          <GroupsCard items={groups} />
          <Space direction='horizontal' size={0}>
            <Typography.Title
              className={style.your_design__footer_text}
              tag='h6'
              weight='bold'
              color='tertiary'
            >
              Посмотреть и потрогать все стикеры можно в A-Store на Технопарке.
              А ещё там можно добавить сразу несколько стикеров на одну вещь.
            </Typography.Title>
          </Space>
        </Space>
      </div>
    </Page>
  );
};
