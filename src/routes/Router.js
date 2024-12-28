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
import Home from "../views/dashboards/Home.js";
import ConfigureLLM from "../views/LLM/ConfigureLLM.js";
import AgentApps from "../views/AgentApps/AgentApps.js";
import AgentStudio from "./../views/AgentStudio/AgentStudio";
import BlogManager from "../views/BlogManager/BlogManager.js";
import SyntheticDataGenerator from "../views/Synthetic/Synthetic.js";
import LinkdinManager from "../views/LinkedinManager/LinkdinManager.js";
import AiEnvironment from "../views/AgentApps/ai-environment/index.js";
import AgentHubHome from "../views/agiAgents/home/index.js";
import SubmitPage from "../components/form/Form.js";
import DetailPage from "../components/details/index.js";
import UpdatePage from "../components/update/Form.js";
import { ConfigureAgents } from "../views/Tools/ConfigureTools.js";
import AdminAgents from "../views/admin-agents/index.js";
import AgentHackathon from "../views/hackathon/index.js";
import AdminRegistrations from "../views/admin-registrations/index.js";
import QuickStart from "../views/docs/quickstart.js";
import Tutorial from "../views/docs/tutorial.js";
import UI from "../views/docs/ui.js";
import Guid from "../views/docs/guide.js";
import Sponsership from "../views/hackathon/sponser/index.js";
import AdminPatners from "../views/admin-patners/index.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", exact: true, element: <Home /> },
      { path: "admin/agents", exact: true, element: <AdminAgents /> },
      { path: "admin/hackathon", exact: true, element: <AgentHackathon /> },
      { path: "admin/registartions", exact: true, element: <AdminRegistrations /> },
      { path: "admin/patners", exact: true, element: <AdminPatners /> },
      { path: "admin/hana-db", exact: true, element: <AdminHana /> },
      { path: "/support", element: <Support /> },
      { path: "/sponsership", element: <Sponsership /> },
      { path: "/quickstart", element: <QuickStart /> },
      { path: "/tutorial", element: <Tutorial /> },
      { path: "/ui", element: <UI /> },
      { path: "/guide", element: <Guid /> },
      { path: "/affliate", element: <Affliate /> },
      { path: "/new-request", element: <NewRequest /> },
      { path: "/start-design", element: <Design /> },
      { path: "/configure-llm", element: <ConfigureLLM /> },
      { path: "/configure-tools", element: <ConfigureAgents /> },
      { path: "/create-agent", element: <AgentStudio /> },
      { path: "/market-place", element: <AgentApps /> },
      { path: "/agnets-hub", element: <AgentHubHome /> },
      { path: "/agnets-hub/submit", element: <SubmitPage /> },
      { path: "/agnets-hub/details/:id", element: <DetailPage /> },
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
