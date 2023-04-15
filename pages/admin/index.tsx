import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { SummaryTitle } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { DashboardResponse } from '@/interfaces';
import { FullScreenLoading } from '@/components/ui';

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000,
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!data && !error) return <FullScreenLoading />;

  if (error) {
    console.log(error);
    return <Typography>Error loading data</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productWithNoInventory,
    lowInvetory,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="General Information"
      pageDescription="Dashboard Panel for control of The Shop"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTitle
          title={numberOfOrders}
          subtitle={'Total orders'}
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 30 }} />}
        />
        <SummaryTitle
          title={paidOrders}
          subtitle={'Paid orders'}
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 30 }} />}
        />
        <SummaryTitle
          title={notPaidOrders}
          subtitle={'Pending orders'}
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 30 }} />}
        />
        <SummaryTitle
          title={numberOfClients}
          subtitle={'Customers'}
          icon={<GroupOutlined color="primary" sx={{ fontSize: 30 }} />}
        />
        <SummaryTitle
          title={numberOfProducts}
          subtitle={'Products'}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 30 }} />}
        />
        <SummaryTitle
          title={productWithNoInventory}
          subtitle={'Not Available'}
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 30 }} />
          }
        />
        <SummaryTitle
          title={lowInvetory}
          subtitle={'Low Inventory'}
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 30 }}
            />
          }
        />
        <SummaryTitle
          title={refreshIn}
          subtitle={'Update at:'}
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 30 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
