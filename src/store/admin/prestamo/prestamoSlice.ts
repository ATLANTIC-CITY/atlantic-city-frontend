import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrestamoDTO } from '../../../admin/interfaces/Prestamo.interface';

interface PrestamoState {
    prestamos: PrestamoDTO[];
    loading: boolean;
    error: string | null;
}

const initialState: PrestamoState = {
  prestamos: [],
  loading: false,
  error: null,
};

export const prestamoSlice = createSlice({
    name: 'prestamo',
    initialState: {
        prestamos: [],
        errMsj: '',
        success: false || null,
        data: null,
        active: null
    },
    reducers: {
        listPrestamo: (state, { payload }) => {
            console.log( payload );
            state.prestamos = payload.data;
        },
        savePrestamo: ( state, { payload }) => {
            state.success = payload.success;
            state.data = payload.data;
            state.errMsj = payload.errMsj;
        },
        setActivePrestamo: (state, { payload } ) => {
            state.active = payload;
            state.success = payload.success;
            state.data = payload.data;
        },
    },
});

export const { listPrestamo, savePrestamo, setActivePrestamo } = prestamoSlice.actions;