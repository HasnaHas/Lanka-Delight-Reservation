import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Reservations from './pages/Reservations.jsx';
import CompletedReservations from './pages/CompletedReservations.jsx';
import DeclinedReservations from './pages/DeclinedReservations.jsx';
import AddMenu from './pages/AddMenu.jsx';
import MenuManagement from './pages/MenuManagement.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AdminDashboard />}>
            <Route index element={<Reservations />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="completed-reservations" element={<CompletedReservations />} />
            <Route path="declined-reservations" element={<DeclinedReservations />} />
            <Route path="add-menu" element={<AddMenu />} />
            <Route path="manage-menu" element={<MenuManagement />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
