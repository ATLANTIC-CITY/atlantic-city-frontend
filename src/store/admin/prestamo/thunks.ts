import axios from "axios";
import { AppDispatch } from "../../store";
import { listPrestamo, savePrestamo, setActivePrestamo } from "./prestamoSlice";
import { PrestamoDTO } from "../../../admin/interfaces/Prestamo.interface";

export const getAllPrestamo = () => {
    return async( dispatch: AppDispatch ) => {

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await axios.get(`${API_URL}/Prestamo/listar`, {
                timeout: 5000,
            });
            
            dispatch(listPrestamo( response.data ));
            
        } catch (error) {
            console.error("Error al al obtener los prestamos:", error);
        }
    }
}

export const postSavePrestamo = ( prestamoData: PrestamoDTO ) => {
    return async( dispatch: AppDispatch, getState: any ) => {

        try {

            

            const parseCustomDate = (dateString?: string): string => {
                if (!dateString) return new Date().toISOString().slice(0, 19); // fallback seguro
                const [day, month, year, time] = dateString.split(/[/ ]/);
                return new Date(`${year}-${month}-${day}T${time}`).toISOString().slice(0, 19);
            };
              
            console.log(parseCustomDate(prestamoData.dFechaPrestamo));     
           
            const API_URL = import.meta.env.VITE_API_URL;

            const newPrestamo = {
                ...prestamoData
                ,dFechaPrestamo: parseCustomDate(prestamoData.dFechaPrestamo)
                ,nIdCliente: 1
                ,sEstado: 'Disponible'
                ,nIdUsuarioCrea: 1
            }

            console.log(newPrestamo);            
            
            const response = await axios.post(
                `${API_URL}/Prestamo/registrar/`
                ,{ ...newPrestamo }
                ,{
                    timeout: 5000
                }
            );     

            dispatch(savePrestamo( newPrestamo ));

            newPrestamo.nIdPrestamo = response.data.id;
            newPrestamo.success = response.data.success;
            newPrestamo.data = response.data.data;

            dispatch( setActivePrestamo( { ...newPrestamo } ) );      

            
        } catch (error) {
            console.error("Error al al insertar préstamo:", error);
        }
    }
}


export const putUpdatePrestamo = ( prestamoData: PrestamoDTO ) => {
    return async( dispatch: AppDispatch, getState: any ) => {

        try {
                    
            
        } catch (error) {
            console.error("Error al al actualizar el préstamo:", error);
        }
    }
}