import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/Home/HomePage";
import SearchPage from "../Pages/Search/SearchPage";
import CompanyPage from "../Pages/Company/CompanyPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            {path:"", element:<HomePage />},
            {path:"search", element:<SearchPage />},
            {path:"company/:ticker", element:<CompanyPage />},
            
        ]
    }
]);