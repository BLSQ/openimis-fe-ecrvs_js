import React from 'react';
import { Helmet, withModulesManager, formatMessage, withTooltip } from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { RIGHT_HERA_SUBSCRIPTIONS_CREATE, RIGHT_HERA_SUBSCRIPTIONS_SEARCH } from "../constants";
import HeraSubscriptionsSearcher from "../components/HeraSubscriptionsSearcher";

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function HeraSubscriptionsPage(props) {
  const { intl, classes, rights } = props;

  const onAdd = () => historyPush(
    modulesManager,
    history,
    SOCIAL_PROTECTION_ROUTE_BENEFIT_PLAN,
  );

  return (
      rights.includes(RIGHT_HERA_SUBSCRIPTIONS_SEARCH) && (
      <div className={classes.page}>
        <Helmet title={formatMessage(intl, 'ecrvs', 'heraSubscriptions.heraSubscriptionsHelmet')} />
        <HeraSubscriptionsSearcher rights={rights} />
          {rights.includes(RIGHT_HERA_SUBSCRIPTIONS_CREATE)
            && withTooltip(
              <div className={classes.fab}>
                <Fab color="primary" onClick={onAdd}>
                  <AddIcon />
                </Fab>
              </div>,
              formatMessage(intl, 'ecrvs', 'heraSubscriptions.createButton.tooltip'),
            )}
      </div>
      )
  );
}


const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps)(HeraSubscriptionsPage)))));
