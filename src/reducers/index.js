import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import incidentReducer from "./incident.reducer";
import { YellowBox } from 'react-native';

const reducers = {
    authReducer,
    userReducer,
    incidentReducer,
    form: formReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {

    if (action.type === "USER_LOGGED_OUT_SUCCESS") {
        state = {}
    }

    return appReducer(state, action);
}
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);
export default rootReducer;
