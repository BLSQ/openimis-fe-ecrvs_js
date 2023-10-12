import {
  decodeId,
  formatGraphQLError,
  formatServerError,
  pageInfo,
  parseData,
} from '@openimis/fe-core';

import {
  REQUEST, SUCCESS, ERROR,
} from './utils/action-type';


export const ACTION_TYPE = {
  SEARCH_HERA_NOTIFICATIONS: 'SEARCH_HERA_NOTIFICATIONS',
  SEARCH_HERA_SUBSCRIPTIONS: 'SEARCH_HERA_SUBSCRIPTIONS',
  CREATE_HERA_SUBSCRIPTION: 'CREATE_HERA_SUBSCRIPTION',
  DELETE_HERA_SUBSCRIPTION: 'DELETE_HERA_SUBSCRIPTION',
};

function reducer(
  state = {
    fetchingHeraNotifications: false,
    fetchedHeraNotifications: false,
    heraNotifications: [],
    heraNotificationsPageInfo: {},
    heraNotificationsTotalCount: 0,
    errorHeraNotifications: null,
  },
  action,
) {
  switch (action.type) {
    case REQUEST(ACTION_TYPE.SEARCH_HERA_NOTIFICATIONS):
      return {
        ...state,
        fetchingHeraNotifications: true,
        fetchedHeraNotifications: false,
        heraNotifications: [],
        heraNotificationsPageInfo: {},
        heraNotificationsTotalCount: 0,
        errorHeraNotifications: null,
      };
    case SUCCESS(ACTION_TYPE.SEARCH_HERA_NOTIFICATIONS):
        return {
          ...state,
          fetchingHeraNotifications: false,
          fetchedHeraNotifications: true,
          heraNotifications: parseData(action.payload.data.heraNotifications)?.map((heraNotification) => ({
            ...heraNotification,
            id: decodeId(heraNotification.id),
          })),
          heraNotificationsPageInfo: pageInfo(action.payload.data.heraNotifications),
          heraNotificationsTotalCount: action.payload.data.heraNotifications ? action.payload.data.heraNotifications.totalCount : 0,
          errorHeraNotifications: formatGraphQLError(action.payload),
        };
    case ERROR(ACTION_TYPE.SEARCH_HERA_NOTIFICATIONS):
        return {
          ...state,
          fetchingHeraNotifications: false,
          errorHeraNotifications: formatServerError(action.payload),
        };
    default:
      return state;
  }
}

export default reducer;
