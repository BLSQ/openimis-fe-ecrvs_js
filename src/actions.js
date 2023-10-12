import {
  graphql,
  formatPageQueryWithCount,
} from '@openimis/fe-core';
import { ACTION_TYPE } from './reducer';

const HERA_NOTIFICATION_FULL_PROJECTION = [
    "id",
    "topic",
    "context",
    "operation",
    "datetimeReceived",
    "status",
    "jsonExt",
];
const HERA_SUBSCRIPTION_FULL_PROJECTION = [
    "id",
    "topic",
    "createdAt",
    "active",
    "deletedAt",
];

export function fetchHeraNotifications(params) {
  const payload = formatPageQueryWithCount('heraNotifications', params, HERA_NOTIFICATION_FULL_PROJECTION);
  return graphql(payload, ACTION_TYPE.SEARCH_HERA_NOTIFICATIONS);
}

export function fetchHeraSubscriptions(params) {
  const payload = formatPageQueryWithCount('heraSubscriptions', params, HERA_SUBSCRIPTION_FULL_PROJECTION);
  return graphql(payload, ACTION_TYPE.SEARCH_HERA_SUBSCRIPTIONS);
}
