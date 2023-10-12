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

export function fetchHeraNotifications(params) {
  const payload = formatPageQueryWithCount('heraNotifications', params, HERA_NOTIFICATION_FULL_PROJECTION);
  return graphql(payload, ACTION_TYPE.SEARCH_HERA_NOTIFICATIONS);
}
