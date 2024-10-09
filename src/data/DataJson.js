
import { FaGlobe, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Importing icons from react-icons


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

export const cardData = [
    { title: 'Perplexity Tool', heading: 'Provides ability to search the internet', icon: <FaGlobe /> },
    { title: 'LinkedIn Tool', heading: 'Provides ability to post on LinkedIn', icon: <FaLinkedin /> },
    { title: 'Mail Tool', heading: 'Provides ability to send an email ...', icon: <FaEnvelope /> }
];





export const environmentOptions = [
    { value: 'dev', label: 'Development' },
    { value: 'prod', label: 'Production' },
];
