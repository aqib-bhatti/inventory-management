import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GraphContainer, GraphHeader } from '../global/Summery';
import { getSummery } from '../services/stockServices';
import Loader from '../components/Loader';

const ProfitGraph = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const data = await getSummery();
        setSummaryData(data);
      } catch (e) {
        console.error('Failed to fetch graph data:', e);
        setError('Failed to load graph data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <GraphContainer className="error-message">{error}</GraphContainer>;
  }

  const graphData = summaryData?.monthlyProfitData;
  if (!graphData || graphData.length === 0) {
    return <GraphContainer>No profit data available.</GraphContainer>;
  }

  // ✅ Function to format the month label on the XAxis
  const formatMonthTick = (tickItem) => {
    // Splits the "1-2025" string by "-" and takes the first part (the month number)
    const monthNumber = parseInt(tickItem.split('-')[0], 10);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return monthNames[monthNumber - 1];
  };

  return (
    <GraphContainer>
      <GraphHeader>
        <h2>Profit Trends</h2>
        <p>Monthly profit performance over the last year</p>
      </GraphHeader>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={graphData}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} />

          <XAxis dataKey="month" tickFormatter={formatMonthTick} />
          <YAxis tickFormatter={(value) => ` ${value / 1000}k`} />
          <Tooltip />
          <Area type="monotone" dataKey="profit" stroke="#4c566a" fill="#4c566a" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

export default ProfitGraph;
