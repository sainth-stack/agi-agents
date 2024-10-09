import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Support from "../views/support/index.js";
import Affliate from "../views/affliate/index.js";
import NewRequest from "../views/support/new-request.js";
import StartDesign, { Design } from "../views/design/index.js";
import { Login } from "../views/Auth/login.js";
import { Register } from "../views/Auth/register.js";
import Pricing from "../views/pricing/index.js";
import BillingSection from "../views/billingSection/index.js";
import GraphView from "../views/design/genAi/GraphView.js";
import Layout from "../layouts/layout/index.js";
import Home from "../views/dashboards/Home.js";
import ConfigureLLM from "../views/AgentStudio/ConfigureLLM.js";
import ConfigureTools from "../views/Tools/ConfigureTools.js";
import AgentApps from "../views/AgentApps/AgentApps.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", exact: true, element: <Home /> },

      { path: "/support", element: <Support /> },
      { path: "/affliate", element: <Affliate /> },
      { path: "/new-request", element: <NewRequest /> },
      { path: "/start-design", element: <Design /> },
      { path: "/configure-llm", element: <ConfigureLLM /> },
      { path: "/configure-tools", element: <ConfigureTools /> },
      { path: "/create-agent", element: <AgentApps /> },



      // { path: "/login", element: <Login /> },
      { path: "/pricing", element: <Pricing /> },
      // { path: "/register", element: <Register /> },
      { path: "/billing", element: <BillingSection /> },
      { path: "/graph-view", element: <GraphView /> },
    ],
  },
  {
    path: "/",
    //element: <Layout />,
    /* children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ], */
  }
];

export default ThemeRoutes;
