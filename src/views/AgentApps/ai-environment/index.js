import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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

     const location = useLocation();
    const dynamicAgentId = location.state?.dynamicAgentId;
    
    console.log("cutom agent id",dynamicAgentId)
    const handlePromptChange = (e) => setPrompt(e.target.value);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get only the first file
        if (file) {
            setUploadedFiles(file); // Set single file
            setUploadedFileNames(file.name); // Set single filename
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

     // Extract URL from the prompt if it exists
     const urlRegex = /(https?:\/\/[^\s]+)/g;
     const foundUrls = prompt.match(urlRegex);
     const urlFromPrompt = foundUrls ? foundUrls[0] : undefined; // Take the first URL if it exists

     // Create payload
     const payload = {
       agent_id: id, // Pass the agent ID from URL params
       query: prompt || undefined,
       url: urlFromPrompt || undefined,
       file: uploadedFiles || undefined,
     };

     // Remove undefined keys from the payload
     Object.keys(payload).forEach(
       (key) => payload[key] === undefined && delete payload[key]
     );

     // Add loading response
     const loadingResponse = {
       input: payload.prompt,
       loading: true,
       output: "",
     };
     setResponses(() => [loadingResponse]);

     try {
       const formData = new FormData();

       // Append only defined values to FormData
       Object.entries(payload).forEach(([key, value]) => {
         if (value !== undefined) {
           formData.append(key, value);
         }
       });

       // Determine the API endpoint dynamically
       const apiEndpoint = `${baseURL}/${
         dynamicAgentId ? "run-agent-environment" : "openai/run"
       }`;

       // Call the API
       const response = await axios.post(apiEndpoint, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });

       if (response.status !== 200) throw new Error("API call failed");

       const data = response.data;

       // Function to check if response is HTML
       const isHTML = (str) => /<\/?[a-z][\s\S]*?>/i.test(str);

       // Handle response based on content type
       const updatedResponses = [loadingResponse];
       if (isHTML(data?.content)) {
         updatedResponses[updatedResponses.length - 1] = {
           input: payload.prompt,
           image: data?.result?.image_base64 || data?.image_base64|| null,
           loading: false,
           output: "",
           htmlContent: data,
         };
       } else if (data?.csv_file) {
         updatedResponses[updatedResponses.length - 1] = {
           input: "",
           loading: false,
           output: "Downloaded",
         };
         downloadCSV(data?.csv_file?.data);
       } else {
         updatedResponses[updatedResponses.length - 1] = {
           input: payload.prompt,
           image: data?.result?.image_base64 || data?.image_base64,
           loading: false,
           output: data?.content || data?.result?.content,
         };
       }
       setResponses(updatedResponses);
     } catch (error) {
       console.error("Error during API call:", error);
       const updatedResponses = [...responses];
       updatedResponses[updatedResponses.length - 1] = {
         input: payload.prompt,
         loading: false,
         output: "Error: " + error.message,
       };
       setResponses(updatedResponses);
     }
   };

   console.log(responses)



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
            console.log(postGeneratorOptions.value,data?.backend_id)
            const finData = postGeneratorOptions.filter((item) => item?.value === data?.backend_id)
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
