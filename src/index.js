import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {APP_ROUTES} from "./pages/Constants";

const router = createBrowserRouter(APP_ROUTES)

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)
