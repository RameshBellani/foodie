import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AddAddress from '../pages/AddAddress';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import AdminOrdersPage from '../pages/Admin'; 
import AdminMenuPage from '../pages/AdminMenuPage'; 
import CreateMenuItem from '../pages/CreateMenuItem'; 
import UpdateMenuItem from '../pages/UpdateMenuItem'; 
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/address/new"
        element={
          <ProtectedRoute>
            <AddAddress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      {/* Admin Routes */}
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute isAdminRoute>
            <AdminOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/menu"
        element={
          <ProtectedRoute isAdminRoute>
            <AdminMenuPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/menu/create"
        element={
          <ProtectedRoute isAdminRoute>
            <CreateMenuItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/menu/:id/edit"
        element={
          <ProtectedRoute isAdminRoute>
            <UpdateMenuItem />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
