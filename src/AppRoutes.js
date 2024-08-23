import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home/HomePage';
import FoodPage from './components/pages/Food/FoodPage';
import CartPage from './components/pages/Cart/CartPage';
import LoginPage from './components/pages/Login/LoginPage';
import RegisterPage from './components/pages/Register/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import CheckoutPage from './components/pages/CheckOut/CheckoutPage';
import OrderTrack from './components/pages/OrderTrack/OrderTrack';
import PaymentPage from './components/pages/Payment/PaymentPage';
import ProfilePage from './components/pages/Profile/Profile';
import OrdersPage from './components/pages/Orders/OrdersPage';
import Dashboard from './components/pages/Dashboard/Dashboard';
import FoodsAdminPage from './components/pages/FoodsAdmin/FoodsAdminPage';
import AdminRoute from './components/AdminRoute/AdminRoute';
import FoodEditPage from './components/pages/FoodEdit/FoodEditPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      />
      <Route
        path="/track"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <AuthRoute>
            <OrderTrack />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />

      <Route
        path="/admin/foods"
        element={
          <AuthRoute>
            <FoodsAdminPage />
          </AuthRoute>
        }
      />

      <Route
        path="/admin/foods"
        element={
          <AuthRoute>
            <FoodsAdminPage />
          </AuthRoute>
        }
      />

      <Route
        path="/admin/addFood"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />

    </Routes>  
  );
}
