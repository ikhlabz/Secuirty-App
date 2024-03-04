import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/user-context.jsx";
import { DataContextProvider } from "./context/fetch-context.jsx";
import { PostContextProvider } from "./context/send-context.jsx";
import { ToastContainer, toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthContextProvider>
      <DataContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
  </>
);
