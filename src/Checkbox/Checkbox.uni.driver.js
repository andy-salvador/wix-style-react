import { baseUniDriverFactory, ReactBase } from '../../test/utils/unidriver';
import { Simulate } from 'react-dom/test-utils';
import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';
import { dataHooks } from './constants';

import * as DATA_ATTR from './DataAttr';

const getDataCheckType = base => base.attr(DATA_ATTR.DATA_CHECK_TYPE);

export const checkboxUniDriverFactory = (base, body) => {
  const reactBase = ReactBase(base);

  const labelTextDriver = textUniDriverFactory(
    base.$(`[data-hook="${dataHooks.children}"]`),
  );

  const input = () => base.$('input');
  const isChecked = async () =>
    (await getDataCheckType(base)) === DATA_ATTR.CHECK_TYPES.CHECKED;
  const getTooltipDriver = async () =>
    tooltipDriverFactory(base.$(`[data-hook="${dataHooks.boxTooltip}"]`), body);

  return {
    ...baseUniDriverFactory(base),
    click: async () => {
      if (base.type === 'react') {
        // eslint-disable-next-line no-restricted-properties
        Simulate.change(await input().getNative(), {
          target: { checked: !(await isChecked()) },
        });
      } else {
        return base.click();
      }
    },
    /** trigger focus on the element */
    focus: () => reactBase.focus(),
    /** trigger blur on the element */
    blur: () => reactBase.blur(),
    isChecked,
    isDisabled: async () =>
      (await base.attr(DATA_ATTR.DATA_DISABLED)) === 'true',
    isIndeterminate: async () =>
      (await getDataCheckType(base)) === DATA_ATTR.CHECK_TYPES.INDETERMINATE,
    hasError: async () =>
      (await base.attr(DATA_ATTR.DATA_HAS_ERROR)) === 'true',
    getErrorMessage: async () => {
      try {
        const tooltipDriver = await getTooltipDriver();
        return tooltipDriver.getTooltipText();
      } catch (e) {
        throw new Error('Failed getting checkbox error message');
      }
    },
    getLabel: labelTextDriver.getText,
    getLabelSize: labelTextDriver.getSize,
  };
};
