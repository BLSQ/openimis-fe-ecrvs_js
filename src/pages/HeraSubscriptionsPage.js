import React, { useState } from 'react';
import {
  Helmet,
  withModulesManager,
  formatMessage,
} from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  RIGHT_HERA_SUBSCRIPTIONS_CREATE,
  RIGHT_HERA_SUBSCRIPTIONS_SEARCH
} from "../constants";
import HeraSubscriptionsSearcher from "../components/HeraSubscriptionsSearcher";
import HeraSubscriptionsCreator from "../components/HeraSubscriptionsCreator";
import {fetchHeraSubscriptions} from "../actions";

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function HeraSubscriptionsPage(props) {
  const { intl, classes, rights } = props;
  const [refreshState, setRefreshState] = useState("");
  const [filtersState, setFilters] = useState("");


  // console.log("--- searcher ref = ", searcherRef.current);
  const refresh = (success) => {
    // console.log("/// refresh - success = ", success);
    // if (success) {
        // console.log("/// refresh - filtersState = ", filtersState);
        // fetchHeraSubscriptions(filtersState)

        // window.searcher.applyFilters();
    // }
  }

  console.log("--- Hera Subs Page render ---");

  return (
      rights.includes(RIGHT_HERA_SUBSCRIPTIONS_SEARCH) && (
      <div className={classes.page}>
        <Helmet title={formatMessage(intl, 'ecrvs', 'heraSubscriptions.heraSubscriptionsHelmet')} />
        <HeraSubscriptionsSearcher
            rights={rights}
            onFiltersChange={setFilters}
        />
        {rights.includes(RIGHT_HERA_SUBSCRIPTIONS_CREATE) && (
          <HeraSubscriptionsCreator
            onNewSubscription={refresh}
          />
        )}
      </div>
      )
  );
}


const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchHeraSubscriptions,
  },
  dispatch,
);

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HeraSubscriptionsPage)))));
