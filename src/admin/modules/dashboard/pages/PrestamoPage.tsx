import Grid from "@mui/material/Grid2";
import { PrestamoForm } from "../components";



import styles from '../css/DashboardStyle.module.css';

export const PrestamoPage = () => {
    return (
        <>
            <section className={styles.sectDashboard}>
                <Grid container spacing={12}>
                    <Grid size={{ xs: 12, sm: 12,  md: 12 }}>
                        <PrestamoForm />
                    </Grid>
                </Grid>
            </section>
            
        </>
    )
}
