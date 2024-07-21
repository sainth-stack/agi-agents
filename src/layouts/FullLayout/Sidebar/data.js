import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const Menuitems = [
  {
    title: "USER",
    list: [
      {
        title: "Dashboard",
        icon: DashboardOutlinedIcon,
        href: "/dashboards/dashboard1",
      },
      // {
      //   title: "Autocomplete",
      //   icon: AddToPhotosOutlinedIcon,
      //   href: "/form-elements/autocomplete",
      // }
    ]
  },
  {
    title: "Agents",
    list: [
      {
        title: "Interior Design",
        icon: PostAddIcon,
        href: "/start-design",
      }
    ]
  },
  {
    title: "MISC",
    list: [
      {
        title: "Partner Network",
        icon: AttachMoneyIcon,
        href: "/affliate",
      },
      {
        title: "Support",
        icon: HelpOutlineIcon,
        href: "/support",
      }
    ]
  }
];

export default Menuitems;
