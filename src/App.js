import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  const clientId = '573823221354-d175srri1ta9un581atkp7b9qenst32u.apps.googleusercontent.com';

  return (

    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        {routing}
      </ThemeProvider>
    </GoogleOAuthProvider>

  );
};

export default App;
