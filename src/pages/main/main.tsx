import React from 'react';
import { MainPicture } from 'components/ui-components/main-picture';
import madeInAlfa from 'images/MadeInAlfa.jpeg';
import yourDesign from 'images/YourDesign.jpeg';

import styles from './main.module.css';

export const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <MainPicture
        src={madeInAlfa}
        text='Сделано в Альфе'
        route='/made-in-alfa'
      />
      <MainPicture src={yourDesign} text='Свой дизайн' route='/your-design' />
    </div>
  );
};
