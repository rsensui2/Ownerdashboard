import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const OwnerInfo = ({ info, setInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);

  const handleChange = (e) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(info);
    setIsEditing(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        オーナー情報
      </Typography>
      {isEditing ? (
        <>
          <TextField
            fullWidth
            label="名前"
            name="name"
            value={editedInfo.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="メールアドレス"
            name="email"
            value={editedInfo.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="電話番号"
            name="phone"
            value={editedInfo.phone}
            onChange={handleChange}
            margin="normal"
          />
          <Box mt={2}>
            <Button onClick={handleSave} variant="contained" color="primary" sx={{ mr: 1 }}>
              保存
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              キャンセル
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography><strong>名前:</strong> {info.name}</Typography>
          <Typography><strong>メールアドレス:</strong> {info.email}</Typography>
          <Typography><strong>電話番号:</strong> {info.phone}</Typography>
          <Button onClick={() => setIsEditing(true)} variant="outlined" color="primary" sx={{ mt: 2 }}>
            編集
          </Button>
        </>
      )}
    </Box>
  );
};

export default OwnerInfo;