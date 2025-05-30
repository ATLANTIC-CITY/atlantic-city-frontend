import { configureStore } from '@reduxjs/toolkit';
import { prestamoSlice } from './admin/prestamo/prestamoSlice';
import { libroSlice } from './admin/libro';

export const store = configureStore({
    reducer: {
        prestamo    : prestamoSlice.reducer,
        libro       : libroSlice.reducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;