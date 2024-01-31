import { test, expect } from '@playwright/test';

import { OnMoveParams } from 'index';

const IFRAME_LOCATOR = 'iframe[title="storybook-preview-iframe"]';

test('should get max values of move params rendered when mouse is positioned at top left corner of tilt element', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Event - Params' }).click();

  const content = page.frameLocator(IFRAME_LOCATOR);

  await content.getByTestId('topLeft').hover({ position: { x: 10, y: 10 } });
  await expect(content.getByTestId('tiltAngleX')).toHaveText('-20.00° / -100.00%');
  await expect(content.getByTestId('tiltAngleY')).toHaveText('20.00° / 100.00%');
  await expect(content.getByTestId('glareAngle')).toHaveText('-45.00°');
  await expect(content.getByTestId('glareOpacity')).toHaveText('0.00');
});

test('should get max values of move params when mouse is positioned at corners of tilt element', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Event - Params' }).click();

  const content = page.frameLocator(IFRAME_LOCATOR);

  await content.getByTestId('topLeft').hover({ position: { x: 10, y: 10 } });

  const topLeftParamsString = await content.getByTestId('params').innerText();
  const topLeftParams = JSON.parse(topLeftParamsString) as OnMoveParams;

  expect(topLeftParams.tiltAngleX).toBeLessThanOrEqual(-20);
  expect(topLeftParams.tiltAngleY).toBeGreaterThanOrEqual(20);
  expect(topLeftParams.tiltAngleXPercentage).toBeLessThanOrEqual(-100);
  expect(topLeftParams.tiltAngleYPercentage).toBeGreaterThanOrEqual(100);
  expect(topLeftParams.glareAngle).toBeLessThanOrEqual(-45);
  expect(topLeftParams.glareOpacity).toBe(0);

  await content.getByTestId('topRight').hover({ position: { x: 25, y: 10 } });

  const topRightParamsString = await content.getByTestId('params').innerText();
  const topRightParams = JSON.parse(topRightParamsString) as OnMoveParams;

  expect(topRightParams.tiltAngleX).toBeLessThanOrEqual(-20);
  expect(topRightParams.tiltAngleY).toBeLessThanOrEqual(-19);
  expect(topRightParams.tiltAngleXPercentage).toBeLessThanOrEqual(-100);
  expect(topRightParams.tiltAngleYPercentage).toBeLessThanOrEqual(-95);
  expect(topRightParams.glareAngle).toBeGreaterThanOrEqual(44);
  expect(topRightParams.glareOpacity).toBe(0);

  await content.getByTestId('bottomRight').hover({ position: { x: 19, y: 19 } });

  const bottomRightParamsString = await content.getByTestId('params').innerText();
  const bottomRightParams = JSON.parse(bottomRightParamsString) as OnMoveParams;

  expect(bottomRightParams.tiltAngleX).toBeGreaterThanOrEqual(19);
  expect(bottomRightParams.tiltAngleY).toBeLessThanOrEqual(-19);
  expect(bottomRightParams.tiltAngleXPercentage).toBeGreaterThanOrEqual(95);
  expect(bottomRightParams.tiltAngleYPercentage).toBeLessThanOrEqual(-95);
  expect(bottomRightParams.glareAngle).toBeGreaterThanOrEqual(44);
  expect(bottomRightParams.glareOpacity).toBeGreaterThanOrEqual(0.95);

  await content.getByTestId('bottomLeft').hover({ position: { x: 1, y: 19 } });

  const bottomLeftParamsString = await content.getByTestId('params').innerText();
  const bottomLeftParams = JSON.parse(bottomLeftParamsString) as OnMoveParams;

  expect(bottomLeftParams.tiltAngleX).toBeLessThanOrEqual(20);
  expect(bottomLeftParams.tiltAngleY).toBeLessThanOrEqual(20);
  expect(bottomLeftParams.tiltAngleXPercentage).toBeLessThanOrEqual(100);
  expect(bottomLeftParams.tiltAngleYPercentage).toBeLessThanOrEqual(100);
  expect(bottomLeftParams.glareAngle).toBeLessThanOrEqual(130);
  expect(bottomLeftParams.glareOpacity).toBe(1);
});

test('should get half of max value when mouse is positioned in the middle of tilt element', async ({ page }) => {
  await page.goto('http://localhost:9009');
  await page.getByRole('link', { name: 'Event - Params' }).click();

  const content = page.frameLocator(IFRAME_LOCATOR);

  await content.getByTestId('topMidLeft').hover({ position: { x: 10, y: 10 } });

  const topMidLeftParamsString = await content.getByTestId('params').innerText();
  const topMidLeftParams = JSON.parse(topMidLeftParamsString) as OnMoveParams;

  expect(topMidLeftParams.tiltAngleX).toBeLessThanOrEqual(-10);
  expect(topMidLeftParams.tiltAngleY).toBeGreaterThanOrEqual(10);
  expect(topMidLeftParams.tiltAngleXPercentage).toBeLessThanOrEqual(-50);
  expect(topMidLeftParams.tiltAngleYPercentage).toBeGreaterThanOrEqual(50);
  expect(topMidLeftParams.glareAngle).toBeLessThanOrEqual(-40);
  expect(topMidLeftParams.glareOpacity).toBe(0);
});
