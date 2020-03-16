import * as React from 'react';
import { fireEvent } from "@testing-library/react";
import Tooltip from '../index';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

describe('Tooltip', () => {
    const TOOLTIP_TITLE = 'Test';
    const TEST_ID = 'inner-element';

    it('should render', () => {
        // ARRANGE
        const { getByText } = renderWithProvider(<Tooltip visible title={TOOLTIP_TITLE} />);

        // ASSERT
        expect(getByText(TOOLTIP_TITLE)).toBeTruthy();
    });

    it('should appear on mouseOver', () => {
        // ARRANGE
        const { getByText, getByTestId } = renderWithProvider(
            <Tooltip title={TOOLTIP_TITLE} mouseEnterDelay={0} mouseLeaveDelay={0}>
                <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
            </Tooltip>);

        //ACT
        const INNER_SPAN = getByTestId(TEST_ID);
        fireEvent.mouseOver(INNER_SPAN);

        // ASSERT
        expect(getByText(TOOLTIP_TITLE)).toBeTruthy();
    });

    it('should appear on click', () => {
        // ARRANGE
        const { getByText, getByTestId } = renderWithProvider(
            <Tooltip title={TOOLTIP_TITLE} trigger="click">
                <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
            </Tooltip>);

        //ACT
        const INNER_SPAN = getByTestId(TEST_ID);
        fireEvent.click(INNER_SPAN);

        // ASSERT
        expect(getByText(TOOLTIP_TITLE)).toBeTruthy();
    });

    it('should trigger onVisibleChange', () => {
        // ARRANGE
        const onVisibleChange = jest.fn();
        const { getByTestId } = renderWithProvider(
            <Tooltip title={TOOLTIP_TITLE} onVisibleChange={onVisibleChange} mouseEnterDelay={0} mouseLeaveDelay={0}>
                <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
            </Tooltip>);

        //ACT
        const INNER_SPAN = getByTestId(TEST_ID);
        fireEvent.mouseOver(INNER_SPAN);

        // ASSERT
        expect(onVisibleChange).toHaveBeenCalled();
    });
});
