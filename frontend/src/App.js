import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/product/ProductScreen";
import CartScreen from "./screens/order/CartScreen";
import ProfileScreen from "./screens/users/ProfileScreen";
import ShippingScreen from "./screens/order/ShippingScreen";
import PaymentScreen from "./screens/order/PaymentScreen";
import PlaceOrderScreen from "./screens/order/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/order/OrderDetailsScreen";
import UserListScreen from "./screens/users/adminView/UserListScreen";
import EditUserScreen from "./screens/users/adminView/EditUserScreen";
import ProductsListScreen from "./screens/users/adminView/ProductsListScreen";
import EditProductScreen from "./screens/users/adminView/EditProductScreen";
import CreateProductScreen from "./screens/users/adminView/CreateProductScreen";
import OrderListScreen from "./screens/users/adminView/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* auth */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            {/* orders */}
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:orderId" element={<OrderDetailsScreen />} />

            {/* products */}
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:productId?" element={<CartScreen />} />

            {/* admin */}
            <Route path="admin/users/" element={<UserListScreen />} />
            <Route path="admin/user/:id/edit" element={<EditUserScreen />} />
            <Route
              path="/admin/productList/"
              element={<ProductsListScreen />}
            />
            <Route
              path="/admin/product/create"
              element={<CreateProductScreen />}
            />
            <Route
              path="/admin/product/:id/edit"
              element={<EditProductScreen />}
            />
            <Route path="admin/orderList/" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
