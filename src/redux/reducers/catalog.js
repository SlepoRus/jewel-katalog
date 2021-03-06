import { CATALOG_REQUEST_STARTED,CATALOG_REQUEST_FINISHED,CATALOG_REQUEST_ERROR } from '../actions/catalog';
const initialState = {
  search_text: '',
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
        search_text: action.data
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
