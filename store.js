import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import Reactotron from './ReactotronConfig'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import forumReducer from './reducers/forumReducer';
import activeUserReducer from './reducers/activeUserReducer';
import contactReducer from './reducers/contactReducer';
import userInfoForAdminReducer from './reducers/userInfoForAdminReducer';

const appReducer = combineReducers({
  forum: forumReducer,
  activeUser: activeUserReducer,
  contact: contactReducer,
  userInfoForAdmin: userInfoForAdminReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(applyMiddleware(thunk), Reactotron.createEnhancer()));

export const persistor = persistStore(store);
