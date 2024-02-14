import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NotificationsActive, Subscriptions } from '@material-ui/icons';
import { formatMessage, MainMenuContribution, withModulesManager } from '@openimis/fe-core';
import {
  ECRVS_MAIN_MENU_CONTRIBUTION_KEY,
  RIGHT_HERA_NOTIFICATIONS_SEARCH,
  RIGHT_HERA_SUBSCRIPTIONS_SEARCH
} from '../constants';

function EcrvsMainMenu(props) {
  let entries = [];

  if (props.rights.includes(RIGHT_HERA_SUBSCRIPTIONS_SEARCH)) {
    entries.push(
      {
        text: formatMessage(props.intl, 'ecrvs', 'menu.heraSubscriptions'),
        icon: <Subscriptions />,
        route: '/ecrvs/heraSubscriptions',
      }
    );
  }
  if (props.rights.includes(RIGHT_HERA_NOTIFICATIONS_SEARCH)) {
    entries.push(
      {
        text: formatMessage(props.intl, 'ecrvs', 'menu.heraNotifications'),
        icon: <NotificationsActive />,
        route: '/ecrvs/heraNotifications',
      }
    );
  }

  entries.push(
    ...props.modulesManager
      .getContribs(ECRVS_MAIN_MENU_CONTRIBUTION_KEY)
      .filter((c) => !c.filter || c.filter(props.rights)),
  );
  if (!entries.length) return null;

  return (
    <MainMenuContribution
      {...props}
      header={formatMessage(props.intl, 'ecrvs', 'mainMenu')}
      entries={entries}
    />
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(withModulesManager(connect(mapStateToProps)(EcrvsMainMenu)));
