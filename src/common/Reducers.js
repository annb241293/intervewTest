
import { combineReducers } from 'redux';

const initState = {
    isLogin: false
}

const CommonReducer = (state = initState, action = {}) => {

    switch (action.type) {

        case 'LOGIN':
            return { ...state, isLogin: action.isLogin }

        default:
            return state
    }
}

const AppReducer = combineReducers({ CommonReducer });

export default AppReducer;
