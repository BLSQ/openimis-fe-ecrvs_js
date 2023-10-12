import React from 'react';
import { injectIntl } from 'react-intl';
import { formatMessage } from '@openimis/fe-core';
import { Grid } from '@material-ui/core';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { defaultFilterStyles } from '../utils/styles';
import HeraNotificationsStatusPicker from "../pickers/HeraNotificationsStatusPicker";
import HeraNotificationsTopicPicker from "../pickers/HeraNotificationsTopicPicker";
import HeraNotificationsOperationPicker from "../pickers/HeraNotificationsOperationPicker";

function HeraNotificationsFilter({
  intl,
  classes,
  filters,
  onChangeFilters,
}) {
  const filterValue = (filterName) => filters?.[filterName]?.value;

  return (
    <Grid container className={classes.form}>
      <Grid item xs={2} className={classes.item}>
        <HeraNotificationsStatusPicker
          label="heraNotifications.statusPicker"
          withNull
          nullLabel={formatMessage(intl, 'ecrvs', 'any')}
          value={filterValue('status')}
          onChange={(value) => onChangeFilters([
            {
              id: 'status',
              value,
              filter: `status: "${value}"`,
            },
          ])}
        />
      </Grid>
      <Grid item xs={2} className={classes.item}>
        <HeraNotificationsTopicPicker
          label="heraNotifications.topicPicker"
          withNull
          nullLabel={formatMessage(intl, 'ecrvs', 'any')}
          value={filterValue('topic')}
          onChange={(value) => onChangeFilters([
            {
              id: 'topic',
              value,
              filter: `topic: "${value}"`,
            },
          ])}
        />
      </Grid>
      <Grid item xs={2} className={classes.item}>
        <HeraNotificationsOperationPicker
          label="heraNotifications.operationPicker"
          withNull
          nullLabel={formatMessage(intl, 'ecrvs', 'any')}
          value={filterValue('operation')}
          onChange={(value) => onChangeFilters([
            {
              id: 'operation',
              value,
              filter: `operation: "${value}"`,
            },
          ])}
        />
      </Grid>
    </Grid>
  );
}

export default injectIntl(withTheme(withStyles(defaultFilterStyles)(HeraNotificationsFilter)));
