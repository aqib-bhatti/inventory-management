import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSummery } from '../services/stockServices'; // Ensure this path is correct

const COLORS = ['#FF4500', '#00C49F', '#FFBB28', '#A234A2', '#0088FE', '#FF8042', '#2ECC40'];

const FruitStockChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSummery();
        if (response.success && response.items) {
          const data = response.items.map((item) => ({
            name: item.name,
            value: item.remaining,
            percentage: item.percentage,
          }));
          setChartData(data);
        } else {
          setError('Failed to fetch stock data.');
        }
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading chart...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>{error}</div>;
  }

  if (chartData.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No stock data available to display.</div>;
  }

  return (
    <div style={{ padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h3 style={{ textAlign: 'center' }}>Stock by Fruit</h3>
      <p style={{ textAlign: 'center', color: '#666' }}>Distribution of inventory across fruit categories</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={0} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => {
              const percentage = props.payload.percentage;
              return [`${value} items`, `${name} (${percentage}%)`];
            }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FruitStockChart;
