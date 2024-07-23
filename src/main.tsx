import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom";
import ThemeContextProvider from "@contexts/ThemeContext.tsx";
import AuthContextProvider from "@contexts/AuthContext.tsx";
import axios from "axios";
import LoadingBoxContextProvider from "@contexts/LoadingBoxContext.tsx";

//axios globals
axios.defaults.baseURL = "https://scbbe-production.up.railway.app/api";
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json'
axios.defaults.headers.get['Authorization'] = "";
axios.defaults.headers.post['Authorization'] = "";
axios.defaults.headers.put['Authorization'] = "";
axios.defaults.headers.delete['Authorization'] = "";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <LoadingBoxContextProvider>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <App/>
                </ThemeContextProvider>
            </AuthContextProvider>
        </LoadingBoxContextProvider>
    </Router>
);
