import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { baseURL } from '../../../const';
import ENVT from './env';
import axios from 'axios'
import { postGeneratorOptions } from '../../../data/DataJson';
const AiEnvironment = () => {
    const [prompt, setPrompt] = useState('');
    const [url, setUrl] = useState(''); // New state for the URL
    const [placeholder, setPlaceholder] = useState('enter your query');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agentDetails, setAgentDetails] = useState({ name: '', system_prompt: '', description: '' });
    const { id } = useParams();
    const responsesEndRef = useRef(null); // Reference for scrolling
    const [conditions, setConditions] = useState(null)
    const [uploadedFiles, setUploadedFiles] = useState(null)
    const [uploadedFileNames, setUploadedFileNames] = useState(null)

    const handlePromptChange = (e) => setPrompt(e.target.value);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setUploadedFiles((files)); // Set the uploaded files
            setUploadedFileNames(Array.from(files).map(file => file.name)); // Set the uploaded file names
            console.log("Uploaded files:", files);
        }
    };
    const handleMicClick = () => {
        // Start listening to the user's voice here (e.g., with Web Speech API)
        if (!('webkitSpeechRecognition' in window)) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            setPrompt(speechToText); // Set the recognized text to prompt
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition: ' + event.error);
        };

        recognition.start();
    };

    const downloadCSV = (csvData) => {
        // Convert the CSV data into a blob
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'synthetic_data.csv'); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const foundUrls = prompt.match(urlRegex);
        const urlFromPrompt = foundUrls ? foundUrls[0] : undefined; // Take the first URL if it exists
        const payload = {
            agent_id: id, // Pass the agent ID from URL params
            prompt: prompt || undefined, // Use undefined instead of null
            url: urlFromPrompt || undefined, // Use URL from the prompt if found
            file: uploadedFiles || undefined, // Use undefined instead of null
        };
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        // Clear the input fields immediately on submit
        // setPrompt('');
        // setUrl(''); // Optional: You may want to clear this as well
        // setUploadedFile(null);

        const loadingResponse = { input: payload.prompt, loading: true, output: '' };
        const updateRes = [loadingResponse];
        setResponses(() => updateRes);

        try {
            const formData = new FormData(); // Use FormData to handle file uploads

            // Append only defined values to FormData
            for (const [key, value] of Object.entries(payload)) {
                if (value !== undefined) {
                    formData.append(key, value);
                }
            }

            // Perform the Axios POST request with FormData
            const response = await axios.post(`${baseURL}/openai/run`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status !== 200) throw new Error('API call failed');

            // Function to check if response is HTML
            const isHTML = (str) => {
                return /<\/?[a-z][\s\S]*?>/i.test(str);
            };

            const data = response.data;
            console.log(isHTML(data))
            if (isHTML(data?.content)) {
                const updatedResponses = [...updateRes];
                updatedResponses[updatedResponses.length - 1] = {
                    input: payload.prompt,
                    image: data?.result?.image_base64 || data?.image_base64,
                    loading: false,
                    output: '',
                    htmlContent: data
                };
                setResponses(updatedResponses);
            } else {
                if (data?.csv_file) {
                    const updatedResponses = [...updateRes];
                    updatedResponses[updatedResponses.length - 1] = {
                        input: '',
                        loading: false,
                        output: 'Downloaded',
                    };
                    setResponses(updatedResponses);
                    downloadCSV(data?.csv_file?.data);
                } else {
                    const updatedResponses = [...updateRes];
                    updatedResponses[updatedResponses.length - 1] = {
                        input: payload.prompt,
                        image: data?.result?.image_base64 || data?.image_base64,
                        loading: false,
                        output: data?.content || data?.result?.content,
                    };
                    setResponses(updatedResponses);
                }
            }
        } catch (error) {
            console.error('Error during API call:', error);
            const updatedResponses = [...updateRes];
            updatedResponses[updatedResponses.length - 1] = {
                input: payload.prompt,
                loading: false,
                output: 'Error: ' + error.message,
            };
            setResponses(updatedResponses);
        }
    };



    // Fetch environment data from /api/environment/{id} when the component mounts
    const fetchEnvironmentData = async () => {
        try {
            const response = await fetch(`${baseURL}/environment/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch environment data');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching environment data:', error);
        }
    };

    const fetchAgentData = async () => {
        try {
            const response = await fetch(`${baseURL}/agent/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch agent data');
            const data = await response.json();
            setAgentDetails({
                name: data.name,
                system_prompt: data.system_prompt,
                description: data.agent_description,
            });
            const finData = postGeneratorOptions.filter((item) => item?.value === data?.system_prompt)
            if (finData.length > 0) {
                setConditions(finData[0])
            }
        } catch (error) {
            console.error('Error fetching agent data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchEnvironmentData();
        fetchAgentData();
    }, [id]);

    // Scroll to the bottom whenever responses change
    useEffect(() => {
        if (responsesEndRef.current) {
            responsesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [responses]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CircularProgress /> {/* Show MUI loader */}
            </div>
        );
    }

    return (
        <ENVT {...{
            agentDetails,
            handleSubmit,
            handlePromptChange,
            placeholder,
            uploadedFileName:uploadedFileNames,
            handleFileChange,
            handleMicClick,
            responses,
            responsesEndRef,
            prompt,
            uploadedFile:uploadedFiles,
            conditions
        }} />
    );
};

export default AiEnvironment;
