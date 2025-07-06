import {
    createBrowserRouter,
} from "react-router";
import Layout from "./components/Layout";
import "./App.css";
import {VineList, Vine, VineWrapper} from "./components/Vine";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <VineWrapper />,
                children: [
                    {
                        path: "wines",
                        element: <VineList />,
                        loader: async ({request})  => {
                            const searchParams = new URL(request.url).searchParams;
                            const searchTerm = searchParams.get("q");
                            let res = await fetch(`http://localhost:8000/api/wines?q=${searchTerm || ""}`)
                            return res;
                        },
                        
                    },
                    {
                        path: "wines/:id",
                        element: <Vine />,
                        loader: async ({params})  => {
                            let res = await fetch(`http://localhost:8000/api/wine/${params.id}/`)
                            return res;
                        },
                    }
                ]
                
            }
        ]
    },
]);