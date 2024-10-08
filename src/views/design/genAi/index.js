// MiddleContent.js

import { CircularProgress, Grid, useMediaQuery } from "@mui/material"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import leftImage from '../../../assets/images/neolocus/room.png'
import living from '../../../assets/images/neolocus/living.png'
import bedroom from '../../../assets/images/neolocus/bedroom.png'
import modern from '../../../assets/images/neolocus/modern.png'
import minimal from '../../../assets/images/neolocus/minimal.png'
import contemporary from '../../../assets/images/neolocus/contempary.png'
import traditional from '../../../assets/images/neolocus/traditional.png'
import industrial from '../../../assets/images/neolocus/traditional.png'

import olive from '../../../assets/images/neolocus/colors/olive.png'
import charcol from '../../../assets/images/neolocus/colors/charcol.png'
import beige from '../../../assets/images/neolocus/colors/beige.png'
import warm from '../../../assets/images/neolocus/colors/warm.png'
import historical from '../../../assets/images/neolocus/colors/historical.png'

import axios from "axios";
import './Main.css'
import ImageLoader from "./imageContainer";
import LinearWithValueLabel from "../../../components/loader/index";
import { baseURL } from "../../../const";
import { useUser } from "../../../context/userContext";
// import gemini_icon from '../../assets/svg/gemini_icon.png'
const GenAi = () => {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const [search, setSearch] = useState("");
    const [question, setQuestion] = useState([]);
    const handleSend = () => {
        const updatedata = [
            ...question,
            {
                question: search,
                answer: true,
            },
        ];
        setQuestion(updatedata);
        handleGetAnswer(updatedata);
        setSearch("");
    };
    const { userData, setUserData } = useUser();

    const [file, setFile] = useState(null);
    const [startChart, setStartChart] = useState(false);
    const [loading, setLoading] = useState(false);
    const [img, setImage] = useState();
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const [data, setData] = useState({
        selected_style: "",
        selected_room_color: "",
        selected_room_type: "",
        number_of_room_designs: 1,
        additional_instructions: "",
        user_name: localStorage.getItem("username"),
    });

    const [imgsLoaded, setImgsLoaded] = useState(false);
    useEffect(() => {
        if (img !== null) {
            const loadImage = (image) => {
                return new Promise((resolve, reject) => {
                    const loadImg = new Image();
                    loadImg.src = image;
                    // wait 2 seconds to simulate loading time
                    loadImg.onload = () =>
                        setTimeout(() => {
                            resolve(image);
                        }, 2000);

                    loadImg.onerror = (err) => reject(err);
                });
            };

            Promise.all([loadImage(img)]) // Wrap the promise in an array
                .then(() => {
                    setImgsLoaded(true);
                    setLoading(false);
                })
                .catch((err) => console.log("Failed to load images", err));
        }
    }, [img]);

    const handleChange = ({ target: { name, value } }) => {
        let updatedData = { ...data };
        updatedData[name] = value;
        setData(updatedData);
    };

    const getUserInfo = async () => {
        try {
            const userName = localStorage.getItem("username");
            const formData = new FormData();
            formData.append("user", userName);
            const response = await axios.post(
                `${baseURL}/get_user_details`,
                formData
            );
            setUserData(response?.data?.paymentinfo);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const sendEmailToUser = async (url) => {
        var formData = new FormData();

        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        formData.append("image_url", url);
        formData.append("email", localStorage.getItem("email"));
        try {
            const response = await axios.post(`${baseURL}/sendEmail`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // token:localStorage.getItem('token')
                },
            });
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const handleUpload = async () => {
        var formData = new FormData();

        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        setLoading(true);
        setImgsLoaded(false);
        setImage(null);
        try {
            const response = await axios.post(`${baseURL}/getImage`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // token:localStorage.getItem('token')
                },
            });
            // setLoading(false)
            // sendEmailToUser(response?.data?.image)
            getUserInfo();
            setImage(response?.data?.image);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const handleGetAnswer = async (updatedata) => {
        var formData = new FormData();
        formData.append("msg", search);

        try {
            await axios
                .post(`http://3.132.248.171:5500/getResult`, formData)
                .then((res) => {
                    console.log(res.data.graph);
                    const finalData = updatedata.map((item) => {
                        if (item.answer === true) {
                            return {
                                ...item,
                                answer: res.data.graph,
                            };
                        } else {
                            return item;
                        }
                    });
                    setQuestion(finalData);
                });
        } catch (err) {
            console.log(err);
        }
    };

    const data1 = [
        { label: "Select", value: "" },
        { label: "Living Room", value: "Livingroom" },
        { label: "Bed Room", value: "Bedroom" },
    ];

    const data2 = [
        { label: "Select", value: "" },
        { label: "White", value: "White" },
        { label: "Gold", value: "Gold" },
        { label: "Brown", value: "Brown" },
        { label: "Light", value: "Light" },
        { label: "Dark", value: "Dark" },
    ];


    const styleData = [
        { label: "Select", value: "" },
        { label: "Modern", value: "Modern" },
        { label: "Minimal", value: "Minimal" },
        { label: "contemporary", value: "contemporary" },
        { label: "traditional", value: "traditional" },
    ];

    const [selData, setSelData] = useState({
        room: "",
        style: "",
        color: "",
        count: "",
    });

    const steps = [
        {
            label: "Step 1",
            id: 1,
            type: "room",
            selected: "",
            list: [
                { text: "living room", image: living },
                { text: "bedroom", image: bedroom },
            ],
        },
        {
            label: "Step 2",
            id: 2,
            type: "style",
            selected: "",
            list: [
                { text: "modern", image: modern },
                { text: "minimal", image: minimal },
                { text: "contemporary", image: contemporary },
                { text: "traditional", image: traditional },
                { text: "industrial", image: industrial },
            ],
        },
        {
            label: "Step 3",
            id: 3,
            type: "color",
            selected: "",
            list: [
                { text: "olive", image: olive },
                { text: "charcol", image: charcol },
                { text: "beige", image: beige },
                { text: "warm earth", image: warm },
                { text: "historical romance", image: historical },
            ],
        },
        {
            label: "Step 4",
            id: 4,
            type: "count",
            selected: "",
            list: [
                { color: "rgb(153, 204, 255)", text: 1 },
                { color: "rgb(102, 170, 229)", text: 2 },
                { color: "rgb(72, 136, 200)", text: 3 },
            ],
        },
    ];

    const handleSelectImage = (item, type) => {
        const updata = { ...selData };
        updata[type] = item.text;
        setSelData(updata);
    };

    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleUpload2 = (img) => {
        console.log(img);
        window.open(img, "_blank");
    };

    return (
        <Grid
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: isSmallScreen ? "column" : "row",
            }}
            className={`total_container`}
        >
            <Grid
                item
                md={5}
                xs={12}
                className="form_container"
                sx={{
                    borderRight: { md: "1px solid grey", xs: "none" },
                    width: { md: "450px", xs: "100%" },
                    marginBottom: { xs: "20px", md: "0" },
                    height: { xs: "auto", md: "85vh" },
                }}
            >
                <div
                    style={{
                        padding: "12px",
                        marginTop: isSmallScreen ? "0rem" : "2rem",
                    }}
                    className="container"
                >
                    {/* <h1 style={{ fontSize: '20px', fontWeight: 500 }}>Upload File</h1> */}
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "start",
                        }}
                        className="form"
                    >
                        {/* <input type="file" onChange={(e) => handleFileChange(e)} /> */}
                        <div style={{ marginTop: "10px" }}>
                            <div>
                                <lable>Prompt</lable>
                                <textarea
                                    className="textareaclass"
                                    style={{ padding: "6px 8px" }}
                                    name="additional_instructions"
                                    onChange={handleChange}
                                    value={data.additional_instructions}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <div>
                                <lable>Select Type</lable>
                                <select
                                    id="connection-name"
                                    onChange={handleChange}
                                    name="selected_room_type"
                                    value={data.selected_room_type}
                                >
                                    {data1.map((option) => (
                                        <option
                                            className="option"
                                            key={option.label}
                                            style={{
                                                padding: "8px",
                                                fontSize: "16px",
                                                fontFamily: "Arial, sans-serif",
                                                backgroundColor: "#fff",
                                                color: "#333",
                                            }}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <div>
                                <lable>Select Style</lable>
                                <select
                                    id="connection-name"
                                    onChange={handleChange}
                                    name="selected_style"
                                    value={data.selected_style}
                                >
                                    {styleData.map((option) => (
                                        <option
                                            key={option.label}
                                            style={{
                                                padding: "8px",
                                                fontSize: "16px",
                                                fontFamily: "Arial, sans-serif",
                                                backgroundColor: "#fff",
                                                color: "#333",
                                            }}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <div>
                                <lable>Select Color</lable>
                                <select
                                    id="connection-name"
                                    onChange={handleChange}
                                    name="selected_room_color"
                                    value={data.selected_room_color}
                                >
                                    {data2.map((option) => (
                                        <option
                                            key={option.value}
                                            style={{
                                                padding: "8px",
                                                fontSize: "16px",
                                                fontFamily: "Arial, sans-serif",
                                                // backgroundColor: "#fff",
                                                color: "#333",
                                                backgroundColor: (option.value === "White" || option.value === "Gold" || option.value === "") ? "#FFF" : 'lightGrey'
                                            }}
                                            value={option.value}
                                            disabled={option.value !== "White" && option.value !== "Gold"} // Disable all except White and Gold
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "4px",
                            }}
                        >
                            <button
                                type="submit"
                                title={
                                    userData?.length > 2 && userData[2] > 0
                                        ? ""
                                        : "Upgrade to premium to get more credits "
                                }
                                id="uploadButton"
                                className="btn btn-primary"
                                disabled={
                                    userData?.length > 2 && userData[2] > 0 ? false : true
                                }
                                onClick={() => handleUpload()}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "10px",
                                    boxShadow: "1px 2px 3px gray ",
                                    cursor: "pointer",
                                }}
                            >
                                Generate
                            </button>
                            {/* {img !== null && imgsLoaded && (
                  <button
                    id="uploadButton"
                    className="btn btn-primary"
                    onClick={() => sendEmailToUser(img)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    Send Email
                  </button>
                )} */}
                            {img !== null && imgsLoaded && (
                                <button
                                    id="uploadButton"
                                    className="btn btn-primary"
                                    onClick={() => handleUpload2(img)}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "10px",
                                    }}
                                >
                                    Download
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid
                className="image_grid"
                padding={"10px"}
                sx={{
                    width: "100%",
                    height: "88vh",
                    overflow: "auto",
                    marginTop: "0",
                    display: !isSmallScreen ? "flex" : "block",
                    alignItems: !isSmallScreen ? "center" : "start",
                    justifyContent: !isSmallScreen ? "center" : "start",
                }}
            >
                {loading && !imgsLoaded ? (
                    <LinearWithValueLabel
                        loading={loading || !imgsLoaded}
                        setImgsLoaded={setImgsLoaded}
                    />
                ) : (
                    <div className="image_container">
                        {img !== null && imgsLoaded && (
                            <img src={img} alt="new" style={{ width: "100%" }} />
                        )}
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

export default GenAi;
