import { Typography, Button, TextField, IconButton, Paper, CircularProgress, Divider } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import wayg from '../../../assets/images/poser.jpg'
const ENVT = ({
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
}) => {
    console.log(responses)
    return (
        <div className="flex w-full" style={{ height: '100%' }}>
            {/* Left Section */}
            <div className='border-gray-300 w-1/2 p-3' style={{ height: '100vh' }}>
                <div className=" p-8 border bg-white rounded-lg shadow-xs" style={{ height: 'fit-content' }}>
                    <div>
                        <Typography variant="body2" className="text-gray-500 font-custom mb-1" style={{ fontWeight: 600, fontSize: 18, color: 'black' }}>
                            Powered by <a href="#" className="text-blue-500" >Agentic AI </a> by WAYG
                        </Typography>
                        <Typography variant="h4" className="font-bold mb-2 text-gray-800 font-custom mb-3" style={{ fontSize: '36px', fontWeight: 600 }}>
                            {agentDetails.name}
                        </Typography>
                        <Typography variant="body1" className="text-gray-600 mb-4 font-custom">
                            {agentDetails.description}
                        </Typography>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative font-custom">
                            <TextField
                                value={prompt}
                                onChange={handlePromptChange}
                                placeholder={placeholder}
                                multiline
                                rows={5}
                                variant="outlined"
                                required
                                fullWidth
                                inputProps={{ style: { padding: '4px' } }}
                                className="font-custom text-gray-600"
                                sx={{
                                    fontFamily: "Schibsted Grotesk !important",
                                    "& .MuiOutlinedInput-root": {
                                        fontFamily: "Schibsted Grotesk !important",
                                        color: '#4B5563',
                                        "& fieldset": {
                                            borderColor: "lightgrey", // Default border color
                                            fontFamily: "Schibsted Grotesk !important",
                                            color: '#4B5563',
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "lightgrey", // Disable hover border color change
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "1px solid lightgrey", // Disable focus border color change
                                            fontFamily: "Schibsted Grotesk !important",
                                        },
                                    },
                                }}
                            />
                            {uploadedFile && (
                                <Typography variant="body2" className="text-gray-600 mt-2 font-custom">
                                    Uploaded File:{" "}
                                    <a
                                        href={URL.createObjectURL(uploadedFile)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {uploadedFile.name}
                                    </a>
                                </Typography>
                            )}


                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="mt-2 hover:bg-blue-700 transition-colors duration-200 font-custom"
                            >
                                Submit
                            </Button>

                            {/* Icons positioned at the bottom right corner */}
                            <div className="absolute top-28 right-2 flex gap-2">
                                <IconButton component="label">
                                    <input type="file" hidden onChange={handleFileChange} />
                                    <AttachFileIcon />
                                </IconButton>
                                <IconButton onClick={handleMicClick}>
                                    <MicIcon />
                                </IconButton>
                            </div>
                        </form>
                    </div>

                    <Typography variant="body2" className="text-gray-500 font-custom" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '20px', fontWeight: 600, fontSize: 18, color: 'grey' }}>
                        <span> Built on </span><img src={wayg} width={70} height={30} />
                    </Typography>
                </div>
            </div>

            {/* Divider */}
            <Divider orientation="vertical" flexItem style={{ margin: '0 16px', backgroundColor: '#ccc' }} />

            {/* Right Section */}
            <div className="w-1/2 p-8 pt-3 h-full overflow-y-auto" style={{ maxHeight: 'calc(100vh - 32px)' }}>
                <Typography variant="h5" className="font-semibold mb-6 text-gray-800 font-custom">Response</Typography>
                <div className="space-y-4">
                    {responses.length === 0 ? (
                        <Paper className="p-4 border border-gray-300 rounded shadow-sm bg-white mt-2">
                            <Typography variant="body1" className="text-gray-500 font-custom">
                                Start by submitting a query.
                            </Typography>
                        </Paper>
                    ) : (
                        responses.map((response, index) => (
                            <Paper key={index} className="p-4 border border-gray-300 rounded shadow-sm bg-white mt-2">
                                {/* <Typography variant="subtitle1" className="font-bold mb-2 text-gray-800 font-custom">
                                    Input:
                                </Typography> */}
                                {/* <pre className="whitespace-pre-wrap font-custom">{response.input}</pre> */}

                                {response.loading ? (
                                    <div className="flex items-center justify-center mt-4">
                                        <CircularProgress size={24} />
                                    </div>
                                ) : (
                                    <>
                                        {/* {response.output && (
                                            // <Typography variant="subtitle1" className="font-bold mt-4 mb-2 text-gray-800 font-custom">
                                            //     Expected Output:
                                            // </Typography>
                                        )} */}
                                        <pre className="whitespace-pre-wrap font-custom text-gray-600" style={{fontSize:'16px'}} >{response.output}</pre>
                                    </>
                                )}
                            </Paper>
                        ))
                    )}
                    <div ref={responsesEndRef} /> {/* This element is used for scrolling */}
                </div>
            </div>
        </div>
    );
};

export default ENVT;
