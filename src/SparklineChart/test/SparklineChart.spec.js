import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import SparklineChart from '../SparklineChart';
import { sparklineChartPrivateDriverFactory } from './SparklineChart.private.uni.driver';

describe(SparklineChart.displayName, () => {
  const render = createRendererWithUniDriver(
    sparklineChartPrivateDriverFactory,
  );

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(<SparklineChart />);

    expect(await driver.exists()).toBe(true);
  });

  it('should increment', async () => {
    const { driver } = render(<SparklineChart />);

    await driver.clickButtonTimes(2);

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<SparklineChart buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
