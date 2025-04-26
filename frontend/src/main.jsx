import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './main.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {Toaster} from 'react-hot-toast'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { UIProvider } from "./context/UI-Context";
import { DashboardProvider } from "./context/state-Context";
import { UserProvider } from "./context/user-Context";
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter>
    <QueryClientProvider 
    client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
       <UIProvider>
        <UserProvider>
        <DashboardProvider>
            <App />
        </DashboardProvider>
        </UserProvider>
       </UIProvider>
    </QueryClientProvider>
    <Toaster 
    position='top-center'
    gutter ={12}
    containerStyle={{margin : '8px'}}
    toastOptions={{
        success : {
            duration : 3000
        },
        Error : {
            duration : 5000
        },
        style : {
            fontSize : '16px',
            backgroundColor :'#fff',
            color : '#000',
            maxWidth : '50rem',
            padding : '1.6rem 2.4rem'

        }
    }
    }

    />
</BrowserRouter>);
