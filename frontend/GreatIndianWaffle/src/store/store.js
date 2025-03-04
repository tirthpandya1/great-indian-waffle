import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Import reducers
import authReducer from '../redux/authReducer';
import menuReducer from '../redux/menuReducer';
import orderReducer from '../redux/orderReducer';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'order'], // Only these reducers will be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, 
  combineReducers({
    auth: authReducer,
    menu: menuReducer,
    order: orderReducer,
  })
);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
