import {
    createBrowserRouter,
} from "react-router";
import Layout from "./components/Layout";
import "./App.css";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
]);