import { useEffect, useMemo } from "react";
import { Box, Button, FormControl, InputAdornment, InputLabel, Select, TextField, Typography, MenuItem, FormHelperText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Grid2";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useForm } from "../../../../hooks/useForm";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { CardAdmin, DatepickerAdmin } from "../../components";
import { useNavigate, useParams } from "react-router";
import { postSavePrestamo, putUpdatePrestamo } from "../../../../store/admin/prestamo";
import { getCopiasByLibroId, getLibrosDisponibles } from "../../../../store/admin/libro";

const formatDate = (date: Date) => {
    return date.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", "");
};

const formValidations = {
    nIdLibro: [(value: any) => !!value, 'Selecciona el libro'],
    nIdCopia: [(value: any) => !!value, 'Selecciona la copia del libro'],
    dFechaPrestamo: [(value: any) => !!value, 'Selecciona la fecha de préstamo'],
};


export const PrestamoForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /////////////////////////////////////////
    const { data , success, active } = useSelector((state: any) => state.prestamo);

    ///////////////////////////////////////////////////

    const { active:prest } = useSelector( (state: any) => state.prestamo);

    const initialFormState = useMemo(() => ({
        nIdLibro: '',
        nIdCopia: '',
        nPrecio: "S/ 9.00",
        dFechaPrestamo: formatDate(new Date())
    }), [ prest ]);

    const { formState, onInputChange, onSelectChange, isFormValid,
        nIdLibro, nIdCopia, nPrecio, dFechaPrestamo,
        nIdLibroValid, nIdCopiaValid, nPrecioValid, dFechaPrestamoValid
    } = useForm( initialFormState, formValidations );
    
    ///////////////////////////////////////////////////

    const onClickSavePrestamo = () => {

        if ( !isFormValid ) return;
        try {
            if ( !active?.id ){
                dispatch(postSavePrestamo( formState ));
            }else{
                dispatch(putUpdatePrestamo( formState ));
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    useEffect(() => {
        if (success || data) {
            Swal.fire("Éxito", data.sMsj, "success");
            // navigate("/dashboard/prestamo/" + active.id );
        }
    }, [ success, data ] );

    /////////////////////////////////////////////////
    
    useEffect(() => {
        dispatch(getLibrosDisponibles());
    }, [ success, data ]);

    const { libros } = useSelector((state: any) => state.libro);
    ////////////////////////////////////////////////

    useEffect(() => {
        if (nIdLibro) {
          dispatch(getCopiasByLibroId(nIdLibro));
        }
      }, [nIdLibro]);

    const { copias } = useSelector((state: any) => state.libro);
    ///////////////////////////////////////////////

    return (
        <>
            <CardAdmin>
                <Grid>
                    <Box
                        component="form"
                        noValidate
                    >
                        <Grid container rowSpacing={4} columnSpacing={3}>
                            <Grid size={12} sx={{ mb: 3 }}>
                                <Typography component="h1" variant="h4" sx={{ fontWeight: "600"}}>
                                    { prest?.id == null ? "CREAR PRESTAMO" : prest?.id !== null ? "EDITAR PRESTAMO" : "ACCION DESCONOCIDA"}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12,  md: 12 }} container sx={{ alignItems: "flex-start"}}>

                                <Grid size={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Libro</InputLabel>
                                        <Select
                                            id="nIdLibro"
                                            name="nIdLibro"
                                            value={ nIdLibro }
                                            label="Libro"
                                            onChange={ onSelectChange }
                                            error={ !!nIdLibroValid }
                                        >
                                        {
                                            libros?.data?.map((libro: any) => (
                                                <MenuItem key={libro.nCod} value={libro.nCod}> {libro.sDesc} </MenuItem>
                                            ))
                                        }
                                        </Select>
                                        {nIdLibroValid && <FormHelperText>{ nIdLibroValid }</FormHelperText>}
                                    </FormControl>
                                </Grid>

                                <Grid size={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Libro Copia</InputLabel>
                                        <Select
                                            id="nIdCopia"
                                            name="nIdCopia"
                                            value={ nIdCopia }
                                            label="Libro Copia"
                                            onChange={ onSelectChange }
                                            error={ !!nIdCopiaValid }
                                        >
                                        {
                                            copias?.data?.map((copia: any) => (
                                                <MenuItem key={copia.nCod} value={copia.nCod}> {copia.sDesc} </MenuItem>
                                            ))
                                        }
                                        </Select>
                                        {nIdCopiaValid && <FormHelperText>{ nIdCopiaValid }</FormHelperText>}
                                    </FormControl>
                                </Grid>          


                                <Grid size={4}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        id="nPrecio"
                                        label="Precio"
                                        name="nPrecio"
                                        value={ nPrecio }
                                        disabled
                                        onChange={ onInputChange }
                                    />
                                </Grid>
                                                  
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12,  md: 4 }}>
                                <CardAdmin>
                                    <Typography variant="h5" sx={{m:0}}><b>Fecha de Préstamo</b></Typography>
                                    <DatepickerAdmin
                                        name="dFechaPrestamo"
                                        value={ dFechaPrestamo }
                                        onChange={onInputChange}
                                    />
                                </CardAdmin>
                            </Grid>

                            <Grid size={12} container>                                
                                <Grid size={6}>
                                    <Button type="button" onClick={ onClickSavePrestamo } fullWidth variant="contained">Guardar</Button>
                                </Grid>
                                <Grid size={6}>
                                    <Button onClick={ () => navigate("/dashboard") }  fullWidth variant="contained">Regresar</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>

            </CardAdmin>
        </>
    );
};
