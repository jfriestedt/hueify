import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore (initialState = {}) {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
