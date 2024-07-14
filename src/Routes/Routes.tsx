import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/Home/HomePage";
import SearchPage from "../Pages/Search/SearchPage";
import CompanyPage from "../Pages/Company/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            {path:"", element:<HomePage />},
            {path:"search", element:<SearchPage />},

            {path:"company/:ticker", 
            element:<CompanyPage />,
            children: [
                {path: "profile", element:<CompanyProfile />},
                {path: "income", element:<IncomeStatement />},

            ],
        
        },
            
        ]
    }
]);