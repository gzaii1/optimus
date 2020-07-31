import { combineReducers } from 'redux';
import { HomeReducer } from './Home.reducer'
import { LoginReducer } from './Login.reducer'
import { LeftReducer } from './Left.reducer'

const rootReducer = combineReducers({
    HomeReducer,
    LoginReducer,
    LeftReducer,
});

export default rootReducer;