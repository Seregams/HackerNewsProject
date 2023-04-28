import App from "../App";
import Index from "../pages/Index"
import Story from "./Story";


export const APP_ROUTES = [
    {path:'*', element:<App/>,
        children:[
            {path:'news', element: <Index/>},
            {path:'news/:id', element: <Story/>},
        ]
    }]
