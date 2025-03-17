import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { FaPaperclip } from "react-icons/fa";
import Plot from "react-plotly.js";
import CircularProgress from "@mui/material/CircularProgress";
import { Spin, Collapse, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import Bot from "../bot";
import { useLocation, useParams } from "react-router-dom";
import { baseURL } from "../../../../const";
import axios from "axios";
import { postGeneratorOptions } from "../../../../data/DataJson";
import { Typography } from "@mui/material";
import wayg from "../../../../assets/images/poser.jpg";
const Bot2 = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [agentDetails, setAgentDetails] = useState({
    name: "",
    system_prompt: "",
    description: "",
  });
  const { id } = useParams();
  const [conditions, setConditions] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState(null);

  const location = useLocation();
  const dynamicAgentId = location.state?.dynamicAgentId;
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello! How can I assist you today?" },
  ]);
  const [recentChats, setRecentChats] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles(file);
      setUploadedFileNames(file.name);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const urlRegex = /(https?:\/\/[^\s]+)/g;
  //     const foundUrls = prompt.match(urlRegex);
  //     const urlFromPrompt = foundUrls ? foundUrls[0] : undefined;

  //     const payload = {
  //         agent_id: id,
  //         prompt: message || undefined,
  //         url: urlFromPrompt || undefined,
  //         file: uploadedFiles || undefined,
  //     };

  //     Object.keys(payload).forEach(
  //         (key) => payload[key] === undefined && delete payload[key]
  //     );

  //     const loadingResponse = {
  //         type: 'user',
  //         content: payload.prompt,
  //         question:true,
  //         isLoading: true
  //     };
  //     setMessages(() => [...messages,loadingResponse]);

  //     try {
  //         const formData = new FormData();
  //         Object.entries(payload).forEach(([key, value]) => {
  //             if (value !== undefined) {
  //                 formData.append(key, value);
  //             }
  //         });

  //         const apiEndpoint = `${baseURL}/${
  //             dynamicAgentId ? "run-agent-environment" : "openai/run"
  //         }`;

  //         const response = await axios.post(apiEndpoint, formData, {
  //             headers: {
  //                 "Content-Type": "multipart/form-data",
  //             },
  //         });

  //         if (response.status !== 200) throw new Error("API call failed");

  //         const data = response.data;
  //         const isHTML = (str) => /<\/?[a-z][\s\S]*?>/i.test(str);

  //         const updatedResponses = [loadingResponse];
  //         if (isHTML(data?.content)) {
  //             updatedResponses[updatedResponses.length - 1] = {
  //                 type: 'bot',
  //                 content:data || data?.answer ,
  //                 plotsData:data?.chart_response,
  //                 code:data?.code || "Not Found"
  //             };
  //         } else if (data?.answer) {
  //             updatedResponses[updatedResponses.length - 1] = {
  //                 input: payload.prompt,
  //                 image: data?.result?.image_base64 || data?.image_base64 || null,
  //                 loading: false,
  //                 output: "",
  //                 htmlContent: `<p>${data?.answer}</p>`,
  //             };
  //         } else if (data?.csv_file) {
  //             updatedResponses[updatedResponses.length - 1] = {
  //                 input: "",
  //                 loading: false,
  //                 output: "Downloaded",
  //             };
  //             downloadCSV(data?.csv_file);
  //         }
  //         setMessages(prev => prev.map(msg =>
  //           msg.isLoading ? { ...msg, isLoading: false } : msg
  //         ).concat([{
  //           type: 'bot',
  //           content:data?.chart_response ? "" :data?.text_output || data?.text_pre_code_response,
  //           plotsData:data?.chart_response,
  //           code:data?.code || "Not Found"
  //         }]));

  //         setRecentChats(prev => [...prev, { question: message, answer: data?.result }]);
  //     } catch (error) {
  //         console.error("Error during API call:", error);
  //         const updatedResponses = [...messages];
  //         updatedResponses[updatedResponses.length - 1] = {
  //             input: payload.prompt,
  //             loading: false,
  //             output: "Error: " + error.message,
  //         };
  //         setMessages(updatedResponses);
  //     }
  // };
  console.log(id, uploadedFiles);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const foundUrls = prompt.match(urlRegex);
    const urlFromPrompt = foundUrls ? foundUrls[0] : undefined;

    const payload = {
      agent_id: id,
      prompt: message || undefined,
      url: urlFromPrompt || undefined,
      file: uploadedFiles || undefined,
    };

    // Object.keys(payload).forEach(
    //     (key) => payload[key] === undefined && delete payload[key]
    // );
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: message,
        question: true,
        isLoading: true,
      },
    ]);

    setIsLoading(true);

    try {
      setIsLoading(true); // Ensure loading starts before the request

      const apiEndpoint = `${baseURL}/${
        dynamicAgentId ? "run-agent-environment" : "openai/run"
      }`;

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      const data = response?.data;
      console.log(data);
      if (data?.data) {
        downloadCSV(data?.data);
      }
      setMessages((prev) =>
        prev
          .map((msg) => (msg.isLoading ? { ...msg, isLoading: false } : msg))
          .concat([
            {
              type: "bot",
              content:getAnswer(data),
              plotsData: data?.chartData,
              code: data?.code || "Not Found",
            },
          ])
      );

      setRecentChats((prev) => [
        ...prev,
        { question: message, answer: data?.answer },
      ]);

      // if (messageType === 'graph') {
      //   setVisualizationData(data?.chartData);
      // }
    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) =>
        prev
          .map((msg) => (msg.isLoading ? { ...msg, isLoading: false } : msg))
          .concat([
            {
              type: "bot",
              content: "Sorry, there was an error processing your request.",
              messageType: "text",
              code: "Not Found",
            },
          ])
      );
    } finally {
      setIsLoading(false); // Ensure loader stops in both success and failure cases
      setMessage("");
    }
  };

  const getAnswer = (data) => {
    if (data?.data) {
        return "Downloaded";
    } else if (data?.chartData) {
        return "";
    } else {
        return data?.report || data?.result || data?.answer?.["JD Match"] ||data?.answer || data?.content;
    }
};


  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "synthetic_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fetchEnvironmentData = async () => {
    try {
      const response = await fetch(`${baseURL}/environment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch environment data");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching environment data:", error);
    }
  };

  const fetchAgentData = async () => {
    try {
      const response = await fetch(`${baseURL}/agent/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch agent data");
      const data = await response.json();
      setAgentDetails({
        name: data.name,
        system_prompt: data.system_prompt,
        description: data.agent_description,
      });
      const finData = postGeneratorOptions.filter(
        (item) => item?.value === data?.backend_id
      );
      if (finData.length > 0) {
        setConditions(finData[0]);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnvironmentData();
    fetchAgentData();
  }, [id]);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <Bot
        agentDetails={agentDetails}
        handleFileChange={handleFileChange}
        uploadedFileNames={uploadedFileNames}
      />
      <div className="chat-container">
        <div className="recent-chats">
          <h3>Recent Chats</h3>
          {recentChats.map((chat, index) => (
            <div key={index} className="recent-chat-item">
              <p>
                <strong></strong> {chat.question}
              </p>
              {/* <p><strong>A:</strong> {chat.answer}</p> */}
            </div>
          ))}
        </div>
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  maxWidth: "100%",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: msg.question ? "flex-start" : "flex-end", // Align right for questions
                }}
              >
                <div
                  className={`${msg.type}-message`}
                  style={{
                    display: "flex",
                    width: msg.question ? "fit-content" : "100%", // 50% for questions, 100% for answers
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "100%",
                    alignSelf: msg.question ? "flex-end" : "flex-start",
                    alignItems: msg.question ? "flex-end" : "flex-start", // Align content accordingly
                  }}
                >
                      <div dangerouslySetInnerHTML={{ __html: msg?.content || "" }} />

                  {/* {msg?.code && (
    <Collapse>
        <Collapse.Panel header="Code" key="msg-code">
        <div key={'text'} className="code-block-container">
                    <button 
                        className="copy-button"
                        // onClick={() => handleCopyCode(msg.code)}
                    >
                        <CopyOutlined /> Copy
                    </button>
                    <pre className="code-block">
                        <code>{msg.code}</code>
                    </pre>
                </div>
        </Collapse.Panel>
    </Collapse>
)} */}

                  {msg?.plotsData && (
                    <Plot
                      data={msg?.plotsData?.data}
                      layout={msg?.plotsData?.layout}
                      config={{ responsive: true }}
                      style={{
                        width: "100%",
                        height: "60vh",
                        padding: "15px",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                      }}
                      className="plot-container"
                    />
                  )}
                </div>
                {msg.isLoading && (
                  <div className="CircularProgress-container">
                    <CircularProgress animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </CircularProgress>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <div className="input-container3">
              {/* <FaPaperclip className="upload-icon" onClick={handleIconClick} /> */}
              <input
                type="text"
                className="chat-input"
                value={message}
                onChange={handleMessageChange}
                placeholder="Ask something..."
              />
              <input
                type="file"
                className="file-input"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="send-button" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Send"
              )}
            </button>
          </form>
          {file && <div className="file-name">Selected file: {file.name}</div>}
          <Typography
            variant="body2"
            className="text-gray-500 font-custom"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginTop: "20px",
              fontWeight: 600,
              fontSize: 18,
              color: "grey",
            }}
          >
            <span> Built on </span>
            <img src={wayg} width={70} height={30} />
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Bot2;
