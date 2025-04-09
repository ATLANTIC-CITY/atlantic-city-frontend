import { Navigate, Outlet, Route, Routes } from "react-router";
// import { LoginPage } from "../modules/auth/pages/LoginPage";
import { LayoutAdministradorPage } from "../modules/layout/page/LayoutAdministradorPage";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage";
import { PrestamoPage } from "../modules/dashboard/pages/PrestamoPage";
// import { CheckingAuth } from "../modules/components";
// import { useCheckAuth } from "../../hooks/useCheckAuth";


export const AdminRoutes = () => {
   
    return (
        <Routes>

            <Route path="/dashboard" element={<LayoutAdministradorPage> <Outlet /> </LayoutAdministradorPage>} >
                <Route path="" element={<DashboardPage />} />
                <Route path="prestamo" element={<PrestamoPage />} />
                <Route path="prestamo/:id" element={<PrestamoPage />} />
            </Route>

            <Route path="*" element={<Navigate to={"/dashboard"} />} />
        </Routes>
    )
}
