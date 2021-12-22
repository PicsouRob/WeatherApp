import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import Reducer from './Reducer';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const store = createStore(persistReducer(rootPersistConfig, Reducer));

export default store;
