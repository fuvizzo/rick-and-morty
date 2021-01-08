/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThunkDispatch } from 'redux-thunk';
import { Action, CombinedState } from 'redux';
import * as UIActions from '../ui/actions';
import { RootState } from '..';

type AppThunk = ThunkDispatch<CombinedState<RootState>, unknown, Action<string>>

const buildRequestAndDispatchAction = async (
  callBack: () => void,
  dispatch: AppThunk,
  skipLoading: boolean = false,
): Promise<void> => {
  if (!skipLoading) {
    dispatch(UIActions.toggleLoadingSpinner());
  }
  try {
    await callBack();
  } catch (error: any) {
    handleError(error, dispatch);
  }
  dispatch(UIActions.toggleLoadingSpinner());
};

const handleError = (error: any, dispatch: AppThunk): void => {
  // log error or send to log aggregation tool
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
  dispatch(UIActions.setError(error.message));
};

export default buildRequestAndDispatchAction;
