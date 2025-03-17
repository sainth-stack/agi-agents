import { Card, CardActionArea, CardContent, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SelectType = () => {
    const router = useNavigate();

    const handleSelect = (type) => {
        if (type === "existing") {
            router("/create-existing-agent");
        } else {
            router("/create-agent");
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="90vh" bgcolor="#f5f5f5" p={3}>
            {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
                Select AI Digital Worker Type
            </Typography>
            <Typography variant="body1" color="textSecondary" textAlign="center" mb={4}>
                Choose whether to create an AI digital worker using a predefined template or customize your own from scratch.
            </Typography> */}
            <Grid container spacing={4} maxWidth={600}>
                {[{ title: "Existing", path: "existing", description: "Use a predefined AI digital worker template." }, 
                  { title: "New", path: "new", description: "Create a customized AI digital worker from scratch." }].map((item) => (
                    <Grid item xs={12} sm={6} key={item.path}>
                        <Card 
                            sx={{ 
                                transition: "0.3s", 
                                borderRadius: 3,
                                boxShadow: 3,
                                '&:hover': { boxShadow: 6, transform: "scale(1.05)" }
                            }}
                        >
                            <CardActionArea onClick={() => handleSelect(item.path)}>
                                <CardContent>
                                    <Typography variant="h5" align="center" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" textAlign="center" mt={1}>
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SelectType;