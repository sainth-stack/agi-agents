
import { FaGlobe, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Importing icons from react-icons
import PostAddIcon from '@mui/icons-material/PostAdd';



export const modelVendorOptions = [
    { label: 'OpenAI', value: 'openai' },
    { label: 'Google', value: 'google' },
    { label: 'Microsoft', value: 'microsoft' },
];

export const modelOptions = [
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-4o-Mini', value: 'gpt-4o-mini' },
    { label: 'GPT-3', value: 'gpt-3' },
];




export const environmentOptions = [
    { value: 'dev', label: 'Development' },
    { value: 'prod', label: 'Production' },
];

/*  */
export const cardData = [
    {
        title: "Interior Design",
        icon: <PostAddIcon />,  // Render as JSX element
        heading: 'Provides ability to design interiors',
        href: "/start-design"
    },
    {
        title: 'Synthetic Generator',
        heading: 'Provides ability to search the internet',
        icon: <FaGlobe />,
        href: "/synthetic-generator"
        // Render as JSX element
    },
    {
        title: 'Blog Manager',
        heading: 'Provides ability to post on LinkedIn',
        icon: <FaLinkedin />,
        href: "/blog-manager"
        // Render as JSX element
    },

    {
        title: 'LinkedIn Post',
        heading: 'Provides ability to send an email ...',
        icon: <FaEnvelope />,
        href: "/linkedin-manager"// Render as JSX element
    }
];
