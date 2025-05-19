import React from 'react';

import AddClientForm from '../components/AddClientForm';
import ClientList from '../components/ClientList';

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <AddClientForm />

      <hr />
      <ClientList />
    </>
    )
}

export default Dashboard;