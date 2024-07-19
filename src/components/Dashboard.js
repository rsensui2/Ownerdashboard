import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Grid, Paper, Container, AppBar, Toolbar } from '@mui/material';
import OwnerInfo from './OwnerInfo';
import ContractInfo from './ContractInfo';
import StoreList from './StoreList';

const Dashboard = () => {
  const [ownerInfo, setOwnerInfo] = useState({});
  const [contractInfo, setContractInfo] = useState({});
  const [stores, setStores] = useState([]);

  useEffect(() => {
    setOwnerInfo({
      name: '泉水亮介',
      email: 'rsensui@menucompany.jp',
      phone: '090-3202-3466',
    });
    setContractInfo({
      totalStores: 3,
      basicFee: 70000,
      optionContracts: 5,
      optionFee: 25000,
      totalMenus: 20,
    });
    setStores([
      { id: 1, name: '丸の内店', plan: 'プレミアム', displayedMenus: 20, priorityMenus: 4 },
      { id: 2, name: '新宿店', plan: 'ベーシック', displayedMenus: 5, priorityMenus: 0 },
      { id: 3, name: '渋谷店', plan: 'スターター', displayedMenus: 1, priorityMenus: 1 },
    ]);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            なにたべ店舗管理ダッシュボード
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <OwnerInfo info={ownerInfo} setInfo={setOwnerInfo} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <ContractInfo info={contractInfo} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <StoreList stores={stores} />
            </Paper>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            component={Link}
            to="/menu/bulk-edit"
            variant="contained"
            color="primary"
            size="large"
          >
            メニュー一括編集
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;