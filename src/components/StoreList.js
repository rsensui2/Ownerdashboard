import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,  FormControlLabel,
} from '@mui/material';

const StoreList = ({ stores = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>店舗名</TableCell>
            <TableCell>契約プラン</TableCell>
            <TableCell>メニュー数 (優先設定)</TableCell>
            <TableCell>アクション</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell component={Link} to={`/store/${store.id}/edit`}>{store.name}</TableCell>
              <TableCell>{store.plan}</TableCell>
              <TableCell>{store.menus} ({store.priorityMenus})</TableCell>
              <TableCell>
                <Button component={Link} to={`/store/${store.id}/edit`} variant="contained" color="primary" size="small" style={{ marginRight: '8px' }}>
                  編集
                </Button>
                <Button component={Link} to={`/store/${store.id}/menu`} variant="contained" color="secondary" size="small">
                  メニュー
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StoreList;