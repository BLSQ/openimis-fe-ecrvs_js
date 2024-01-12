import React from 'react';
import { ConstantBasedPicker } from '@openimis/fe-core';

import { HERA_SUBSCRIPTIONS_STATUSES } from '../constants';

function HeraSubscriptionsStatusPicker(props) {
  const {
    required, withNull, readOnly, onChange, value, nullLabel, withLabel,
  } = props;
  return (
    <ConstantBasedPicker
      module="ecrvs"
      label="heraSubscriptions.statusPicker"
      constants={HERA_SUBSCRIPTIONS_STATUSES}
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

export default HeraSubscriptionsStatusPicker;
