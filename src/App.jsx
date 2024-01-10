import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import WishListMain from "./pages/WishListMain";
import BlogMain from "./pages/BlogMain";
import Productdetail from "./pages/Productdetail";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AOS from "aos";
import "aos/dist/aos.css";
import NotFound from "./pages/NotFound";
import Categorylist from "./pages/Categorylist";
import Sale from "./pages/Sale";
// import PaymentSuccess from "./pages/PaymentSuccess";
import Pay from "./pages/Pay";
import PaymentSuccess from "./pages/PaymentSuccess";
import Cart from "./pages/Cart";
import { Provider } from "react-redux"; // Import Provider từ react-redux
import store from "../src/redux/store";
import Addmin from "./addmin/Addmin";
import CheckOrder from "./pages/CheckOrder";
import Order from "./pages/Order";
import AccountWishlist from "./pages/AccountWishlist";
import AccountDetails from "./pages/AccountDetails";
import LayoutAdmin from "./addmin/LayoutAdmin";
import StatisticalAdmin from "./addmin/StatisticalAdmin";
import CustomerManagement from "./addmin/CustomerManagement";
import AccountInformation from "./addmin/AccountInformation";
import AddProductAdmin from "./addmin/AddProductAdmin";
import EditProductAddmin from "./pages/EditProductAddmin";
import AdminBlog from "./addmin/AdminBlog";
import AdminEditBlog from "./addmin/AdminEditBlog";
import AdminEditUser from "./addmin/AdminEditUser";

AOS.init();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pay" element={<Pay />} />
            <Route path="wishlist" element={<WishListMain />} />
            <Route path="products" element={<Products />} />
            <Route path="/product-detail/:id" element={<Productdetail />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/categorylist" element={<Categorylist />} />
            <Route path="/categorylist/:id" element={<Productdetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogMain />} />
            {/* <Route path="admin-list-blog/id" element={<BlogMain />} /> */}
            <Route path="contactus" element={<ContactUs />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="" element={<ContactUs />} />
            <Route path="sales" element={<Sale />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
            <Route path="wishlistnull" element={<AccountWishlist />} />
            <Route path="account-detail" element={<AccountDetails />} />
            <Route path="/checkorder" element={<CheckOrder />} />
            <Route path="*" element={<NotFound />} />
            <Route />
          </Route>
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/statis" element={<StatisticalAdmin />} />
            <Route path="/addmin" element={<Addmin />} />
            <Route
              path="/CustomerManagement"
              element={<CustomerManagement />}
            />
            <Route path="/admin-edit-use" element={<AdminEditUser />} />
            <Route path="/add-product-ddmin" element={<AddProductAdmin />} />
            <Route path="/admin-list-blog" element={<AdminBlog />} />
            <Route path="admin-list-blog/:id" element={<BlogMain />} />
            <Route path="/editadmin/:id" element={<EditProductAddmin />} />
            <Route path="/edit-blog-admin/:id" element={<AdminEditBlog />} />
            <Route path="/info-account" element={<AccountInformation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
