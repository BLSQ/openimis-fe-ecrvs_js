import React from 'react';
import { ConstantBasedPicker } from '@openimis/fe-core';

import { HERA_NOTIFICATIONS_STATUSES } from '../constants';

function HeraNotificationsStatusPicker(props) {
  const {
    required, withNull, readOnly, onChange, value, nullLabel, withLabel,
  } = props;
  return (
    <ConstantBasedPicker
      module="ecrvs"
      label="heraNotifications.statusPicker"
      constants={HERA_NOTIFICATIONS_STATUSES}
      required={required}
      withNull={withNull}
      readOnly={readOnly}
      onChange={onChange}
      value={value}
      nullLabel={nullLabel}
      withLabel={withLabel}
    />
  );
}

export default HeraNotificationsStatusPicker;
