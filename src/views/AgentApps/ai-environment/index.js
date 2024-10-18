import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import { baseURL } from '../../../const';
import ENVT from './env';

const AiEnvironment = () => {
    const [prompt, setPrompt] = useState('');
    const [url, setUrl] = useState(''); // New state for the URL
    const [placeholder, setPlaceholder] = useState('enter your query');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agentDetails, setAgentDetails] = useState({ name: '', system_prompt: '', description: '' });
    const [uploadedFile, setUploadedFile] = useState(null); // State for the uploaded file
    const [uploadedFileName, setUploadedFileName] = useState(''); // New state for the uploaded file name
    const { id } = useParams();
    const responsesEndRef = useRef(null); // Reference for scrolling

    const handlePromptChange = (e) => setPrompt(e.target.value);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file); // Set the uploaded file
            setUploadedFileName(file.name); // Set the uploaded file name
            console.log("Uploaded file:", file);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const foundUrls = prompt.match(urlRegex);
        const urlFromPrompt = foundUrls ? foundUrls[0] : undefined; // Take the first URL if it exists

        // Prepare the payload based on user input
        const payload = {
            agent_id: id, // Pass the agent ID from URL params
            prompt: prompt || undefined, // Use undefined instead of null
            url: urlFromPrompt || undefined, // Use URL from the prompt if found
            file: uploadedFile || undefined, // Use undefined instead of null
        };

        // Remove undefined properties
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

            const response = await fetch(`${baseURL}/openai/run`, {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 200) throw new Error('API call failed');

            const data = await response.json();
            const updatedResponses = [...updateRes]; // Create a copy of the current responses
            updatedResponses[updatedResponses.length - 1] = {
                input: payload.prompt,
                loading: false,
                output: data?.content || data?.result?.content,
            };

            setResponses(updatedResponses); // Update responses
        } catch (error) {
            console.error('Error during API call:', error);
            const updatedResponses = [...updateRes]; // Create a copy of the current responses
            updatedResponses[updatedResponses.length - 1] = {
                input: payload.prompt,
                loading: false,
                output: 'Error: ' + error.message,
            };
            setResponses((prev) => [...updatedResponses]);
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
            setPlaceholder(data.system_prompt);
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
            uploadedFileName,
            handleFileChange,
            handleMicClick,
            responses,
            responsesEndRef,
            prompt,
            uploadedFile
        }} />
    );
};

export default AiEnvironment;
