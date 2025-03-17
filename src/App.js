import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./views/dashboards/Home";
import AdminAgents from "./views/admin-agents";
import AgentHackathon from "./views/hackathon";
import AdminRegistrations from "./views/admin-registrations";
import AdminHana from "./views/admin-hana";
import AdminPartners from "./views/admin-patners";
import Support from "./views/support";
import Sponsership from "./views/hackathon/sponser";
import QuickStart from "./views/docs/quickstart";
import Tutorial from "./views/docs/tutorial";
import UI from "./views/docs/ui";
import Guid from "./views/docs/guide";
import Affiliate from "./views/affliate";
import NewRequest from "./views/support/new-request";
import { Design } from "./views/design";
import ConfigureLLM from "./views/LLM/ConfigureLLM";
import ConfigureAgents from "./views/Tools/ConfigureTools";
import AgentApps from "./views/AgentApps/AgentApps";
import AgentHubHome from "./views/agiAgents/home";
import SubmitPage from "./components/form/Form";
import DetailPage from "./components/details";
import UpdatePage from "./components/update/Form";
import BlogManager from "./views/BlogManager/BlogManager";
import SyntheticDataGenerator from "./views/Synthetic/Synthetic";
import LinkdinManager from "./views/LinkedinManager/LinkdinManager";
import Pricing from "./views/pricing";
import BillingSection from "./views/billingSection";
import GraphView from "./views/design/genAi/GraphView";
import AiEnvironment from "./views/AgentApps/ai-environment";
import { Login } from "./views/Auth/login";
import { Register } from "./views/Auth/register";
import FullLayout from "./layouts/FullLayout/FullLayout";
import EmployeeStudio from "./views/AgentStudio/AgentStudio";
import CreateAgent from "./views/create-agent/CreateAgent";
import AdminAiWorkers from "./views/admin-aiworkers";
import Bot2 from "./views/AgentApps/ai-environment/bot2";
import ExistingAgents from "./views/AgentStudio/ExistingStudio";
import SelectType from "./views/AgentStudio";

const App = () => {
  const theme = baseTheme;
  const clientId = '573823221354-d175srri1ta9un581atkp7b9qenst32u.apps.googleusercontent.com';

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<FullLayout />}>
              <Route index element={<Navigate to="dashboards/dashboard1" />} />
              <Route path="dashboards/dashboard1" element={<Home />} />
              <Route path="admin/agents" element={<AdminAgents />} />
              <Route path="admin/hackathon" element={<AgentHackathon />} />
              <Route
                path="admin/registartions"
                element={<AdminRegistrations />}
              />
                      <Route
                path="admin/ai-workers"
                element={<AdminAiWorkers />}
              />
              <Route path="admin/patners" element={<AdminPartners />} />
              <Route path="support" element={<Support />} />
              <Route path="sponsership" element={<Sponsership />} />
              <Route path="quickstart" element={<QuickStart />} />
              <Route path="tutorial" element={<Tutorial />} />
              <Route path="ui" element={<UI />} />
              <Route path="guide" element={<Guid />} />
              <Route path="affliate" element={<Affiliate />} />
              <Route path="new-request" element={<NewRequest />} />
              <Route path="start-design" element={<Design />} />
              <Route path="configure-llm" element={<ConfigureLLM />} />
              <Route path="configure-tools" element={<ConfigureAgents />} />
              <Route path="create-agent" element={<EmployeeStudio />} />
              <Route path="create-existing-agent" element={<ExistingAgents />} />
              <Route path="select-type" element={<SelectType />} />
              <Route path="agent-create" element={<CreateAgent />} />

              <Route path="market-place" element={<AgentApps />} />
              <Route path="agnets-hub" element={<AgentHubHome />} />
              <Route path="agnets-hub/submit" element={<SubmitPage />} />
              <Route path="agnets-hub/details/:id" element={<DetailPage />} />
              <Route path="agnets-hub/update/:id" element={<UpdatePage />} />
              <Route path="blog-manager" element={<BlogManager />} />
              <Route
                path="synthetic-generator"
                element={<SyntheticDataGenerator />}
              />
              <Route path="linkedin-manager" element={<LinkdinManager />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="billing" element={<BillingSection />} />
              <Route path="graph-view" element={<GraphView />} />
              <Route path="admin/hana-db" element={<AdminHana />} />
            </Route>

            <Route path="ai-environment/:id" element={<Bot2 />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
