import React, { memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  notificationsActions,
  notificationsSelector,
} from 'store/notifications';
import {
  Notification,
  NotificationProps,
} from '@alfalab/core-components/notification';
import { NotificationManager } from '@alfalab/core-components/notification-manager';

export const Notifications = memo(() => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(notificationsSelector);

  const handleRemoveNotification = useCallback(
    (id: string) => {
      dispatch(notificationsActions.remove(id));
    },
    [dispatch]
  );

  const notificationsList = useMemo(
    () =>
      notifications.map((notification: NotificationProps) => {
        const { id, title, badge, autoCloseDelay, children } =
          notification || {};

        return (
          <Notification
            key={id}
            id={id}
            title={title}
            badge={badge}
            autoCloseDelay={autoCloseDelay}
          >
            {children}
          </Notification>
        );
      }),
    [notifications]
  );

  return (
    <NotificationManager
      notifications={notificationsList}
      onRemoveNotification={handleRemoveNotification}
    />
  );
});
