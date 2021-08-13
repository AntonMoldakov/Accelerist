import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import companies from './companies';
import { reducer as toastrReducer } from 'react-redux-toastr';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: user.reducer,
  companies: companies.reducer,
  toastr: toastrReducer,
});

export default persistReducer(persistConfig, rootReducer);
