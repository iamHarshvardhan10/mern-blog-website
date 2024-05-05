import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const rootReducers = combineReducers({
    user: userReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)