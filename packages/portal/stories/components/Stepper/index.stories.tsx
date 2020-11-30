import * as React from 'react';

import Stepper from '@synerise/ds-stepper';
import { withState } from '@dump247/storybook-state';
import { boolean, select } from '@storybook/addon-knobs';
import Radio from '@synerise/ds-radio';

const decorator = storyFn => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%', position: 'absolute', top: 0, left: 0 }}>
    {storyFn()}
  </div>
);

const steps = [
  {
    number: 1,
    label: 'Details',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 2,
    label: 'Settings',
    tooltip: 'Tooltip info',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 3,
    label: 'Filters & Facets',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
  {
    number: 4,
    label: 'Ranking',
    children: (
      <Radio.Group>
        <Radio name="radio" value="radio" description="Description">
          Radio
        </Radio>
        <Radio name="radio" value="tv" description="Description">
          TV
        </Radio>
      </Radio.Group>
    ),
  },
];

const STEPPER_TYPES = ['horizontal', 'vertical'];

const stories = {
  default: withState({
    activeStep: -1,
  })(({ store }) => {
    const setActiveStep = (index: number) => {
      store.set({ activeStep: index });
    };
    return (
      <Stepper type={select('Select stepper type', STEPPER_TYPES, 'horizontal')}>
        {steps.map((step, index) => (
          <Stepper.Step
            onClick={() => setActiveStep(index)}
            label={step.label}
            stepNumber={step.number}
            active={index === store.state.activeStep}
            done={index < store.state.activeStep}
            validated={boolean('Set validated', false)}
            tooltip={step.tooltip}
            children={step.children}
          />
        ))}
      </Stepper>
    );
  }),
};

export default {
  name: 'Components/Stepper',
  config: {},
  stories,
  Component: Stepper,
  decorator,
};
