import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";

import { NotificationProps } from "@alfalab/core-components/notification";

export type NotificationsStateType = {
  notifications: NotificationProps[];
};

const initialState: NotificationsStateType = {
  notifications: [],
};

const NAME = "notifications";

type AddNotificationProps = NotificationProps & { id?: string };

const notifications: CaseReducer<
  NotificationsStateType,
  PayloadAction<AddNotificationProps>
> = (state, { payload: { title, badge } }) => {
  state.notifications.push({
    badge,
    title,
    children: "",
    autoCloseDelay: 3000,
    id: v1(),
  });
};

const remove: CaseReducer<NotificationsStateType, PayloadAction<string>> = (
  state,
  { payload }
) => {
  state.notifications = state.notifications.filter(
    (notification) => notification.id !== payload
  );
};

export const { reducer: notificationsReducer, actions: notificationsActions } =
  createSlice({
    name: NAME,
    initialState,
    reducers: {
      notifications,
      remove,
    },
  });
