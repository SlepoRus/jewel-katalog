var api = require('../../api').Jewelry;

export const CATALOG_REQUEST_STARTED = 'CATALOG_REQUEST_STARTED';
export const CATALOG_REQUEST_FINISHED = 'CATALOG_REQUEST_FINISHED';
export const CATALOG_REQUEST_ERROR = 'CATALOG_REQUEST_ERROR';
function catalogRequestStarted() {
  return { type: CATALOG_REQUEST_STARTED };
}

function catalogRequestFinished(data ) {
  var { offset, catalog } = data;
  if (offset == undefined) offset = 0;
  const SKIP_LIMIT = 40;
  offset = offset + 60;
  return { type: CATALOG_REQUEST_FINISHED, catalog, offset };
}

function catalogRequestError(errors) {
  return { type: CATALOG_REQUEST_ERROR, errors };
}
export function catalogRequest(data = {},error) {
  return (dispatch, getState) => {
    dispatch(catalogRequestStarted());
    return api.read(data).then((val) => {

      if (data.catalog) {
        data.catalog = data.catalog.concat(val.data)
      } else {
        data.catalog = val.data;
      }

      dispatch(catalogRequestFinished(data))
    }).catch((err) => {
      dispatch(catalogRequestError('Произошла ошибка ' + err))
    })
  };
}
