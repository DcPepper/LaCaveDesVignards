import {
    createBrowserRouter,
} from "react-router";
import Layout from "./components/Layout";
import "./App.css";
import {VineList, Vine, VineWrapper} from "./components/Vine";
import Accueil from "./components/Accueil";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Accueil />,
                // children: [
                //     {
                //         path: "wines",
                //         element: <VineList />,
                //         loader: async ({request})  => {
                //             const searchParams = new URL(request.url).searchParams;
                //             const searchTerm = searchParams.get("q");
                //             let res = await fetch(`http://localhost:8000/api/wines?q=${searchTerm || ""}`)
                //             return res;
                //         },
                        
                //     },
                //     {
                //         path: "wines/:id",
                //         element: <Vine />,
                //         loader: async ({params})  => {
                //             let res = await fetch(`http://localhost:8000/api/wine/${params.id}/`)
                //             return res;
                //         },
                //     }
                // ]
                
            }, 
            {
                path: '/nos-produits',
                element: <>produits</>
            },
            {
                path: '/qui-sont-les-vignards',
                element: <>nous</>
            },
            {
                path: '/professionnels-mariage-etc',
                element: <>pro</>
            },
            {
                path: '/contactez-nous',
                element: <>contact</>
            },
        ]
    },
]);