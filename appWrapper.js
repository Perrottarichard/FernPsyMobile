import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { store, persistor } from './store';

import App from './App';

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={<View style={styles.loadingContainer}><ActivityIndicator size="large" color="pink" /></View>} persistor={persistor}>
      <PaperProvider>
      <App />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default AppWrapper;
