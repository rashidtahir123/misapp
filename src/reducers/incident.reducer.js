import { combineReducers } from 'redux';

const getIncident = (state = {}, action) => {

    switch (action.type) {

      case "GET_INCIDENT_LOADING":
          return {
            isLoading: true,
            isError: false,
            isSuccess: false,
            userDetails: null,
            errors: null
          }

      case "GET_INCIDENT_SUCCESS":
          return {
            isLoading: false,
            isError: false,
            isSuccess: true,
            incidentListing: action.payload,
            errors: null
          }

      case "GET_INCIDENT_FAIL":
          return {
            isLoading: false,
            isError: true,
            isSuccess: false,
            userDetails: null,
            errors: action.payload
          }

      default:
        return state;
    }
}

export default combineReducers({
    getIncident
});
