import { Box, Button, List, ListItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import SideBarItem from "../buttons/SideBarItem";

import imgLogo from '../../img/logo2.svg';
import style from '../../css/SideBar.module.css';

import HomeIcon from '@mui/icons-material/Home';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Logout } from "@mui/icons-material";
import { useAppDispatch } from "../../../../../hooks/reactRedux";
import { useNavigate } from "react-router";

export const SideBar = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch(); 
    const [ dense, setDense ] = useState(false);

    return (
        <>
            <section className={style.sectSideBar}>
                <Grid>
                    <Grid sx={{ mt: 4, textAlign: "center" }}>
                        <img src={ imgLogo } alt="" width="70" />
                    </Grid>
                    <Box>
                        <List dense={dense} className={style.listMenu}>
                            <SideBarItem
                                isActive={ true }
                                icon={ <HomeIcon /> }
                                onClick={ () => navigate('/dashboard')}
                            />

                            <SideBarItem isActive={ false } icon={ <FireTruckIcon />  } onClick={ () => navigate('/dashboard')} />
                            <SideBarItem isActive={ false } icon={ <PointOfSaleIcon /> } onClick={ () => navigate('/dashboard')} />
                            <SideBarItem isActive={ false } icon={ <PointOfSaleIcon /> } onClick={ () => navigate('/dashboard')} />
                            <SideBarItem isActive={ false } icon={ <PointOfSaleIcon /> } onClick={ () => navigate('/dashboard')} />
                            <SideBarItem isActive={ false } icon={ <PointOfSaleIcon /> } onClick={ () => navigate('/dashboard')} />
                            <SideBarItem isActive={ false } icon={ <PointOfSaleIcon /> } onClick={ () => navigate('/dashboard')} />
                        </List>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <List >
                            <ListItem>
                                <Button
                                    onClick={ () => {} }
                                    disableRipple
                                    sx={{
                                        display: 'block'
                                        ,margin: '0 auto'
                                        ,background: '#ffffff'
                                        ,borderRadius: '50px'
                                        ,width: '70px'
                                        ,height: '70px'
                                        ,color: '#000000'
                                        ,transition: 'all ease .3s'
                                        ,'&:hover': {
                                            background: '#000000'
                                            ,color: '#ffffff'
                                            ,transition: 'all ease .3s'
                                        }
                                    }}
                                >
                                    <Logout />
                                </Button>
                            </ListItem>
                        </List>                        
                    </Box>
                </Grid>
            </section>
        </>
    )
}
