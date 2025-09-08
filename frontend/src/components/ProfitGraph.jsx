import React, { useState, useEffect } from 'react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { GraphContainer,GraphHeader } from '../global/Summery';
import { getProfitTrends } from '../services/stockServices';




// Main component
const ProfitGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const data = await getProfitTrends(); 
        const sortedData = data.sort((a, b) => {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return months.indexOf(a.month) - months.indexOf(b.month);
        });
        setGraphData(sortedData);
      } catch (e) {
        console.error("Failed to fetch graph data:", e);
        setError("Failed to load graph data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);


  if (loading) {
    return <GraphContainer>Loading...</GraphContainer>;
  }

  if (error) {
    return <GraphContainer className="error-message">{error}</GraphContainer>;
  }

  return (
    <GraphContainer>
      <GraphHeader>
        <h2>Sales Trends</h2>
        <p>Monthly sales performance and order volume</p>
      </GraphHeader>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={graphData} >
          <CartesianGrid strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => ` ${value/1000}k`} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#4c566a"
            fill="#4c566a"
            fillOpacity={0.6}
            
          />
        </AreaChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default ProfitGraph;