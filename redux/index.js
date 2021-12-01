import { createStore, applyMiddleware,compose } from 'redux';
import { createWrapper } from "next-redux-wrapper"
import thunk from 'redux-thunk';
import reducer from './reducers';

const middleware = [thunk];

export const makeStore = () => createStore(reducer, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)

// in this file we are initializing the redux store by passing initial state and instance of reducer, we are applying thunk middleware to support async data flow.
// export const initStore = (initialState = {}) => {
//   return createStore(reducer, initialState, applyMiddleware(thunk));
// };