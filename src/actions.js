import {
  graphql,
  graphqlMutation,
  formatPageQueryWithCount,
} from '@openimis/fe-core';
import { ACTION_TYPE } from './reducer';
import {ERROR, REQUEST, SUCCESS} from "./utils/action-type";

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

function formatCreateHeraSubscriptionGQLVariables(topic, clientMutationLabel) {
    return {
        "input": {
            "clientMutationLabel": clientMutationLabel,
            "topic": topic,
        }
    }
}

export function createHeraSubscription(topic, clientMutationLabel) {
  let requestedDateTime = new Date();
  const payload = `
    mutation($input: CreateHeraSubscriptionMutationInput!) {
      createHeraSubscription(input: $input) {
        clientMutationId
        internalId
      }
    }`;
  return graphqlMutation(
    payload,
    formatCreateHeraSubscriptionGQLVariables(topic, clientMutationLabel),
    [
        REQUEST(ACTION_TYPE.CREATE_HERA_SUBSCRIPTION),
        SUCCESS(ACTION_TYPE.CREATE_HERA_SUBSCRIPTION),
        ERROR(ACTION_TYPE.CREATE_HERA_SUBSCRIPTION),
    ], {
        clientMutationLabel,
        requestedDateTime,
    },
    true
  );
}

function formatDeleteHeraSubscriptionGQLVariables(heraSubscription, clientMutationLabel) {
    return {
        "input": {
            "clientMutationLabel": clientMutationLabel,
            "uuids": [heraSubscription.id],
        }
    }
}

export function deleteHeraSubscription(heraSubscription, clientMutationLabel) {
  let requestedDateTime = new Date();
  const payload = `
    mutation($input: DeleteHeraSubscriptionMutationInput!) {
      deleteHeraSubscription(input: $input) {
        clientMutationId
        internalId
      }
    }`;
  return graphqlMutation(
    payload,
    formatDeleteHeraSubscriptionGQLVariables(heraSubscription, clientMutationLabel),
    [
        REQUEST(ACTION_TYPE.DELETE_HERA_SUBSCRIPTION),
        SUCCESS(ACTION_TYPE.DELETE_HERA_SUBSCRIPTION),
        ERROR(ACTION_TYPE.DELETE_HERA_SUBSCRIPTION),
    ], {
        clientMutationLabel,
        requestedDateTime,
    },
    true
  );
}
