import React from 'react';
import { ConstantBasedPicker } from '@openimis/fe-core';

import { HERA_NOTIFICATIONS_TOPICS } from '../constants';

function HeraNotificationsTopicPicker(props) {
  const {
    required, withNull, readOnly, onChange, value, nullLabel, withLabel,
  } = props;
  return (
    <ConstantBasedPicker
      module="ecrvs"
      label="heraNotifications.topicPicker"
      constants={HERA_NOTIFICATIONS_TOPICS}
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

export default HeraNotificationsTopicPicker;
