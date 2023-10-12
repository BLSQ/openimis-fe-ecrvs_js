import React from 'react';
import { ConstantBasedPicker } from '@openimis/fe-core';

import { HERA_NOTIFICATIONS_OPERATIONS } from '../constants';

function HeraNotificationsOperationPicker(props) {
  const {
    required, withNull, readOnly, onChange, value, nullLabel, withLabel,
  } = props;
  return (
    <ConstantBasedPicker
      module="ecrvs"
      label="heraNotifications.operationPicker"
      constants={HERA_NOTIFICATIONS_OPERATIONS}
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

export default HeraNotificationsOperationPicker;
