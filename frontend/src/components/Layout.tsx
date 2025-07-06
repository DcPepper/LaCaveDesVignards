import Box  from "@mui/material/Box";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { styled } from '@mui/material/styles';
import wine from "../assets/wine.png"
import { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { NavLink, Outlet } from "react-router";

const Root = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isExpanded'
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
    transition: 'width height 0.5s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        
        "& .header":{
            height: isExpanded ? "15rem" : "30px",
            width: "100vw",
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        "& > img": {
            display: "none"
        },
        display: 'flex',
        flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
        "& .header": {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRight: "1px solid black",
            justifyContent: 'flex-start',
            height: "100vh",
            width: isExpanded ? "15rem" : "60px",
            gap: 5,
        },
        display: 'flex',
    },
}));

export default function Layout() {
    const [expand, setExpand] = useState(false);
    return (
        <Root isExpanded={expand} >
            <ClickAwayListener onClickAway={() => setExpand(false)}>
                <Box className="header">
                    {expand ? <Box>
                        <img alt={"logo"} src={wine} width={"100%"} /> 
                        <NavLink to={'/wines'}>Nos vins</NavLink>
                    </Box>
                    : ""}
                    <DensityMediumIcon onClick={() => setExpand(!expand)} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.5 } }} />
                </Box>
            </ClickAwayListener>
            <Outlet />
        </Root>
    )
}