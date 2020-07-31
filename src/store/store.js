import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import saga from '../sagas'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        // sagaMiddleware,
    )
);

// console.log('saga~~', saga)

// sagaMiddleware.run(saga)
