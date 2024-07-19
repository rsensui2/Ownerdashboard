import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StoreEdit from './components/StoreEdit';
import StoreMenuEdit from './components/StoreMenuEdit';
import BulkMenuEdit from './components/BulkMenuEdit';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/store/:id/edit"
            element={isLoggedIn ? <StoreEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/store/:id/menu"
            element={isLoggedIn ? <StoreMenuEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/menu/bulk-edit"
            element={isLoggedIn ? <BulkMenuEdit /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;