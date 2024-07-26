import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/Home/HomePage";
import SearchPage from "../Pages/Search/SearchPage";
import CompanyPage from "../Pages/Company/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            {path:"", element:<HomePage />},
            {path:"search", element:<SearchPage />},
            {path:"design-guide", element:<DesignPage />},

            {path:"company/:ticker", 
            element:<CompanyPage />,
            children: [
                {path: "profile", element:<CompanyProfile />},
                {path: "income", element:<IncomeStatement />},
                {path: "balance", element:<BalanceSheet />},



            ],
        
        },
            
        ]
    }
]);