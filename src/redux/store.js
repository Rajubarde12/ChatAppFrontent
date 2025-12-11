import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers'; // your slice reducer

const reducers = combineReducers({
  app: appReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
