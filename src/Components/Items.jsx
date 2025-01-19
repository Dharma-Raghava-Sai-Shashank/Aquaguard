import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ShowWaterManagement = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [pressureaiRecommendation, setpressureAiRecommendation] = useState("");
  const [tempaiRecommendation, settempAiRecommendation] = useState("");
  const [flowrateaiRecommendation, setflowrateAiRecommendation] = useState("");
  const { id } = useParams();
  let pressure = [];
  let temperature = [];
  let flowrate = [];

  const getResponse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/agglomeration/user/gettingdevice",
        { id }
      );
      console.log(response);

      // Ensure device data is valid and exists
      const deviceData = response.data.data[0];
      if (deviceData) {
        // Extract the last 20 elements from each array
        pressure = deviceData.pressure?.slice(-20) || [];
        temperature = deviceData.temperature?.slice(-20) || [];
        flowrate = deviceData.waterFlow?.slice(-20) || [];

        if (response.data?.data?.length > 0) {
          const labels = deviceData.createdAt || [];
          const waterFlowData = flowrate;
          const pressureData = pressure;
          const temperatureData = temperature;
          const data = {
            labels,
            datasets: [
              {
                label: "Water Flow (L/s)",
                data: waterFlowData,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
              },
              {
                label: "Pressure (psi)",
                data: pressureData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Temperature (°C)",
                data: temperatureData,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          };

          setChartData(data);
        } else {
          setErrorMessage("No data found for the given device.");
        }
      } else {
        setErrorMessage("Invalid device data received.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch device data. Please try again later.");
    }
  };

  const getpressuredata = async () => {
    const prompt = `Analyze the following array of 20 recent pressure readings ${pressure} from our factory's process system. Provide a detailed analysis covering these key areas:
Pressure Pattern Assessment:
Examine the variations in these pressure readings. What do the patterns indicate about our system stability? Are there any concerning fluctuations that might affect operational safety?
System Performance Analysis:
Based on these pressure patterns, evaluate the system's integrity. Identify any pressure anomalies that might indicate system weaknesses. Which areas need immediate attention?
Equipment Health Evaluation:
What do these readings reveal about our pressure management systems? Analyze how pressure variations might indicate compressor performance or seal integrity. Which components might need maintenance?
Safety and Efficiency Impact:
Calculate the system efficiency based on these readings. Compare these numbers to safety standards. What improvements could optimize our pressure management? Provide specific recommendations for enhancing safety and efficiency.
Recommendations:
Provide actionable steps for:

Safety-critical maintenance
System optimization opportunities
Pressure management improvements
Monitoring enhancements

Please provide clear, data-driven insights without using any special formatting or symbols. Focus on practical, implementable solutions for our facility team.`;
    try {
      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      let response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDuvVGOjFCTIS3sRYtg89dRtcbAi6Ul05Q",
        data
      );

      if (response.data) {
        let aiResponse =
          response.data.candidates[0].content.parts[0].text || "";
        aiResponse = aiResponse.replace(/\*\*\*/g, "");
        setflowrateAiRecommendation(aiResponse);
      } else {
        setErrorMessage("Error fetching AI data.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Failed to fetch AI recommendations. Please try again later."
      );
    }
  };
  const gettempdata = async () => {
    const prompt = `Analyze the following array of 20 recent temperature readings ${temperature} from our factory's process system. Provide a detailed analysis covering these key areas:
Temperature Pattern Assessment:
Examine the variations in these temperature readings. What do the patterns indicate about our thermal stability? Are there any concerning fluctuations that might affect product quality?
System Performance Analysis:
Based on these temperature patterns, evaluate the heating/cooling system performance. Identify any thermal inconsistencies that might indicate system inefficiencies. Which areas need attention?
Equipment Health Evaluation:
What do these readings reveal about our thermal management systems? Analyze how temperature variations might indicate heater/cooler performance or insulation issues. Which components might need maintenance?
Energy Efficiency Impact:
Calculate the thermal efficiency based on these readings. Compare these numbers to industry standards. What improvements could optimize our energy usage? Provide specific recommendations for reducing energy waste.
Recommendations:
Provide actionable steps for:

Critical maintenance needs
Energy optimization opportunities
System efficiency improvements
Temperature monitoring enhancements

Please provide clear, data-driven insights without using any special formatting or symbols. Focus on practical, implementable solutions for our facility team.`;
    try {
      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      let response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDuvVGOjFCTIS3sRYtg89dRtcbAi6Ul05Q",
        data
      );

      if (response.data) {
        let aiResponse =
          response.data.candidates[0].content.parts[0].text || "";
        aiResponse = aiResponse.replace(/\*\*\*/g, "");
        setflowrateAiRecommendation(aiResponse);
      } else {
        setErrorMessage("Error fetching AI data.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Failed to fetch AI recommendations. Please try again later."
      );
    }
  };
  const getflowratedata = async () => {
    const prompt = `Analyze the following array of 20 recent flowrate readings ${flowrate} from our factory's water distribution system. Provide a detailed analysis covering these key areas:
    Flow Pattern Assessment:
    Examine the variations in these flowrate readings. What do the patterns suggest about our system's stability? Are there any sudden spikes or drops that might indicate operational issues? How do these variations affect our process efficiency?
    System Performance Analysis:
    Based on these flowrate patterns, evaluate the system's performance. Identify any irregular patterns that might indicate system inefficiencies. Which sections might need immediate attention?
    Infrastructure Health Evaluation:
    What do these readings reveal about our pipeline network health? Analyze how flow variations might indicate valve performance or pipe integrity issues. Which areas might need maintenance?
    Resource Optimization:
    Calculate the efficiency based on these readings. Compare these numbers to industry standards. What improvements could optimize our system? Provide specific recommendations for reducing waste.
    Recommendations:
    Provide actionable steps for:
    
    Immediate maintenance needs
    System optimization opportunities
    Efficiency improvements
    Monitoring enhancements`;
    try {
      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      let response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDuvVGOjFCTIS3sRYtg89dRtcbAi6Ul05Q",
        data
      );

      if (response.data) {
        let aiResponse =
          response.data.candidates[0].content.parts[0].text || "";
        aiResponse = aiResponse.replace(/\*\*\*/g, "");
        setflowrateAiRecommendation(aiResponse);
      } else {
        setErrorMessage("Error fetching AI data.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Failed to fetch AI recommendations. Please try again later."
      );
    }
  };

  useEffect(() => {
    // First call the API functions to get the data
    const fetchData = async () => {
      await getResponse();
      await getpressuredata();
      await getflowratedata();
      await gettempdata();

      // Log arrays after fetching data
      console.log("Pressure:", pressure);
      console.log("Temperature:", temperature);
      console.log("Flowrate:", flowrate);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Water Management Details</h1>
        <p className="text-lg">
          <strong>Device ID:</strong> {id}
        </p>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
      <div className="w-full max-w-4xl mt-6">
        {chartData.labels.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-gray-500">Loading chart...</p>
        )}
      </div>
      <div className="w-full max-w-4xl mt-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
        {aiRecommendation ? (
          <p className="text-gray-800 text-2xl">{aiRecommendation}</p>
        ) : (
          <p className="text-gray-500">Loading AI recommendations...</p>
        )}
      </div>
    </div>
  );
};

export default ShowWaterManagement;
