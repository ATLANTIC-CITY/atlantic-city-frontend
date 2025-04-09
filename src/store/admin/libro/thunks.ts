import axios from "axios";
import { AppDispatch } from "../../store";
import { listLibros, listCopiasByLibroId } from "./libroSlice";

export const getLibrosDisponibles = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${API_URL}/Prestamo/listarLibro`, {
                timeout: 5000,
            });

            dispatch(listLibros(response.data));
        } catch (error) {
            console.error("Error al obtener los libros disponibles:", error);
        }
    };
};


export const getCopiasByLibroId = (nIdLibro: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${API_URL}/Prestamo/listarCopia`, {
                params: { nIdLibro },
                timeout: 5000,
            });
    
            dispatch(listCopiasByLibroId(response.data));
        } catch (error) {
            console.error(`Error al obtener copias del libro ${nIdLibro}:`, error);
        }
    };
};
  