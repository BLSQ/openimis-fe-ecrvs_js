import React from 'react';
import { Helmet, withModulesManager, formatMessage } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { RIGHT_HERA_NOTIFICATIONS_SEARCH} from "../constants";
import HeraNotificationsSearcher from "../components/HeraNotificationsSearcher";

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function HeraNotificationsPage(props) {
  const { intl, classes, rights } = props;

  return (
      rights.includes(RIGHT_HERA_NOTIFICATIONS_SEARCH) && (
      <div className={classes.page}>
        <Helmet title={formatMessage(intl, 'ecrvs', 'heraNotifications.heraNotificationsHelmet')} />
        <HeraNotificationsSearcher rights={rights} />
      </div>
      )
  );
}


const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(withModulesManager(withTheme(withStyles(styles)(connect(mapStateToProps)(HeraNotificationsPage)))));
