import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/Home/HomePage";
import CompanyPage from "../Pages/Company/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            {path:"", element:<HomePage />},
            {path:"design-guide", element:<DesignPage />},

            {path:"company/:ticker", 
            element:<CompanyPage />,
            children: [
                {path: "profile", element:<CompanyProfile />},
                {path: "income", element:<IncomeStatement />},
                {path: "balance", element:<BalanceSheet />},
                {path: "cashflow", element:<CashFlowStatement />},



            ],
        
        },
            
        ]
    }
]);