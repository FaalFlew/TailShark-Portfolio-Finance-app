/// <reference types="react-scripts" />
interface ImportMetaEnv {
    readonly REACT_APP_FINANCE_API_PATH : string;
    readonly REACT_APP_FINNHUB_API_PATH: string;
    readonly REACT_APP_API_KEY: string;
  }
  
  // Extend `NodeJS.ProcessEnv` to include your custom environment variables
  declare namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {}
  }