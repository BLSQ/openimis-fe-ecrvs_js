import React from 'react';
import { injectIntl } from 'react-intl';
import {
  formatMessageWithValues,
  Searcher,
  withHistory,
  withModulesManager,
} from '@openimis/fe-core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DEFAULT_PAGE_SIZE,
  ROWS_PER_PAGE_OPTIONS,
} from '../constants';
import { fetchHeraNotifications } from '../actions';
import HeraNotificationsFilter from "./HeraNotificationsFilter";
import {formatDateTimeFromISO} from "../utils/date";

function HeraNotificationsSearcher({
  intl,
  modulesManager,
  fetchHeraNotifications,
  fetchingHeraNotifications,
  errorHeraNotifications,
  heraNotifications,
  heraNotificationsPageInfo,
  heraNotificationsTotalCount,
}) {
  const fetch = (params) => fetchHeraNotifications(params);

  const headers = () => {
    const headers = [
      'heraNotification.datetimeReceived',
      'heraNotification.status',
      'heraNotification.topic',
      'heraNotification.operation',
      'heraNotification.datetimeProcessed',
      'heraNotification.jsonExt',
    ];
    return headers;
  };

  const itemFormatters = () => {
    const formatters = [
      (heraNotification) => formatDateTimeFromISO(modulesManager, heraNotification.datetimeReceived),
      (heraNotification) => heraNotification.status,
      (heraNotification) => heraNotification.topic,
      (heraNotification) => heraNotification.operation,
      (heraNotification) => formatDateTimeFromISO(modulesManager, heraNotification.datetimeProcessed),
      (heraNotification) => heraNotification.jsonExt,
    ];
    return formatters;
  };

  const rowIdentifier = (heraNotification) => heraNotification.id;

  const sorts = () => [
    ['datetimeReceived', true],
    ['status', true],
    ['topic', true],
    ['operation', true],
    ['datetimeProcessed', true],
    ['jsonExt', false],
  ];

  const heraNotificationsFilter = (props) => (
    <HeraNotificationsFilter
      intl={props.intl}
      classes={props.classes}
      filters={props.filters}
      onChangeFilters={props.onChangeFilters}
    />
  );

  return (
    <Searcher
      module="ecrvs"
      FilterPane={heraNotificationsFilter}
      fetch={fetch}
      items={heraNotifications}
      itemsPageInfo={heraNotificationsPageInfo}
      fetchedItems={fetchingHeraNotifications}
      errorItems={errorHeraNotifications}
      tableTitle={formatMessageWithValues(intl, 'ecrvs', 'heraNotifications.searcherResultsTitle', {
        heraNotificationsTotalCount,
      })}
      headers={headers}
      itemFormatters={itemFormatters}
      sorts={sorts}
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      defaultOrderBy="-datetimeReceived"
      rowIdentifier={rowIdentifier}
    />
  );
}

const mapStateToProps = (state) => ({
  fetchingHeraNotifications: state.ecrvs.fetchingHeraNotifications,
  errorHeraNotifications: state.ecrvs.errorHeraNotifications,
  heraNotifications: state.ecrvs.heraNotifications,
  heraNotificationsPageInfo: state.ecrvs.heraNotificationsPageInfo,
  heraNotificationsTotalCount: state.ecrvs.heraNotificationsTotalCount,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchHeraNotifications,
  },
  dispatch,
);

export default withHistory(
  withModulesManager(injectIntl(connect(mapStateToProps, mapDispatchToProps)(HeraNotificationsSearcher))),
);
