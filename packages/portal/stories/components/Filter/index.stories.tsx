import * as React from 'react';

import Filter from '@synerise/ds-filter';
import { v4 as uuid } from 'uuid';
import { withState } from '@dump247/storybook-state';
import { ConditionExample } from '../StepCard/data/Condition';
import { DEFAULT_STEP } from '../Condition/data/index.data';
import CompletedWithin from '@synerise/ds-completed-within';
import { dateRangePickerTexts } from '../StepCard/data/stepCard.data';
import DateRangePicker from '@synerise/ds-date-range-picker';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { CalendarM } from '@synerise/ds-icon/dist/icons';
import { default as fnsFormat } from '@synerise/ds-date-range-picker/dist/dateUtils/format';

const DEFAULT_EXPRESSION = () => ({
  type: 'STEP',
  id: uuid(),
  data: {
    name: 'Step #1',
    matching: false,
  },
  logic: {
    type: 'LOGIC',
    id: uuid(),
    data: {
      value: 'AND',
    },
  },
  footer: {
    completedWithinValue: {
      period: undefined,
      value: undefined,
    },
    dateRange: {
      from: undefined,
      to: undefined,
    },
  },
  expressionSteps: [DEFAULT_STEP()],
});

const DEFAULT_STATE = {
  expressions: [DEFAULT_EXPRESSION()],
  matching: false,
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const handleChangeLogic = (id, logic) => {
      const expressions = store.state.expressions.map(exp => {
        if (exp.type === 'STEP' && exp.logic.id === id) {
          return {
            ...exp,
            logic: {
              ...exp.logic,
              data: {
                ...exp.logic.data,
                value: logic,
              },
            },
          };
        }
        if (exp.type === 'LOGIC' && exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              value: logic,
            },
          };
        }
        return exp;
      });
      store.set({
        expressions,
      });
    };

    const handleChangeStepMatching = (id, matching) => {
      const expressions = store.state.expressions.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              matching,
            },
          };
        }
        return exp;
      });
      store.set({ expressions });
    };

    const handleChangeStepName = (id, name) => {
      const expressions = store.state.expressions.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              name,
            },
          };
        }
        return exp;
      });
      store.set({ expressions });
    };

    const handleDeleteStep = id => {
      const expressions = store.state.expressions.filter(exp => exp.id !== id);
      store.set({ expressions });
    };

    const handleDuplicateStep = id => {
      const expression = store.state.expressions.find(exp => exp.id === id);
      store.set({
        expressions: [
          ...store.state.expressions,
          { ...expression, id: uuid(), logic: { ...expression.logic, id: uuid() } },
        ],
      });
    };

    const renderStepFooter = expression => {
      const handleCompletedWithin = completedWithinValue => {
        const expressions = store.state.expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              footer: {
                ...exp.footer,
                completedWithinValue,
              },
            };
          }
          return exp;
        });
        store.set({
          expressions,
        });
      };

      const handleDateRange = value => {
        const expressions = store.state.expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              footer: {
                ...exp.footer,
                dateRange: value,
              },
            };
          }
          return exp;
        });

        store.set({
          expressions,
        });
      };

      const dateRangePickerTrigger = !expression?.footer?.dateRange?.from ? (
        <Button type="tertiary" mode="single-icon">
          <Icon component={<CalendarM />} />
        </Button>
      ) : (
        <Button type="tertiary" mode="label-icon">
          {fnsFormat(expression.footer.dateRange.from, 'MMM D, YYYY')}
          {` - `}
          {fnsFormat(expression.footer.dateRange.to, 'MMM D, YYYY')}
          <Icon component={<CalendarM />} />
        </Button>
      );

      return (
        <>
          {expression?.footer?.completedWithinValue && (
            <CompletedWithin value={expression.footer.completedWithinValue} onSetValue={handleCompletedWithin} />
          )}
          {expression?.footer?.dateRange && (
            <DateRangePicker
              onApply={handleDateRange}
              texts={dateRangePickerTexts}
              value={expression.footer.dateRange}
              popoverTrigger={dateRangePickerTrigger}
            />
          )}
        </>
      );
    };

    const renderStepContent = expression => {
      const handleChangeExpressionSteps = expressionSteps => {
        const expressions = store.state.expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              expressionSteps,
            };
          }
          return exp;
        });

        store.set({ expressions });
      };

      return <ConditionExample onChange={handleChangeExpressionSteps} steps={expression.expressionSteps} />;
    };

    const handleAddStep = () => {
      store.set({ expressions: [...store.state.expressions, DEFAULT_EXPRESSION()] });
    };

    const handleChangeMatching = matching => {
      store.set({ matching });
    };

    const handleChangeOrder = expressions => {
      store.set({ expressions });
    };

    return (
      <div
        style={{
          padding: 24,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        <Filter
          expressions={store.state.expressions}
          onAdd={handleAddStep}
          onChangeLogic={handleChangeLogic}
          onChangeOrder={handleChangeOrder}
          onChangeStepMatching={handleChangeStepMatching}
          onChangeStepName={handleChangeStepName}
          onDeleteStep={handleDeleteStep}
          onDuplicateStep={handleDuplicateStep}
          renderStepFooter={renderStepFooter}
          renderStepContent={renderStepContent}
          matching={{
            onChange: handleChangeMatching,
            matching: store.state.matching,
            sentence: 'find all items #MATCHING_TOGGLE# this condition',
          }}
          texts={{
            step: {
              matching: 'Matching',
              notMatching: 'Not matching',
              namePlaceholder: 'name',
              moveTooltip: 'Move',
              deleteTooltip: 'Delete',
              duplicateTooltip: 'Duplicate',
            },
            matching: {
              matching: 'matching',
              notMatching: 'not matching',
            },
            addFilter: 'Add filter',
            dropMeHere: 'Drop me here',
          }}
        />
      </div>
    );
  }),
};

export default {
  name: 'Filter/Filter',
  config: {},
  stories,
  Component: Filter,
};
