/* @flow */

export type LoadState =
  | {| +error: Object, type: 'FAILURE' |}
  | {| +type: 'UNINITIALIZED' | 'LOADING' | 'STEADY' |};

export const UNINITIALIZED_LOAD_STATE = { type: 'UNINITIALIZED' };
export const LOADING_LOAD_STATE = { type: 'LOADING' };
export const STEADY_LOAD_STATE = { type: 'STEADY' };

export function createFailureLoadState(error: Object) {
  return { error, type: 'FAILURE' };
}
