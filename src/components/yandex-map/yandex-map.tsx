import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import styles from './yandex-map.module.css';

export const YandexMap: React.FC = React.memo(() => {
  return (
    <div className={styles.yandex_map}>
      <YMaps>
        <Map
          defaultState={{
            center: [55.694459, 37.661994],
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl'],
          }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          style={{ height: '100%', width: '100%' }}
        >
          <Placemark
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            defaultGeometry={[55.694459, 37.661994]}
            properties={{
              hintContent: 'Альфа-Банк',
              balloonContent: 'Штаб-квартира на Технопарке',
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
});
