import React from 'react';
import { Typography, Grid } from '@mui/material';

const ContractInfo = ({ info = {} }) => {
  const { 
    totalStores = 0, 
    basicFee = 0, 
    optionContracts = 0, 
    optionFee = 0, 
    totalMenus = 0 
  } = info;

  return (
    <div>
      <Typography variant="h5" gutterBottom>契約情報</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography><strong>総店舗数:</strong> {totalStores}</Typography>
          <Typography><strong>基本料金総額:</strong> ¥{basicFee.toLocaleString()}</Typography>
          <Typography><strong>オプション契約数:</strong> {optionContracts}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><strong>オプション料金:</strong> ¥{optionFee.toLocaleString()}</Typography>
          <Typography><strong>登録メニュー数:</strong> {totalMenus}</Typography>
          <Typography><strong>合計金額:</strong> ¥{(basicFee + optionFee).toLocaleString()}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContractInfo;