import { CATALOG_REQUEST_STARTED,CATALOG_REQUEST_FINISHED,CATALOG_REQUEST_ERROR } from '../actions/catalog';
const initialState = {
  errors: null,
  loading: false,
  catalog: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CATALOG_REQUEST_STARTED:
      return {
        loading: true,
        errors: null
      };
    case CATALOG_REQUEST_FINISHED:
      return {
        loading: false,
        errors: null,
        catalog: action.catalog,
        offset: action.offset
      };
    case CATALOG_REQUEST_ERROR:
      return {
        loading: false,
        errors: action.errors
      };
    default:
      return state;
  }
}
