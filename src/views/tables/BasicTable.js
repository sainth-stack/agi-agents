import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";


const BasicTable = () => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Basic Table</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            {/* <ExTable /> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasicTable;
