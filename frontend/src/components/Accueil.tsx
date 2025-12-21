import { Box, Button, Typography } from "@mui/material";
import stock from "../assets/caveStock.jpg"
import wineGlass from "../assets/wineGlass.jpg"
export default function Accueil() {
    return (
        <Box 
        sx={{
            flexGrow: 1, 
            overflow:"scroll", 
            color: "white",
            scrollSnapType: 'y mandatory'
        }}>
                <Box
                    sx={{
                        padding: 3,
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${stock})`, 
                        backgroundPosition: '50% 100%',
                        height: '100%',
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between',
                        scrollSnapAlign: 'start'
                    }}
                >
                    <>
                        <Typography variant="h3"  fontWeight={"bold"} fontFamily={["Lobster"]} textAlign={"center"}>Bienvenue à</Typography>
                        <Typography variant="h3"  fontWeight={"bold"} fontFamily={["Lobster"]} textAlign={"center"}>La Cave des Vignards</Typography>
                    </>
                    <Box sx={{flexGrow:1, display:'flex', flexDirection: 'column', justifyContent:'center', gap:3}}>
                        <Typography fontSize={'.9rem'} textAlign={'center'}>
                            La Cave des Vignards est votre caviste local de proximité et avant tout un lieu unique de partage, de convivialité et de découvertes où chaque produit raconte une histoire.
                        </Typography>
                        <Typography fontSize={'.9rem'} textAlign={'center'}>
                            Née de deux amoureux du vin et des humains, vous découvrirez à la Cave des Vignards une sélection originale et unique de vins, de bières, de spiritueux, de boissons non alcoolisées ou encore d’essentiels en épicerie fine.
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{color: 'black', background: '#ecd8da'}}>
                        <Typography textTransform={'uppercase'} fontSize={'16px'} fontFamily={'AmaticSC'}>
                            Pour en savoir plus sur les vignards cliquez ici :)
                        </Typography>
                    </Button>
                </Box>
                <Box
                        sx={{
                            padding: 3,
                            backgroundImage: `url(${wineGlass})`, 
                            backgroundSize: '100%',
                            // backgroundPosition: '50% 100%',
                            height: '50%',
                            display:'flex',
                            flexDirection: 'column',
                            justifyContent:'space-between',
                            scrollSnapAlign: 'start'
                        }}
                    >
                    </Box>

                <Box
                    sx={{
                        height: '100%',
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-between',
                        scrollSnapAlign: 'start',
                        color: "white",
                        padding: 2,
                    }}
                >
                    <Typography textAlign={'left'} variant="h4">Bons et bons prix !</Typography>
                    
                    <Box sx={{flexGrow:1, display:'flex', flexDirection: 'column', justifyContent:'center', gap:3}}>
                        <Typography fontSize={'.9rem'} textAlign={'justify'}>
                            Dans l’esprit de proposer des bouteilles de qualité et accessibles au plus grand nombre, nous sommes allés à la rencontre des producteurs pour comprendre leurs histoires et celles de leurs produits afin de vous proposer la meilleure sélection. 
                        </Typography>
                        <Typography fontSize={'.9rem'} textAlign={'justify'}>
                            Nous avons fait le choix de travailler en direct avec des vignerons indépendants pour plus de 90% des vignerons et distilleries sélectionnés et avec 100% de fournisseurs de produits d'épicerie fine et brasseurs locaux ou basés en France. Un choix éthique qui permet à La Cave des Vignards de vous faire découvrir de véritables pépites à prix raisonnables tout en assurant une rémunération équitable à toutes celles et ceux sans qui les produits que nous aimons tant ne seraient rien ! 
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{color: 'black',  background: '#ecd8da'}}>
                        <Typography textTransform={'uppercase'} fontSize={'16px'} fontFamily={'AmaticSC'}>
                            Pour découvrir nos produits cliquez ici ;)
                        </Typography>
                    </Button>
                </Box>
        </Box>
    )
}