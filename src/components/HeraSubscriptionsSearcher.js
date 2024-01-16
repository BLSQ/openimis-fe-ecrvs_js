import React, { useState, useEffect, useRef } from 'react';
import { injectIntl } from 'react-intl';
import { Checkbox } from "@material-ui/core";
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  formatMessage,
  formatMessageWithValues,
  Searcher,
  journalize,
  withHistory,
  withModulesManager,
  coreConfirm,
} from '@openimis/fe-core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  DEFAULT_PAGE_SIZE, RIGHT_HERA_SUBSCRIPTIONS_DELETE,
  ROWS_PER_PAGE_OPTIONS,
} from '../constants';
import {deleteHeraSubscription, fetchHeraSubscriptions} from '../actions';
import { formatDateTimeFromISO } from "../utils/date";
import HeraSubscriptionsFilter from "./HeraSubscriptionsFilter";

function HeraSubscriptionsSearcher({
  intl,
  rights,
  confirmed,
  coreConfirm,
  clearConfirm,
  submittingMutation,
  mutation,
  journalize,
  modulesManager,
  fetchHeraSubscriptions,
  fetchingHeraSubscriptions,
  errorHeraSubscriptions,
  heraSubscriptions,
  heraSubscriptionsPageInfo,
  heraSubscriptionsTotalCount,
  deleteHeraSubscription,
}) {

  const [heraSubscriptionToDelete, setHeraSubscriptionToDelete] = useState(null);
  const [deletedHeraSubscriptionUuids, setDeletedHeraSubscriptionUuids] = useState([]);
  const prevSubmittingMutationRef = useRef();


  const openDeleteHeraSubscriptionConfirmDialog = () => coreConfirm(
    formatMessage(intl, 'ecrvs', 'heraSubscription.delete.confirm.title'),
    formatMessageWithValues(intl, 'ecrvs', 'heraSubscription.delete.confirm.message', {
      topic: heraSubscriptionToDelete.topic,
      date: formatDateTimeFromISO(modulesManager, heraSubscriptionToDelete.createdAt),
    }),
  );

  useEffect(() => heraSubscriptionToDelete && openDeleteHeraSubscriptionConfirmDialog(), [heraSubscriptionToDelete]);

  useEffect(() => {
    if (heraSubscriptionToDelete && confirmed) {
      deleteHeraSubscription(
        heraSubscriptionToDelete,
        formatMessageWithValues(intl, 'ecrvs', 'heraSubscription.delete.mutationLabel', {
          id: heraSubscriptionToDelete?.id,
        }),
      );
      setDeletedHeraSubscriptionUuids([...deletedHeraSubscriptionUuids, heraSubscriptionToDelete.id]);
    }
    if (heraSubscriptionToDelete && confirmed !== null) {
      setHeraSubscriptionToDelete(null);
    }
    return () => confirmed && clearConfirm(false);
  }, [confirmed]);

  useEffect(() => {
    if (prevSubmittingMutationRef.current && !submittingMutation) {
      journalize(mutation);
    }
  }, [submittingMutation]);

  useEffect(() => {
    prevSubmittingMutationRef.current = submittingMutation;
  });

  const onDelete = (heraSubscription) => setHeraSubscriptionToDelete(heraSubscription);

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
    if (rights.includes(RIGHT_HERA_SUBSCRIPTIONS_DELETE)) {
      formatters.push((heraSubscription) => (
        <Tooltip title={formatMessage(intl, 'ecrvs', 'deleteButtonTooltip')}>
          <IconButton
            onClick={() => onDelete(heraSubscription)}
            disabled={deletedHeraSubscriptionUuids.includes(heraSubscription.id) || !heraSubscription.active}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ));
    }
    return formatters;
  };

  const rowIdentifier = (heraSubscription) => heraSubscription.id;

  const sorts = () => [
    ['topic', true],
    ['createdAt', true],
    ['active', true],
    ['deletedAt', true],
  ];

  const heraSubscriptionsFilter = (props) => {
    return (
       <HeraSubscriptionsFilter
        intl={props.intl}
        classes={props.classes}
        filters={props.filters}
        onChangeFilters={props.onChangeFilters}
      />
    )
  }

  return (
    <Searcher
      module="ecrvs"
      FilterPane={heraSubscriptionsFilter}
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
  submittingMutation: state.ecrvs.submittingMutation,
  confirmed: state.core.confirmed,
  mutation: state.ecrvs.mutation,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchHeraSubscriptions,
    deleteHeraSubscription,
    coreConfirm,
    journalize,
  },
  dispatch,
);

export default withHistory(
  withModulesManager(injectIntl(connect(mapStateToProps, mapDispatchToProps)(HeraSubscriptionsSearcher))),
);
