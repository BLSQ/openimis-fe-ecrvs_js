import React from 'react';
import { injectIntl } from 'react-intl';
import { Grid } from '@material-ui/core';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { defaultFilterStyles } from '../utils/styles';
import HeraNotificationsTopicPicker from "../pickers/HeraNotificationsTopicPicker";
import HeraSubscriptionsStatusPicker from "../pickers/HeraSubscriptionsStatusPicker";

function HeraSubscriptionsFilter({
  intl,
  classes,
  filters,
  onChangeFilters,
}) {
  const filterValue = (filterName) => filters?.[filterName]?.value;

  return (
    <Grid container className={classes.form}>
      <Grid item xs={2} className={classes.item}>
        <HeraNotificationsTopicPicker
          label="heraNotifications.topicPicker"
          withNull
          module={"ecrvs"}
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
        <HeraSubscriptionsStatusPicker
          label="heraSubscriptions.statusPicker"
          withNull
          module={"ecrvs"}
          value={filterValue('active')}
          onChange={(value) => onChangeFilters([
            {
              id: 'active',
              value,
              filter: `active: ${value}`,
            },
          ])}
        />
      </Grid>
    </Grid>
  );
}

export default injectIntl(withTheme(withStyles(defaultFilterStyles)(HeraSubscriptionsFilter)));
