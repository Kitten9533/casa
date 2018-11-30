import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState){
    const store = createStore(
        rootReducer, 
        composeEnhancer(applyMiddleware(
          thunkMiddleware,
        //   loggerMiddleware
        ))
    )

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store
}