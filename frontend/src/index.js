import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

import LoginPage from './components/LoginPage';

const Routes = createBrowserRouter([
    {
        path: "*",
        element: <h1>Not found</h1>
    },
    {
        path: "/",
        element: <h1>Content here</h1>
    },
    {
        path: "/auth",
        element: <LoginPage/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={Routes}/>);
