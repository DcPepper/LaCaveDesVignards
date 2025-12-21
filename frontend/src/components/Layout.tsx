import Box  from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import logo from "../assets/caveLogo.jpg";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { ClickAwayListener, Dialog, Fade, IconButton, Menu, Slide, Typography, useScrollTrigger } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
  });
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const Root = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isExpanded'
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
    transition: 'width height 0.5s ease-in-out',
    background: "white",
    [theme.breakpoints.down('sm')]: {
        
        "& .header":{
            height: "10rem",
            padding: "1rem",
            width: "100vw",
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        "img": {
            width: "30%",
            height: "auto"
        },
        display: 'flex',
        flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
        "& .header": {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: "20%",
            gap: 5,
        },
        display: 'flex',
    },
}));

interface NAVIGATION {
    title: string
    path: string
}

export default function Layout() {
    const [expand, setExpand] = useState(false);
    const location = useLocation();
    let navigate = useNavigate();

    const NAVIGATION: NAVIGATION[] = [
        {
            title: "Accueil",
            path: "/",
        },
        {
            title: "Nos produits",
            path: '/nos-produits'
        },
        {
            title: "Qui sont les Vignards ?",
            path: "/qui-sont-les-vignards"
        },
        {
            title: "Professionnels, mariage, etc...",
            path: "/professionnels-mariage-etc"
        },
        {
            title: "Contactez nous",
            path: "/contactez-nous"
        },
    ]
    
    return (
        <>

            <Root isExpanded={expand} >
                <Box className="header">
                    <img src={logo} alt="caveLogo"/>
                    <IconButton onClick={() => setExpand(!expand)}>
                        <DensityMediumIcon />   
                    </IconButton>

                    <Dialog fullWidth
                        open={expand}
                        onClose={() => setExpand(false)} 
                        sx={{
                            "& .MuiDialog-container": {
                                alignItems: 'flex-start',
                                "& .MuiPaper-root": {
                                    position: 'relative',
                                    margin: 0,
                                    borderRadius: 0,
                                    width: "100%",
                                    alignItems:"center",
                                    gap: 2,
                                    py: 4,
                                    // maxWidth: "500px",  // Set your width here
                                },
                            },
                        }}
                        >
                        <IconButton onClick={() => setExpand(false)} sx={{position:'absolute', right: 0, top: 0}}>
                            <CloseIcon />
                        </IconButton>
                        {NAVIGATION.map(nav => (
                            <Typography color={nav.path == location.pathname ? 'brown': 'black'} key={`nav-${nav.path}`} sx={{cursor: 'pointer'}} onClick={() => {navigate(nav.path); setExpand(false)}}>{nav.title}</Typography>
                        ))}
                    </Dialog>
                </Box>
            </Root>
            <HideOnScroll>

            </HideOnScroll>
            <Outlet />  
        </>
    )
}