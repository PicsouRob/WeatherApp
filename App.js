import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import StackNav from "./src/Components/StackNavigation";
import store from './src/Redux/Store';

function App() {
  const persistor = persistStore(store);
  return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <StackNav />
        </PersistGate>
      </Provider>
  );
};

export default App;