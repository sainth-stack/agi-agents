import React from "react";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const Dashboard1 = () => {
  const navigate = useNavigate()
  const chartOptions = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: 'rgba(156, 39, 176, 0.2)',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
            offsetY: 10,
            fontSize: '22px',
            color: '#9c27b0',
            formatter: function (val) {
              return '';
            },
          },
        },
      },
    },
    fill: {
      colors: ['#9c27b0']
    },
    legend: {
      show: true,
      position: 'bottom',
      markers: {
        shape: 'circle',
        fillColors: ['#9c27b0', 'rgba(156, 39, 176, 0.2)'],
      },
      labels: {
        useSeriesColors: true,
      },
      formatter: function(seriesName, opts) {
        return `<span style="color: black;">${seriesName}</span>`;
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function(value, { seriesIndex }) {
            return value;
          },
        },
      },
    },
    labels: ['Remaining','Used'],
  };
  
  const chartSeries = [50];
  
  
  
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold">
        Welcome, Sainathreddy.
      </Typography>

      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Upgrade
              </Typography>
              <Typography variant="body1" mt={2}>
                You have no subscription at the moment. Please select a subscription plan or a token pack.
              </Typography>
              <Typography variant="body1" mt={2}>
                Total <strong>1,500</strong> word and <strong>5</strong> image tokens left.
              </Typography>
              <Button variant="contained" color="primary" style={{ marginTop: "20px" }} onClick={()=>navigate('/pricing')}>
                Select a Plan
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box position="relative" display="inline-flex">
              <Chart options={chartOptions} series={chartSeries} type="radialBar" height={350} width={400}/>
              <Box
                top={30}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Typography variant="h5" component="div" color="textSecondary">
                  100
                </Typography>
                <Typography variant="caption" component="div" color="textSecondary">
                  Credits
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold">
          Overview
        </Typography>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6" color="primary">
                Words Left
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                1,500
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6" color="primary">
                Images Left
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                5
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
              <Typography variant="h6" color="primary">
                Hours Saved
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                0
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard1;
