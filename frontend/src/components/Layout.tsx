import Box from "@mui/material/Box";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { styled, useTheme } from '@mui/material/styles';
import wine from "../assets/wine.png"
import { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { NavLink, Outlet } from "react-router";
import { Typography } from "@mui/material";

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
    const [open, setOpen] = useState("");

    const items = {
        "drinks": ["vins", "bieres", "spiriteux"],
        "food": ["nourriture"]
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
                <PageLinks onHover={(s) => setOpen(_ => s)} onLeave={() => setOpen(_ => "")} />
            </PageHeader>
            <PageOption open={open} displayList={items[open] || []} />
            <Outlet />
        </>
    )
}

function Title() {
    return (
        <Box sx={{ display: 'flex', height: "100%", alignItems: 'center', gap: 3 }}>
            <img src={wine} alt="vin" />
            <Typography>Les Vignards à vélo</Typography>
        </Box>
    )
}

function PageLinks({ onHover, onLeave }: { onHover: (s: string) => void, onLeave: () => void }) {
    return (
        <BoxWrapper onMouseLeave={onLeave} sx={{ display: 'flex', height: "100%", gap: 2 }}>
            <Typography onMouseEnter={() => onHover("drinks")}>Les Boissons</Typography>
            <Typography onMouseEnter={() => onHover("food")}>Autres</Typography>
            <Typography>A propos</Typography>
        </BoxWrapper>
    )
}

function PageOption({ open, displayList }: { open: string, displayList: string[] }) {
    const [keepOpen, setKeepOpen] = useState(open);
    const theme = useTheme();
    console.log(keepOpen, open)
    return (
        <>
            <Box onMouseLeave={() => setKeepOpen("")} onMouseEnter={() => setKeepOpen((_) => open)} sx={{ display: 'flex', transform: keepOpen != "" || open != "" ? "scaleY(1)" : "scaleY(0)", backgroundColor: theme.palette.secondary.light, flexDirection: 'column', alignItems: 'center' }}>
                {displayList.map(item => {
                    return <Typography key={`item-${item}`} fontWeight='bold'>{item}</Typography>
                })}
            </Box>
        </>
    )
}