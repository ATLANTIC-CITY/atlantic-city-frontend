import Grid from "@mui/material/Grid2";
import { CardAdmin } from "../../components/CardAdmin";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PerfilDashboard, PrestamoTable } from "../components";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from '../css/DashboardStyle.module.css';
import { getAllPrestamo } from "../../../../store/admin/prestamo";


export const DashboardPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /////////////////////////////////////////////////////
    const { prestamos } = useSelector((state: any) => state.prestamo);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getAllPrestamo());
    }, [dispatch]);

    useEffect(() => {
        if (prestamos && prestamos.length > 0) {
            setRows(prestamos);
        }
    }, [ prestamos ]);
    /////////////////////////////////////////////////////

    return (
        <section className={styles.sectDashboard}>

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, sm: 12,  md: 9 }} sx={{ order: { xs:1, sm: 1, md: 2 } }}>
                    <CardAdmin>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: '700' }}>PRÉSTAMOS</Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/dashboard/prestamo");
                                }}
                            >
                                AGREGAR
                            </Button>
                        </Box>
                        <Box>
                            <PrestamoTable
                                rows={rows.map((row: any) => ({ ...row }))}
                            />
                        </Box>
                    </CardAdmin>
                </Grid>

                <Grid size={{ xs: 12, sm: 12,  md: 3 }} sx={{ order: { xs: 3, sm: 3, md: 3 } }}>
                    <CardAdmin>
                        <PerfilDashboard sUsuario={ "BORIS ESTRADA" } />
                    </CardAdmin>
                </Grid>

                { /****************/}
            </Grid>
        </section>
    )
}