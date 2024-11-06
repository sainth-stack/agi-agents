import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssistantIcon from "@mui/icons-material/Assistant"; // For AI Employee
import BuildIcon from "@mui/icons-material/Build"; // For LLM Planner and Agents
import StorefrontIcon from "@mui/icons-material/Storefront"; // For Market Place
import HubIcon from "@mui/icons-material/Hub"; // For Agi Agents Hub
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Menuitems = [
  {
    title: "USER",
    list: [
      {
        title: "Dashboard",
        icon: DashboardOutlinedIcon,
        href: "/dashboards/dashboard1",
      },
    ],
  },
  {
    title: "Agentic AI Studio",
    list: [
      {
        title: "LLM Planner",
        icon: BuildIcon, // Updated icon for LLM Planner
        href: "/configure-llm",
      },
      {
        title: "AI Employee",
        icon: AssistantIcon, // Updated icon for AI Employee
        href: "/create-agent",
      },
    ],
  },
  {
    title: "Market",
    list: [
      {
        title: "Agents",
        icon: AssistantIcon, // Updated icon for Agents
        href: "/configure-tools",
      },
      {
        title: "Market Place",
        icon: StorefrontIcon, // Updated icon for Market Place
        href: "/market-place",
      },
      {
        title: "Agi Agents Hub",
        icon: HubIcon, // Updated icon for Agi Agents Hub
        href: "/agnets-hub",
      },
    ],
  },
  {
    title: "MISC",
    list: [
      {
        title: "Partner Network",
        icon: AttachMoneyIcon,
        href: "/affiliate",
      },
      {
        title: "Support",
        icon: HelpOutlineIcon,
        href: "/support",
      },
    ],
  },
];

export default Menuitems;
