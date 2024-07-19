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

    // BulkMenuEditで設定したメニューデータを使用 (すべてのメニューを表示)
    const allMenus = [
      { id: 1, name: '回鍋肉', price: 800, category: '中華', stores: { 1: true, 2: true, 3: false }, priorityStores: { 1: false, 2: false, 3: false }, calories: 450, protein: 20, fat: 25, carbs: 30, description: '豚肉と野菜を特製ソースで炒めた人気メニュー', takeout: true },
      { id: 2, name: '麻婆豆腐', price: 700, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: true, 2: false, 3: false }, calories: 400, protein: 15, fat: 20, carbs: 25, description: '山椒のしびれる辛さが特徴の四川料理', takeout: true },
      { id: 3, name: '青椒肉絲', price: 750, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: false, 2: false, 3: true }, calories: 380, protein: 18, fat: 15, carbs: 35, description: 'ピーマンと細切り豚肉の細切り炒め', takeout: true },
      { id: 4, name: '餃子', price: 500, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: true, 3: false }, calories: 300, protein: 12, fat: 15, carbs: 30, description: '手作りの皮で包んだジューシーな餃子', takeout: true },
      { id: 5, name: '担々麺', price: 900, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: true, 2: false, 3: false }, calories: 550, protein: 22, fat: 30, carbs: 60, description: '痺れる辛さと濃厚なゴマの風味が特徴の麺料理', takeout: false },
      { id: 6, name: '五目炒飯', price: 850, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: false, 3: true }, calories: 600, protein: 20, fat: 18, carbs: 90, description: '具沢山のパラパラチャーハン', takeout: true },
      { id: 7, name: '酢豚', price: 950, category: '中華', stores: { 1: true, 2: true, 3: false }, priorityStores: { 1: false, 2: true, 3: false }, calories: 500, protein: 25, fat: 20, carbs: 50, description: '甘酢あんかけの人気メニュー', takeout: true },
      { id: 8, name: '八宝菜', price: 880, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: true, 2: false, 3: false }, calories: 350, protein: 18, fat: 15, carbs: 40, description: '8種類の具材を使った贅沢な炒め物', takeout: true },
      { id: 9, name: 'エビチリ', price: 1000, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: false, 3: true }, calories: 400, protein: 20, fat: 25, carbs: 20, description: 'プリプリのエビとピリ辛ソースが絶妙', takeout: true },
      { id: 10, name: '春巻き', price: 600, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: true, 3: false }, calories: 250, protein: 8, fat: 12, carbs: 30, description: 'パリパリの皮に野菜と肉をたっぷり詰めました', takeout: true },
      { id: 11, name: '酸辣湯', price: 700, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: true, 2: false, 3: false }, calories: 200, protein: 10, fat: 8, carbs: 20, description: '酸っぱ辛いスープが人気のメニュー', takeout: false },
      { id: 12, name: '冷やし中華', price: 850, category: '中華', stores: { 1: true, 2: true, 3: false }, priorityStores: { 1: false, 2: false, 3: false }, calories: 450, protein: 18, fat: 12, carbs: 70, description: '夏季限定の冷たい麺料理', takeout: true },
      { id: 13, name: '杏仁豆腐', price: 400, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: true, 3: false }, calories: 180, protein: 5, fat: 6, carbs: 30, description: 'なめらかな口当たりのデザート', takeout: true },
      { id: 14, name: '焼き餃子', price: 550, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: true, 2: false, 3: true }, calories: 320, protein: 14, fat: 18, carbs: 30, description: 'カリッと焼いた人気の餃子', takeout: true },
      { id: 15, name: '豚の角煮', price: 1100, category: '中華', stores: { 1: true, 2: true, 3: false }, priorityStores: { 1: false, 2: true, 3: false }, calories: 650, protein: 30, fat: 50, carbs: 15, description: 'とろとろに煮込んだ贅沢な一品', takeout: true },
      { id: 16, name: '青菜炒め', price: 600, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: false, 3: true }, calories: 150, protein: 6, fat: 10, carbs: 15, description: 'シンプルで健康的な野菜炒め', takeout: true },
      { id: 17, name: '棒々鶏', price: 780, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: true, 2: false, 3: false }, calories: 300, protein: 25, fat: 15, carbs: 10, description: '蒸し鶏とゴマダレのさっぱりとした冷菜', takeout: true },
      { id: 18, name: 'マーボー茄子', price: 750, category: '中華', stores: { 1: true, 2: true, 3: false }, priorityStores: { 1: false, 2: true, 3: false }, calories: 350, protein: 12, fat: 25, carbs: 25, description: 'なすを使った麻婆豆腐風の料理', takeout: true },
      { id: 19, name: '油淋鶏', price: 900, category: '中華', stores: { 1: true, 2: true, 3: true }, priorityStores: { 1: false, 2: false, 3: true }, calories: 550, protein: 30, fat: 35, carbs: 25, description: 'カリッと揚げた鶏肉に特製ソースをかけた一品', takeout: true },
      { id: 20, name: '叉焼飯', price: 850, category: '中華', stores: { 1: true, 2: false, 3: true }, priorityStores: { 1: true, 2: false, 3: false }, calories: 580, protein: 22, fat: 15, carbs: 85, description: '香ばしい叉焼入りのチャーハン', takeout: true },
    ];   

    setMenus(allMenus);
  }, [id]);

  useEffect(() => {
    // 課金額の計算
    if (store) {
      let baseCharge = 0;
      let priorityCharge = 0;
      const displayedMenus = menus.filter(m => m.stores[store.id]).length;
      const priorityMenus = menus.filter(m => m.priorityStores[store.id]).length;

      switch (store.plan) {
        case 'スターター':
          baseCharge = 5000;
          if (displayedMenus > 1) {
            baseCharge += (displayedMenus - 1) * 1000; // 1メニュー以上は1000円/メニュー
          }
          priorityCharge = priorityMenus > 0 ? 5000 : 0; // 1つでも優先表示があれば5000円
          break;
        case 'ベーシック':
          baseCharge = 15000; // 5メニューまで含む
          if (displayedMenus > 5) {
            baseCharge += (displayedMenus - 5) * 500; // 5メニュー以上は500円/メニュー
          }
          priorityCharge = Math.max(0, priorityMenus - 3) * 1000; // 3つまで無料、それ以上は1000円/メニュー
          break;
        case 'プレミアム':
          baseCharge = 50000; // メニュー数無制限
          // プレミアムプランでは優先表示の追加料金なし
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