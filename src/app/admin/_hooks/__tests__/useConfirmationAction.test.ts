import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useConfirmationAction } from '../useConfirmationAction';

import type { AdminActionResult } from '../../_lib/types';

describe('useConfirmationAction', () => {
  // --- Initial state ---

  it('should have correct initial state', () => {
    const { result } = renderHook(() => useConfirmationAction());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // --- open / close ---

  it('should set isOpen to true when open is called', () => {
    const { result } = renderHook(() => useConfirmationAction());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should set isOpen to false and clear error when close is called', () => {
    const { result } = renderHook(() => useConfirmationAction());

    act(() => {
      result.current.open();
      result.current.setError('some error');
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.error).toBe('some error');

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // --- execute: success ---

  it('should close dialog on successful action', async () => {
    const { result } = renderHook(() => useConfirmationAction());

    act(() => {
      result.current.open();
    });

    const successAction = async (): Promise<AdminActionResult> => ({ success: true });

    await act(async () => {
      await result.current.execute(successAction);
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // --- execute: known error ---

  it('should set translated error message for known error keys', async () => {
    const { result } = renderHook(() => useConfirmationAction());

    const failAction = async (): Promise<AdminActionResult> => ({
      error: 'unauthorized',
    });

    await act(async () => {
      await result.current.execute(failAction);
    });

    // 'admin.errors.unauthorized' maps to '権限がありません' in labels.json
    expect(result.current.error).toBe('権限がありません');
    // Dialog stays open (isOpen is not set to false on error)
    expect(result.current.isPending).toBe(false);
  });

  // --- execute: unknown error key ---

  it('should fall back to raw error key when label is not found', async () => {
    const { result } = renderHook(() => useConfirmationAction());

    const failAction = async (): Promise<AdminActionResult> => ({
      error: 'unknownErrorKey',
    });

    await act(async () => {
      await result.current.execute(failAction);
    });

    // Label lookup returns the key itself when not found, so raw key is used
    expect(result.current.error).toBe('unknownErrorKey');
    expect(result.current.isPending).toBe(false);
  });

  // --- execute: exception ---

  it('should set unexpected error message when action throws', async () => {
    const { result } = renderHook(() => useConfirmationAction());

    const throwingAction = async (): Promise<AdminActionResult> => {
      throw new Error('network failure');
    };

    await act(async () => {
      await result.current.execute(throwingAction);
    });

    // 'admin.errors.unexpected' maps to '予期しないエラーが発生しました' in labels.json
    expect(result.current.error).toBe('予期しないエラーが発生しました');
    expect(result.current.isPending).toBe(false);
  });

  // --- execute: clears previous error ---

  it('should clear previous error before executing new action', async () => {
    const { result } = renderHook(() => useConfirmationAction());

    // First: set an error
    const failAction = async (): Promise<AdminActionResult> => ({
      error: 'failedToBan',
    });
    await act(async () => {
      await result.current.execute(failAction);
    });
    expect(result.current.error).not.toBeNull();

    // Second: succeed - error should be cleared
    const successAction = async (): Promise<AdminActionResult> => ({ success: true });
    await act(async () => {
      await result.current.execute(successAction);
    });
    expect(result.current.error).toBeNull();
  });

  // --- setError ---

  it('should allow manually setting an error', () => {
    const { result } = renderHook(() => useConfirmationAction());

    act(() => {
      result.current.setError('manual error');
    });

    expect(result.current.error).toBe('manual error');

    act(() => {
      result.current.setError(null);
    });

    expect(result.current.error).toBeNull();
  });
});
