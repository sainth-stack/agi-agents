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
import ConfigureLLM from "../views/LLM/ConfigureLLM.js";
import AgentApps from "../views/AgentApps/AgentApps.js";
import AgentStudio from "./../views/AgentStudio/AgentStudio";
import BlogManager from "../views/BlogManager/BlogManager.js";
import SyntheticDataGenerator from "../views/Synthetic/Synthetic.js";
import LinkdinManager from "../views/LinkedinManager/LinkdinManager.js";
import AiEnvironment from "../views/AgentApps/ai-environment/index.js";
import { ConfigureTools } from "../views/Tools/ConfigureTools.js";
import AgentHubHome from "../views/agiAgents/home/index.js";
import SubmitPage from "../components/form/Form.js";
import DetailPage from "../components/details/index.js";
import UpdatePage from "../components/update/Form.js";

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
      { path: "/create-agent", element: <AgentStudio /> },
      { path: "/market-place", element: <AgentApps /> },
      { path: "/agnets-hub", element: <AgentHubHome /> },
      { path: "/agnets-hub/submit", element: <SubmitPage /> },
      { path: "/agnets-hub/details", element: <DetailPage /> },
      { path: "/agnets-hub/update/:id", element: <UpdatePage /> },

      { path: "/blog-manager", element: <BlogManager /> },
      { path: "/synthetic-generator", element: <SyntheticDataGenerator /> },
      { path: "/linkedin-manager", element: <LinkdinManager /> },
      // { path: "/login", element: <Login /> },
      { path: "/pricing", element: <Pricing /> },
      // { path: "/register", element: <Register /> },
      { path: "/billing", element: <BillingSection /> },
      { path: "/graph-view", element: <GraphView /> },
    ],
  },
  {
    path: "/",
    // element: <Layout />,
    children: [
      { path: "/ai-environment/:id", element: <AiEnvironment /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];

export default ThemeRoutes;
