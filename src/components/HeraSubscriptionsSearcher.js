import React from 'react';
import { injectIntl } from 'react-intl';
import { Checkbox } from "@material-ui/core";
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
import { fetchHeraSubscriptions } from '../actions';
import { formatDateTimeFromISO } from "../utils/date";
// import HeraSubscriptionsFilter from "./HeraSubscriptionsFilter";

function HeraSubscriptionsSearcher({
  intl,
  modulesManager,
  fetchHeraSubscriptions,
  fetchingHeraSubscriptions,
  errorHeraSubscriptions,
  heraSubscriptions,
  heraSubscriptionsPageInfo,
  heraSubscriptionsTotalCount,
}) {
  const fetch = (params) => fetchHeraSubscriptions(params);

  const headers = () => {
    const headers = [
      'heraSubscription.topic',
      'heraSubscription.createdAt',
      'heraSubscription.active',
      'heraSubscription.deletedAt',
    ];
    return headers;
  };

  const itemFormatters = () => {
    const formatters = [
      (heraSubscription) => heraSubscription.topic,
      (heraSubscription) => formatDateTimeFromISO(modulesManager, heraSubscription.createdAt),
      (heraSubscription) => <Checkbox color="primary" checked={heraSubscription.active} readOnly />,
      (heraSubscription) => formatDateTimeFromISO(modulesManager, heraSubscription.deletedAt),
    ];
    return formatters;
  };

  const rowIdentifier = (heraSubscription) => heraSubscription.id;

  const sorts = () => [
    ['topic', true],
    ['createdAt', true],
    ['active', true],
    ['deletedAt', true],
  ];

  // const heraSubscriptionsFilter = (props) => (
  //   <HeraSubscriptionsFilter
  //     intl={props.intl}
  //     classes={props.classes}
  //     filters={props.filters}
  //     onChangeFilters={props.onChangeFilters}
  //   />
  // );

  return (
    <Searcher
      module="ecrvs"
      // FilterPane={heraSubscriptionsFilter}
      fetch={fetch}
      items={heraSubscriptions}
      itemsPageInfo={heraSubscriptionsPageInfo}
      fetchedItems={fetchingHeraSubscriptions}
      errorItems={errorHeraSubscriptions}
      tableTitle={formatMessageWithValues(intl, 'ecrvs', 'heraSubscriptions.searcherResultsTitle', {
        heraSubscriptionsTotalCount,
      })}
      headers={headers}
      itemFormatters={itemFormatters}
      sorts={sorts}
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      defaultOrderBy="createdAt"
      rowIdentifier={rowIdentifier}
    />
  );
}

const mapStateToProps = (state) => ({
  fetchingHeraSubscriptions: state.ecrvs.fetchingHeraSubscriptions,
  errorHeraSubscriptions: state.ecrvs.errorHeraSubscriptions,
  heraSubscriptions: state.ecrvs.heraSubscriptions,
  heraSubscriptionsPageInfo: state.ecrvs.heraSubscriptionsPageInfo,
  heraSubscriptionsTotalCount: state.ecrvs.heraSubscriptionsTotalCount,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchHeraSubscriptions,
  },
  dispatch,
);

export default withHistory(
  withModulesManager(injectIntl(connect(mapStateToProps, mapDispatchToProps)(HeraSubscriptionsSearcher))),
);
