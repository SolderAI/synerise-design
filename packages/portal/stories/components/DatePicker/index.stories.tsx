import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import * as moment from 'moment';

const stories = {
  default: () => {
    const [value, setValue] = React.useState();
    return (
      <div>
        <DatePicker
          showTime={true}
          onApply={value => {
            console.log(value);
            setValue(value);
          }}
          texts={{
            selectTime: 'Select time',
            selectDate: 'Select date',
            apply: 'Apply',
            now: 'Now',
          }}
        />
      </div>
    );
  },
};

export default {
  name: 'Components|DatePicker',
  config: {},
  stories,
};
