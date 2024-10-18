
import { FaGlobe, FaLinkedin, FaEnvelope, FaMailchimp, FaDatabase, FaCode, FaBlog } from 'react-icons/fa'; // Importing icons from react-icons
import PostAddIcon from '@mui/icons-material/PostAdd';



export const modelVendorOptions = [
    { label: 'OpenAI', value: 'openai' },
    { label: 'Google', value: 'google' },
    { label: 'Microsoft', value: 'microsoft' },
];

export const modelOptions = [
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-4o-Mini', value: 'gpt-4o-mini' },
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

export const Tools = [
    {
        title: 'Blog Post',
        heading: 'Ability to post blogs',
        icon: <FaBlog />,
        href: "/blog-manager"
    },
    {
        title: 'LinkedIn Post',
        heading: 'Post on LinkedIn',
        icon: <FaLinkedin />,
        href: "/linkedin-manager"
    },
    {
        title: 'Synthetic Data',
        heading: 'Generate synthetic data',
        icon: <FaDatabase />,
        href: "/synthetic-data"
    },
    {
        title: 'Text to SQL',
        heading: 'Convert text to SQL',
        icon: <FaCode />,
        href: "/text-to-sql"
    }
];
