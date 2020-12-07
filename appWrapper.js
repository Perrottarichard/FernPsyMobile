import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { store, persistor } from './store';

import App from './App';

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator size="large" color="blue" />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
export default AppWrapper;
