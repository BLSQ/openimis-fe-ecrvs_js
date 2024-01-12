import {
  decodeId,
  dispatchMutationErr,
  dispatchMutationReq,
  dispatchMutationResp,
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
    fetchingHeraSubscriptions: false,
    fetchedHeraSubscriptions: false,
    heraSubscriptions: [],
    heraSubscriptionsPageInfo: {},
    heraSubscriptionsTotalCount: 0,
    errorHeraSubscriptions: null,
    submittingMutation: false,
    mutation: {},
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
    case REQUEST(ACTION_TYPE.SEARCH_HERA_SUBSCRIPTIONS):
      return {
        ...state,
        fetchingHeraSubscriptions: true,
        fetchedHeraSubscriptions: false,
        heraSubscriptions: [],
        heraSubscriptionsPageInfo: {},
        heraSubscriptionsTotalCount: 0,
        errorHeraSubscriptions: null,
      };
    case SUCCESS(ACTION_TYPE.SEARCH_HERA_SUBSCRIPTIONS):
        return {
          ...state,
          fetchingHeraSubscriptions: false,
          fetchedHeraSubscriptions: true,
          heraSubscriptions: parseData(action.payload.data.heraSubscriptions)?.map((heraSubscription) => ({
            ...heraSubscription,
            id: decodeId(heraSubscription.id),
          })),
          heraSubscriptionsPageInfo: pageInfo(action.payload.data.heraSubscriptions),
          heraSubscriptionsTotalCount: action.payload.data.heraSubscriptions ? action.payload.data.heraSubscriptions.totalCount : 0,
          errorHeraSubscriptions: formatGraphQLError(action.payload),
        };
    case ERROR(ACTION_TYPE.SEARCH_HERA_SUBSCRIPTIONS):
        return {
          ...state,
          fetchingHeraSubscriptions: false,
          errorHeraSubscriptions: formatServerError(action.payload),
        };
    case REQUEST(ACTION_TYPE.CREATE_HERA_SUBSCRIPTION):
      return dispatchMutationReq(state, action);
    case ERROR(ACTION_TYPE.CREATE_HERA_SUBSCRIPTION):
      return dispatchMutationErr(state, action);
    case SUCCESS(ACTION_TYPE.CREATE_HERA_SUBSCRIPTION):
      return dispatchMutationResp(state, 'createHeraSubscription', action);
    case REQUEST(ACTION_TYPE.DELETE_HERA_SUBSCRIPTION):
      return dispatchMutationReq(state, action);
    case ERROR(ACTION_TYPE.DELETE_HERA_SUBSCRIPTION):
      return dispatchMutationErr(state, action);
    case SUCCESS(ACTION_TYPE.DELETE_HERA_SUBSCRIPTION):
      return dispatchMutationResp(state, 'deleteHeraSubscription', action);
    default:
      return state;
  }
}

export default reducer;
