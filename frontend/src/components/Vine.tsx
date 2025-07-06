import { Card, CardContent,  CardMedia,  styled,  TextField,  Typography } from "@mui/material";
import { Outlet, useLoaderData, useLocation } from "react-router";
import vinfond from "../assets/vinfond.jpg";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {  useState } from "react";
import { useNavigate } from "react-router";

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
    transition: 'width height 0.5s ease-in-out',
    display: 'flex',
    flexDirection:'row',
    flexWrap: 'wrap',
    gap: "20px",
    [theme.breakpoints.down('sm')]: {
        "& > div": {
            width: "100%"
        }
    },
    [theme.breakpoints.up('sm')]: {
        "& > div": {
            width: "calc(33% - 20px)"
        }
    },
}));

export function VineList() {
    let wines = useLoaderData();
    const [q, setQ] = useState("");
    let navigate = useNavigate();
    return (
        <Card sx={{backgroundColor:'inherit', borderRadius: "unset", height: '100vh', flex:1, width: '100%', display: 'flex', flexDirection: "column", gap:2, overflow:'scroll', alignItems:'center'}}>
            <div style={{
                minHeight:"50vh",
                width:'100%',
                backgroundImage: `url(${vinfond})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPositionY: '10%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
                }}>
            {/* <img className='wallpaper' src={vinfond} alt="vin" style={{  width:'100%', overflowY:'hidden', height:'100%', objectFit: 'cover', objectPosition:'top'}} /> */}
            <Typography variant="h4" sx={{color: "white", fontWeight: 'bold', textTransform:'uppercase', textAlign:'center'}}>La carte de nos vins</Typography>
            </div>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Recherche avancée"
                    inputProps={{ 'aria-label': 'Recherche avancée' }}
                    onChange={(e) => setQ(e.target.value)}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e) => {
                    e.preventDefault()
                    navigate({
                    pathname: "/wines",
                    search: `?q=${q}`,
                })
                }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <CardContentWrapper>

                {wines.hits.map((wine: Wine) => {
                    return (
                        <VineCard wine={wine} />
                    )
                })}
            </CardContentWrapper>
        </Card>
    )
}

interface Wine {
    id: number,
    photos: string,
    description: string,
    name: string,
    selection: boolean
}

function VineCard({wine}: {wine: Wine}) {
    console.log(wine)
    let navigate = useNavigate();
    return (
        <Card  
            onClick={() => navigate({
                pathname: `/wines/${wine.id}`,
                search: "",
            })} 
            key={`wine-${wine.id}`} 
            sx={{backgroundColor:'inherit', cursor: 'pointer', border: "1px solid", borderColor: wine.selection ? "gold": "black"}}>
                <CardMedia 
                sx={{
                    height:"200px",
                    backgroundSize: "contain"
                }}
                    image={`/src/assets/${wine.photos}`}
                />

                <CardContent sx={{textAlign: 'center'}}>
                {wine.name} 
                </CardContent>
        </Card>
    )
}

export function Vine() {
    let wine = useLoaderData();
    let navigate = useNavigate();
    return (
        <Card  
            onClick={() => navigate({
                pathname: `/wines/${wine.id}`,
                search: "",
            })} 
            key={`wine-${wine.id}`} 
            sx={{backgroundColor:'inherit', cursor: 'pointer', border: "1px solid"}}>
                <CardMedia 
                sx={{
                    height:"200px",
                    backgroundSize: "contain"
                }}
                    image={`/src/assets/${wine.photos}`}
                />

                <CardContent sx={{textAlign: 'center'}}>
                <h2>{wine.name} </h2>
                {wine.description}
                </CardContent>
        </Card>
    )
}

export function VineWrapper() {
    let location = useLocation();
    let navigate = useNavigate();
    let path = location.pathname.split("/")
    console.log(path)

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/wines/')
    }
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb"  onClick={handleClick}>
                <Link underline="hover" color="inherit" href="/">
                Vins
                </Link>
                <Typography sx={{ color: 'text.primary' }}>
                 {path[path.length - 1]}
                    </Typography>
            </Breadcrumbs>
            <Outlet /> 
        </div>
    )
}