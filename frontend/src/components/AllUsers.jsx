import React, { useState, useEffect } from 'react';
import { getProfile, getAllUsers, deleteUser } from '../services/userServices';
import CreateEmployees from '../components/CreateEmployees'; // ✅ Correct import (Capital letter)

import { Header, ContentContainerFlex, Table, Thead, Tr, Th, Tdt, Container, ActionButton } from '../global/Style';

function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  // ✅ modal state
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, allUsersData] = await Promise.all([getProfile(), getAllUsers()]);
        setUserProfile(profileData.user);
        setAllUsers(allUsersData);
      } catch (err) {
        setError(err.message || 'Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user: ${userName}?`)) {
      return;
    }
    try {
      await deleteUser(userId);
      setAllUsers(allUsers.filter((user) => user._id !== userId));
      setDeleteMessage(`User '${userName}' deleted successfully!`);
    } catch (err) {
      setDeleteMessage(err.message || 'Failed to delete user.');
    }
  };

  if (loading) {
    return (
      <ContentContainerFlex style={{ justifyContent: 'center' }}>
        <p>Loading user data...</p>
      </ContentContainerFlex>
    );
  }

  if (error) {
    return (
      <ContentContainerFlex style={{ color: 'red', justifyContent: 'center' }}>
        <p>{error}</p>
      </ContentContainerFlex>
    );
  }

  const canDelete = userProfile && userProfile.role === 'admin';

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header>User Dashboard</Header>

        <ActionButton onClick={() => setShowForm(true)}>+ Add User</ActionButton>
      </div>

      {/* Profile Section */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>My Profile</h2>
        {userProfile && (
          <div style={{ paddingLeft: '2rem', gap: '12rem', display: 'flex' }}>
            <p>
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p>
              <strong>Role:</strong> {userProfile.role}
            </p>
          </div>
        )}
      </section>

      {/* All Users Section */}
      <section>
        <h2>All Employees</h2>
        {deleteMessage && <p style={{ color: 'green', textAlign: 'center' }}>{deleteMessage}</p>}
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              {canDelete && <Th>Actions</Th>}
            </Tr>
          </Thead>
          <tbody>
            {allUsers.map((user) => (
              <Tr key={user._id}>
                <Tdt>{user.name}</Tdt>
                <Tdt>{user.email}</Tdt>
                <Tdt>{user.role}</Tdt>

                {canDelete && (
                  <Tdt>
                    {user.role !== 'admin' && user._id !== userProfile._id && (
                      <ActionButton danger onClick={() => handleDelete(user._id, user.name)}>
                        Delete
                      </ActionButton>
                    )}
                  </Tdt>
                )}
              </Tr>
            ))}
          </tbody>
        </Table>
      </section>

      {showForm && <CreateEmployees onClose={() => setShowForm(false)} />}
    </Container>
  );
}

export default DashboardPage;
