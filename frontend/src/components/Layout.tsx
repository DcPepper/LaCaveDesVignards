import { Box, Button } from "@mui/material";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { styled } from '@mui/material/styles';
import wine from "../assets/wine.png"
import { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Root = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isExpanded'
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
    transition: 'width height 0.5s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        height: isExpanded ? "15rem" : "30px",
        width: "100vw",
        display: "flex",
        justifyContent: 'center',
        borderBottom: "1px solid black",
        "& > img": {
            display: "none"
        }
    },
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: "1px solid black",
        height: "100vh",
        width: isExpanded ? "15rem" : "60px",
        gap: 5,
    },
}));

export default function Layout() {
    const [expand, setExpand] = useState(false);
    return (
        <ClickAwayListener onClickAway={() => setExpand(false)}>
            <Root isExpanded={expand}>
                {expand ? <img alt={"logo"} src={wine} width={"100%"} /> : ""}
                <DensityMediumIcon onClick={() => setExpand(!expand)} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.5 } }} />
            </Root>
        </ClickAwayListener>
    )
}