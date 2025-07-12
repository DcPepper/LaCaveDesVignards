import Box from "@mui/material/Box";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { styled, useTheme } from '@mui/material/styles';
import wine from "../assets/wine.png"
import { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { Menu, MenuItem, Paper, Typography } from "@mui/material";

const BoxWrapper = styled(Box)(({ theme }) => ({
    transition: "transform 0.25s ease",
    '& .MuiTypography-root': {
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        padding: 3,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.light,
            // '&:after': {
            //     content: "",
            // }
        }
    }
}))

const PageHeader = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isExpanded'
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
    transition: 'width height display 0.25s ease-in-out',
    display: 'flex',
    gap: 3,
    justifyContent: 'space-between',
    padding: "0 1rem 0  1rem",
    height: "5rem",
    backgroundColor: theme.palette.primary.light,
    alignItems: 'center',
    boxShadow: "0 2px 2px -2px gray",
    "& > div > img": {
        height: "100%",
    }
    // [theme.breakpoints.down('sm')]: {

    //     "& .header": {
    //         height: isExpanded ? "15rem" : "30px",
    //         width: "100vw",
    //         display: "flex",
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //     },
    //     "& > img": {
    //         display: "none"
    //     },
    //     display: 'flex',
    //     flexDirection: 'column',
    // },
    // [theme.breakpoints.up('sm')]: {
    //     "& .header": {
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         borderRight: "1px solid black",
    //         justifyContent: 'flex-start',
    //         height: "100vh",
    //         width: isExpanded ? "15rem" : "60px",
    //         gap: 5,
    //     },
    //     display: 'flex',
    // },
}));

export default function Layout() {
    const [expand, setExpand] = useState(false);
    const [lastVisited, setLastVisited] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
        setLastVisited(event.currentTarget.id)
    }

    function handleClose() {

        setAnchorEl(null);

    }

    return (
        // <PageHeader isExpanded={expand} >
        //     <ClickAwayListener onClickAway={() => setExpand(false)}>
        //         <Box className="header">
        //             {expand ? <Box>
        //                 <img alt={"logo"} src={wine} width={"100%"} /> 
        //                 <NavLink to={'/wines'}>Nos vins</NavLink>
        //             </Box>
        //             : ""}
        //             <DensityMediumIcon onClick={() => setExpand(!expand)} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.5 } }} />
        //         </Box>
        //     </ClickAwayListener>
        //     <Outlet />
        // </PageHeader>
        <>
            <PageHeader isExpanded={expand}>
                <Title />
                <PageLinks onHover={handleClick} onLeave={handleClose} lastVisited={lastVisited} anchorEl={anchorEl} />
            </PageHeader>
            <Outlet />
        </>
    )
}

function Title() {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', height: "100%", alignItems: 'center', gap: 3, cursor: 'pointer' }} onClick={() => navigate("/")}>
            <img src={wine} alt="vin" />
            <Typography>Les Vignards à vélo</Typography>
        </Box>
    )
}

function PageLinks({ onHover, onLeave, anchorEl, lastVisited }:
    {
        anchorEl: HTMLElement | null,
        onHover: (event: React.MouseEvent<HTMLElement>) => void,
        onLeave: () => void,
        lastVisited: string,
    }) {
    const items = {
        "drinks": ["vins", "bieres", "spiriteux"],
        "food": ["nourriture"]
    }
    return (
        <BoxWrapper onMouseLeave={onLeave} sx={{ display: 'flex', height: "100%", gap: 2 }}>
            <Typography onMouseEnter={onHover} id='drinks'>Les Boissons</Typography>
            <Typography onMouseEnter={onHover} id='food'>Autres</Typography>
            <Typography>A propos</Typography>
            <PageOption anchorEl={anchorEl} onClose={onLeave} displayList={items[lastVisited] || []} />
        </BoxWrapper>
    )
}

function PageOption({ displayList, anchorEl, onClose }: { onClose: () => void, displayList: string[], anchorEl: null | HTMLElement }) {
    const theme = useTheme();

    const translateItem = (item: string) => {
        switch (item) {
            case "vins":
                return "/wines"
            default:
                return ""
        }
    }
    return (
        <Menu
            open={Boolean(anchorEl)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            sx={{
                pointerEvents: 'none'
            }}
            slotProps={{
                list: {
                    onMouseLeave: onClose,
                },
                paper: {
                    sx: {
                        width: '50%',
                        backgroundColor: theme.palette.primary.contrastText,
                        color: "black",
                    }
                }
            }}
        >
            {displayList.map(item => {
                const link = translateItem(item)
                return (
                    <MenuItem key={`item-${item}`} sx={{ '&:hover': { backgroundColor: theme.palette.primary.light }, textTransform: 'capitalize' }}>
                        <Link to={link}>{item}</Link>
                    </MenuItem>
                )
            })}
        </Menu>
    )
}