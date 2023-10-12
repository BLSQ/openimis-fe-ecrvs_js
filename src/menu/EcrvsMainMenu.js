import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NotificationsActive, Subscriptions } from '@material-ui/icons';
import { formatMessage, MainMenuContribution, withModulesManager } from '@openimis/fe-core';
import { ECRVS_MAIN_MENU_CONTRIBUTION_KEY } from '../constants';

function EcrvsMainMenu(props) {

  const entries = [
    {
      text: formatMessage(props.intl, 'ecrvs', 'menu.heraSubscriptions'),
      icon: <Subscriptions />,
      route: '/ecrvs/heraSubscriptions',
    },
    {
      text: formatMessage(props.intl, 'ecrvs', 'menu.heraNotifications'),
      icon: <NotificationsActive />,
      route: '/ecrvs/heraNotifications',
    },
  ];

  entries.push(
    ...props.modulesManager
      .getContribs(ECRVS_MAIN_MENU_CONTRIBUTION_KEY)
      .filter((c) => !c.filter || c.filter(props.rights)),
  );

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

export default withModulesManager(injectIntl(connect(mapStateToProps)(EcrvsMainMenu)));
