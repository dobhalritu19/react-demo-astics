// import {createStore} from 'redux';
// import rootReducer from './reducers';

// export default function configureStore(initialState) {
//   return createStore(rootReducer, initialState);
// }

import {createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './reducers'
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}