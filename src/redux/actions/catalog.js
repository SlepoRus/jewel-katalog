var api = require('../../api').Jewelry;

export const CATALOG_REQUEST_STARTED = 'CATALOG_REQUEST_STARTED';
export const CATALOG_REQUEST_FINISHED = 'CATALOG_REQUEST_FINISHED';
export const CATALOG_REQUEST_ERROR = 'CATALOG_REQUEST_ERROR';
function catalogRequestStarted() {
  return { type: CATALOG_REQUEST_STARTED };
}

function catalogRequestFinished(data ) {
  return { type:CATALOG_REQUEST_FINISHED, data };
}

function catalogRequestError(errors) {
  return { type: CATALOG_REQUEST_ERROR, errors };
}
export function catalogRequest(data,error) {
  return (dispatch, getState) => {
    return dispatch(catalogRequestFinished(data))
  };
}
