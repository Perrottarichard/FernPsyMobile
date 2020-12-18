import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme, DarkTheme} from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, StyleSheet, View, Appearance} from 'react-native';
import { store, persistor } from './store';

import App from './App';
const colorMode = Appearance.getColorScheme()

let theme;
if(colorMode === 'light'){
  theme = {...DefaultTheme}
}else{
  theme = {...DarkTheme}
}

const AppWrapper = () => (
  <Provider
    store={store}
  >
    <PersistGate
      loading={<View
        style={{...styles.loadingContainer, backgroundColor: theme.colors.background}}
      >
        <ActivityIndicator
          size="large" 
          color="pink"
        />
      </View>} persistor={persistor}
    >
      <PaperProvider
        theme={theme}
      >
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
