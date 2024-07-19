import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TextField, Checkbox, Button, Grid, AppBar, Toolbar, IconButton, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BulkMenuEdit = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // 20個の中華料理メニューを設定 (前回のコードと同じ)
    const initialMenus = [
      // ... 20個のメニューデータ
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
    setMenus(initialMenus);
  }, []);

  const handleEdit = (menu) => {
    setEditingMenu({...menu});
    setOpenDialog(true);
  };

  const handleMenuChange = (field, value) => {
    setEditingMenu({ ...editingMenu, [field]: value });
  };

  const handleSave = () => {
    setMenus(menus.map(menu => menu.id === editingMenu.id ? editingMenu : menu));
    setOpenDialog(false);
    setEditingMenu(null);
  };

  const handleStoreChange = (menuId, storeId, isChecked, isPriority) => {
    setMenus(menus.map(menu => {
      if (menu.id === menuId) {
        const updatedStores = { ...menu.stores, [storeId]: isChecked };
        const updatedPriorityStores = { ...menu.priorityStores, [storeId]: isPriority };
        return { ...menu, stores: updatedStores, priorityStores: updatedPriorityStores };
      }
      return menu;
    }));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            メニュー一括編集
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>メニュー名</TableCell>
                <TableCell>価格</TableCell>
                <TableCell>カテゴリ</TableCell>
                <TableCell>丸の内店</TableCell>
                <TableCell>新宿店</TableCell>
                <TableCell>渋谷店</TableCell>
                <TableCell>アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menus.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell>{menu.name}</TableCell>
                  <TableCell>¥{menu.price}</TableCell>
                  <TableCell>{menu.category}</TableCell>
                  {[1, 2, 3].map((storeId) => (
                    <TableCell key={storeId}>
                      <Checkbox
                        checked={menu.stores[storeId]}
                        onChange={(e) => handleStoreChange(menu.id, storeId, e.target.checked, menu.priorityStores[storeId])}
                      />
                      <Checkbox
                        checked={menu.priorityStores[storeId]}
                        onChange={(e) => handleStoreChange(menu.id, storeId, menu.stores[storeId], e.target.checked)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(menu)}>
                      編集
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>メニュー詳細編集</DialogTitle>
          <DialogContent>
            {editingMenu && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="名前" value={editingMenu.name} onChange={(e) => handleMenuChange('name', e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="価格" type="number" value={editingMenu.price} onChange={(e) => handleMenuChange('price', Number(e.target.value))} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="カテゴリ" value={editingMenu.category} onChange={(e) => handleMenuChange('category', e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="カロリー" type="number" value={editingMenu.calories} onChange={(e) => handleMenuChange('calories', Number(e.target.value))} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="タンパク質" type="number" value={editingMenu.protein} onChange={(e) => handleMenuChange('protein', Number(e.target.value))} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="脂質" type="number" value={editingMenu.fat} onChange={(e) => handleMenuChange('fat', Number(e.target.value))} />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="炭水化物" type="number" value={editingMenu.carbs} onChange={(e) => handleMenuChange('carbs', Number(e.target.value))} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="説明" value={editingMenu.description} onChange={(e) => handleMenuChange('description', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={editingMenu.takeout} 
                        onChange={(e) => handleMenuChange('takeout', e.target.checked)}
                      />
                    }
                    label="テイクアウト可能"
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
            <Button onClick={handleSave} variant="contained" color="primary">保存</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default BulkMenuEdit;