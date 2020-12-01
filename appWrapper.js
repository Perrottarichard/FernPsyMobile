import React from 'react'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store} from './store'
import {persistor} from './store'
import App from './App'
import {ActivityIndicator} from 'react-native'

const AppWrapper = () => {
  return(
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator size='large' color='blue'/>} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
  )
}
export default AppWrapper;
