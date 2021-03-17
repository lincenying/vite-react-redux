import { createStore, applyMiddleware, compose } from 'redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
import DevTools from '@devtools'

// const logger = createLogger()
export function configureCounterStore(initialState) {
    const middleware = [thunk]
    const enhancers = []
    const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), DevTools.instrument(), ...enhancers))
    return store
}
