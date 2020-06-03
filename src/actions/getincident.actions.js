import {fetchApi} from "../service/api";

export const getIncident = (payload) => {
    return async (dispatch) => {

        try {
          dispatch({
            type: "LOGIN_USER_LOADING"
          });
          const response = await fetchApi("/front/api/getIncidentServices", "POST", payload, 200);
            //console.log(response);
          if(response.responseBody.status) {
            dispatch({
                type: "LOGIN_USER_SUCCESS",
            });
            dispatch({
                type: "AUTH_USER_SUCCESS",
                token: response.token
            });
            dispatch({
                type: "GET_USER_SUCCESS",
                payload: response.responseBody.data
            });
            return response.responseBody.data;
          } else {
            throw response;
          }

        } catch (error) {
            dispatch({
                type: "LOGIN_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}
