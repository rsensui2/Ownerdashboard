import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const ChainInfo = ({ info }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        チェーン情報
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography><strong>チェーン名:</strong> {info.name}</Typography>
          <Typography><strong>代表者:</strong> {info.representative}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><strong>メール:</strong> {info.email}</Typography>
          <Typography><strong>電話番号:</strong> {info.phone}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChainInfo;