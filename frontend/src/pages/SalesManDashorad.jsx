import React, { useState, useEffect } from 'react';
import { DashboardContainer, Header, TabContainer, TabButton, ContentContainer, LogoutButton2 } from '../global/Style';
import Sales from '../components/Sales';
import SalesmanReport from '../components/SalesmanLogs';
import Profile from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authslices';

function SalesManDashboard() {
  const [activeTab, setActiveTab] = useState('sales');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const { user } = useSelector((state) => state.auth);

 
  useEffect(() => {
    if (!user || user.role !== 'salesman') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  // ✅ Add a loading state to prevent flickering
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Header>Sales Dashboard</Header>
      <TabContainer>
        <TabButton $active={activeTab === 'sales'} onClick={() => setActiveTab('sales')}>
          Sales
        </TabButton>
        <TabButton $active={activeTab === 'report'} onClick={() => setActiveTab('report')}>
          Report
        </TabButton>
        <TabButton $active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
          Profile
        </TabButton>
        <LogoutButton2 onClick={handleLogout}>Log Out</LogoutButton2>
      </TabContainer>
      <ContentContainer>
        {activeTab === 'sales' && <Sales />}
        {activeTab === 'report' && <SalesmanReport />}
        {activeTab === 'profile' && <Profile />}
      </ContentContainer>
    </DashboardContainer>
  );
}

export default SalesManDashboard;
