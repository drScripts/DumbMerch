import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Router from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "react-query";
import UserProvider from "./Context/UserContext";
// import reportWebVitals from './reportWebVitals';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={client}>
        <Router />
        <ToastContainer theme="dark" />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
