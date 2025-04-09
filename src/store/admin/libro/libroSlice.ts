import { createSlice } from '@reduxjs/toolkit';


export const libroSlice = createSlice({
    name: 'libro',
    initialState: {
        libros: [],
        copias: [],
        error: null,
        loading: false,
    },
    reducers: {
        listLibros: (state, { payload } ) => {
            state.libros = payload;
        },
        listCopiasByLibroId: (state, { payload }) => {
            state.copias = payload;
        },
    },
});

export const { listLibros, listCopiasByLibroId } = libroSlice.actions;
