import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const MenuEdit = ({ bulk = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // ここでローカルストレージからメニューデータを取得
    const storedMenus = JSON.parse(localStorage.getItem('menus') || '[]');
    if (bulk) {
      setMenus(storedMenus);
    } else {
      const foundMenu = storedMenus.find(m => m.id === parseInt(id)) || { id: 'new', name: '', price: 0, category: '', calories: 0, protein: 0, fat: 0, carbs: 0, description: '', takeout: false };
      setMenus([foundMenu]);
    }
  }, [id, bulk]);

  const handleSave = () => {
    // ここでローカルストレージに保存
    const storedMenus = JSON.parse(localStorage.getItem('menus') || '[]');
    if (bulk) {
      localStorage.setItem('menus', JSON.stringify(menus));
    } else {
      const menu = menus[0];
      if (menu.id === 'new') {
        menu.id = storedMenus.length + 1;
        storedMenus.push(menu);
      } else {
        const index = storedMenus.findIndex(m => m.id === menu.id);
        storedMenus[index] = menu;
      }
      localStorage.setItem('menus', JSON.stringify(storedMenus));
    }
    navigate('/');
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenus = [...menus];
    updatedMenus[index] = { ...updatedMenus[index], [field]: value };
    setMenus(updatedMenus);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {bulk ? 'メニュー一括編集' : (menus[0]?.id === 'new' ? '新規メニュー追加' : 'メニュー編集')}
      </Typography>
      {menus.map((menu, index) => (
        <div key={menu.id} style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="メニュー名"
            value={menu.name}
            onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="価格"
            type="number"
            value={menu.price}
            onChange={(e) => handleMenuChange(index, 'price', parseInt(e.target.value))}
            margin="normal"
          />
          {/* 他のフィールドも同様に追加 */}
          <FormControlLabel
            control={
              <Checkbox
                checked={menu.takeout}
                onChange={(e) => handleMenuChange(index, 'takeout', e.target.checked)}
              />
            }
            label="テイクアウト可能"
          />
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
        保存
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate('/')} style={{ marginTop: '20px', marginLeft: '10px' }}>
        キャンセル
      </Button>
    </Container>
  );
};

export default MenuEdit;