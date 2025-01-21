
import { FaBlog, FaLinkedin, FaCode, FaChartLine, FaDatabase, FaEnvelope, FaGlobe, FaYoutube, FaMicrophone, FaVideo, FaEnvelopeOpenText, FaGoogleDrive } from 'react-icons/fa';
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
        icon: <PostAddIcon />,  // Render as JStX element
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



export const AgentTools = [
  
  {
    id: "gmail",
    title: "Gmail",
    heading: "Access your Gmail account",
    category: "Communication",
    icon: <FaEnvelope />,
    href: "/gmail",
  },
  {
    id: "drive",
    title: "Google Drive",
    heading: "Access and manage your files",
    category: "Storage",
    icon: <FaGoogleDrive />,
    href: "/drive",
  },
];




export const ToolMapping = {
  website: [
    { id: "blog_post", name: "WB Agent" },
    { id: "mail_blog", name: "Mail Agent" },
    { id: "research_blog", name: "Research Agent" },
    { id: "gmail", name: "Gmail Agent" },
    { id: "drive", name: "Drive Agent" },
  ],
  audio: [
    { id: "audio_blog", name: "Audio Agent" },
    { id: "mail_blog", name: "Mail Agent" },
    { id: "gmail", name: "Gmail Audio Agent" },
  ],
};



export const Tools = [
    {
        id: 'blog_post',
        title: 'Blog',
        heading: 'Ability to post via website',
        category: "Content",
        icon: <FaBlog />,
        href: "/blog-manager"
    },
   
    {
        id: 'linkedin_post',
        title: 'LinkedIn Post',
        heading: 'Post on LinkedIn',
        category: "Content",
        icon: <FaLinkedin />,
        href: "/linkedin-manager"
    },
    {
        id: 'text_to_sql',
        title: 'Text to SQL',
        heading: 'Convert Text to SQL',
        category: "Data Intelligence",
        icon: <FaCode />,
        href: "/text-to-sql"
    },
    {
        id: 'graph_to_sql',
        title: 'Graph to SQL',
        heading: 'Convert Graphs to SQL',
        category: "Data Intelligence",
        icon: <FaChartLine />,
        href: "/graph-to-sql"
    },
    {
        id: 'forecast_to_sql',
        title: 'Forecasting to SQL',
        heading: 'Convert Forecasting Data to SQL',
        category: "Data Intelligence",
        icon: <FaChartLine />,
        href: "/forecasting-to-sql"
    },
    {
        id: 'synthetic_data_missing_data',
        title: 'Missing Synthetic Data',
        heading: 'Handle missing synthetic data',
        category: "Synthetic Data",
        icon: <FaDatabase />,
        href: "/synthetic-data-missing"
    },
    {
        id: 'synthetic_data_extended_data',
        title: 'Extend Synthetic Data',
        heading: 'Extend synthetic data',
        category: "Synthetic Data",
        icon: <FaDatabase />,
        href: "/synthetic-data-extend"
    },
    {
        id: 'synthetic_data_new_data',
        title: 'Create New Synthetic Data',
        heading: 'Create new synthetic data',
        category: "Synthetic Data",
        icon: <FaDatabase />,
        href: "/synthetic-data-new"
    },
    {
        id: 'chat_to_pdf',
        title: 'Chat to PDF',
        heading: 'Chat to PDF',
        category: "Content",
        icon: <FaDatabase />,
        href: "/synthetic-data-new"
    },
    {
        id: 'chat_app_text',
        title: 'Chat App',
        heading: 'Chat App',
        category: "Content",
        icon: <FaDatabase />,
        href: "/synthetic-data-new"
    },
    {
        id: 'travel_planner',
        title: 'Travel Planner',
        heading: 'Travel Planner',
        category: "Content",
        icon: <FaDatabase />,
        href: "/synthetic-data-new"
    },
    {
        id: 'mcq_generator',
        title: 'MCQ Generator',
        heading: 'MCQ Generator',
        category: "Content",
        icon: <FaDatabase />,
        href: "/synthetic-data-new"
    }
].map(tool => ({
    ...tool,
    title: tool.title + ' Agent'
}));


export const postGeneratorToolsMap = {


    website: [
        { id: 'blog_post', name: 'WB Agent' },
        { id: 'mail_blog', name: 'Mail Agent' },
        { id: 'research_blog', name: 'Research Agent' }
    ],
    audio: [
        { id: 'audio_blog', name: 'Audio Agent' },
        { id: 'mail_blog', name: 'Mail Agent' }
    ],
    video: [
        { id: 'video_blog', name: 'Video Agent' },
        { id: 'mail_blog', name: 'Mail Agent' }
    ],
    youtube: [
        { id: 'youtube_blog', name: 'YouTube Agent' },
        { id: 'mail_blog', name: 'Mail Agent' }
    ],
    linkedin: [
        {
            id: 'linkedin_post',
            name: 'LinkedIn Post Agent'
        }
    ],
    text_sql: [
        {
            id: 'text_to_sql',
            name: 'Text to SQL Agent'
        }
    ],
    graph_sql: [
        {
            id: 'graph_to_sql',
            name: 'Graph to SQL Agent'
        }
    ],
    forecast_to_sql: [
        {
            id: 'forecast_to_sql',
            name: 'Forecasting to SQL Agent'
        }
    ],
    synthetic_data_missing: [
        {
            id: 'synthetic_data_missing_data',
            name: 'Missing Synthetic Data Agent'
        }
    ],
    synthetic_data_extend: [
        {
            id: 'synthetic_data_extended_data',
            name: 'Extend Synthetic Data Agent'
        }
    ],
    synthetic_data_new: [
        {
            id: 'synthetic_data_new_data',
            name: 'Create New Synthetic Data Agent'
        }
    ],
    chat_to_pdf: [
        {
            id: 'chat_to_pdf',
            name: 'Chat to PDF Agent'
        }
    ],
    chat_app_text: [
        {
            id: 'chat_app_text',
            name: 'Chat App Agent'
        },

    ],
    travel_planner: [
        {
            id: 'travel_planner',
            name: 'Travel Planner'
        }],
    mcq_generator: [
        {
            id: 'mcq_generator',
            name: 'MCQ Generator'
        }]
};



export const postGeneratorOptions = [
    { value: 'website', label: 'Website Blog Post Generator', placeholder: 'Enter URL And Prompt', attachment: false },
    { value: 'video', label: 'Video Blog Post Generator', placeholder: 'Attach Video File and Enter Prompt', attachment: true },
    { value: 'audio', label: 'Audio Blog Post Generator', placeholder: 'Attach Audio File and Enter Prompt', attachment: true },
    { value: 'youtube', label: 'Youtube Blog Post Generator', placeholder: 'Enter Youtube URL and Prompt', attachment: false },
    { value: 'linkedin', label: 'LinkedIn Post Generator', placeholder: 'Enter Prompt, URL, Attach File', attachment: true },
    { value: 'text_to_sql', label: 'Text to SQL Converter', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'graph_to_sql', label: 'Graph to SQL Converter', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'forecast_to_sql', label: 'Forecasting to SQL Converter', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'synthetic_data_missing', label: 'Missing Synthetic Data', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'synthetic_data_extend', label: 'Extend Synthetic Data', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'synthetic_data_new', label: 'New Synthetic Data', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'chat_to_pdf', label: 'Chat to PDF', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'chat_app_text', label: 'Chat App', placeholder: 'Attach File and Enter Prompt', attachment: true },
    { value: 'travel_planner', label: 'Travel Planner', placeholder: 'Enter Prompt', attachment: false },
    { value: 'mcq_generator', label: 'mcq_generator', placeholder: 'Enter Prompt', attachment: false },

];
