import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Checkbox, Button, Box, AppBar, Toolbar, IconButton, Container 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StoreMenuEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [menus, setMenus] = useState([]);
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    // ここで本来はAPIからデータを取得します
    const storeId = parseInt(id);
    setStore({ id: storeId, name: `店舗${storeId}`, displayName: `なにたべ店舗${storeId}`, plan: 'プレミアム' });

    // BulkMenuEditで設定したメニューデータを使用
    const allMenus = [
      // ... BulkMenuEditで設定した20個のメニューデータ
    ];

    // 該当店舗で表示されているメニューのみをフィルタリング
    const storeMenus = allMenus.filter(menu => menu.stores[storeId]);
    setMenus(storeMenus);
  }, [id]);

  useEffect(() => {
    // 課金額の計算
    if (store) {
      let baseCharge = 0;
      let priorityCharge = 0;

      switch (store.plan) {
        case 'スターター':
          baseCharge = 5000;
          priorityCharge = menus.filter(m => m.priorityStores[store.id]).length > 0 ? 5000 : 0;
          break;
        case 'ベーシック':
          baseCharge = 15000;
          priorityCharge = Math.max(0, menus.filter(m => m.priorityStores[store.id]).length - 3) * 1000;
          break;
        case 'プレミアム':
          baseCharge = 50000;
          break;
      }

      setCharge(baseCharge + priorityCharge);
    }
  }, [store, menus]);

  const handleDisplayChange = (menuId) => {
    setMenus(menus.map(menu => 
      menu.id === menuId ? { ...menu, stores: { ...menu.stores, [store.id]: !menu.stores[store.id] } } : menu
    ));
  };

  const handlePriorityChange = (menuId) => {
    setMenus(menus.map(menu => 
      menu.id === menuId ? { ...menu, priorityStores: { ...menu.priorityStores, [store.id]: !menu.priorityStores[store.id] } } : menu
    ));
  };

  const handleSave = () => {
    // ここでデータを保存
    console.log('Updated menus:', menus);
    navigate('/');
  };

  if (!store) return <div>Loading...</div>;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {store.displayName} メニュー編集
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          現在の課金額: ¥{charge.toLocaleString()}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>メニュー名</TableCell>
                <TableCell>表示</TableCell>
                <TableCell>優先表示</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menus.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell>{menu.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={menu.stores[store.id]}
                      onChange={() => handleDisplayChange(menu.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={menu.priorityStores[store.id]}
                      onChange={() => handlePriorityChange(menu.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            保存
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default StoreMenuEdit;