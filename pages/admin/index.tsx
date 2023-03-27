import { AdminLayout } from '@/components/layouts';
import { DashboardOutlined } from '@mui/icons-material';
import React from 'react';

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="General Information"
      pageDescription="Dashboard Panel for control of The Shop"
      icon={<DashboardOutlined />}
    >
      <h2>god</h2>
    </AdminLayout>
  );
};

export default DashboardPage;
