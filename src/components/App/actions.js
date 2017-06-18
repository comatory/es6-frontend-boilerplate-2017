export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';
export const CALL_ASYNC_ACTION_END = 'CALL_ASYNC_ACTION_END';
export const CALL_ASYNC_ACTION_START = 'CALL_ASYNC_ACTION_START';

export function changeBackground() {
  return {
    type: CHANGE_BACKGROUND,
  };
}

export function callAsyncAction() {
  return (dispatch) => {
    dispatch({
      type: CALL_ASYNC_ACTION_START,
    });
    setTimeout(
      () => {
        dispatch({
          type: CALL_ASYNC_ACTION_END,
        });
      }, 2000,
    );
  };
}
