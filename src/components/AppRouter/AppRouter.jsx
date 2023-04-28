import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {APP_ROUTES} from "../../pages/Constants";
import NavLayout from "../UI/Navbar/NavLayout";


const AppRouter = () => {

    return (
        <Routes>
            <Route  path="/" element={<NavLayout />}>
                {APP_ROUTES.map(route =>
                    (route.children.map(item =>
                        <Route path={item.path} element={item.element} key={item.path}/>
                    ))
                )}
                <Route path="/" element={<Navigate to="/news" replace/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
