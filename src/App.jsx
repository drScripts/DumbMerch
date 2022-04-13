import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddCategory,
  AddProduct,
  Auth,
  Cart,
  Category,
  Complain,
  DetailProduct,
  EditCategory,
  EditProduct,
  HomePage,
  Product,
  Profile,
  DetailTransaction,
  Checkout,
  EditProfile,
  ComplainAdmin,
} from "./pages";
import { Adminmiddleware, AuthMiddleware } from "./middleware";
import MainMiddleware from "./middleware/MainMiddleware";
import { setAuth } from "./services";
import { UserContext } from "./Context/UserContext";
import { API } from "./services";

if (localStorage.getItem("usrtbrirtkn")) {
  setAuth(localStorage.getItem("usrtbrirtkn"));
}

const App = () => {
  const [, dispatch] = useContext(UserContext);

  const getProfile = async () => {
    const { status, data } = await API.get("/user").catch((err) => {
      const responses = err.response;
      return {
        message: responses.data.message,
        status: responses.status,
      };
    });

    if (status === 200) {
      const { user } = data.data;
      dispatch({
        type: "USER_SUCCESS",
        payload: {
          user,
          token: localStorage.getItem("usrtbrirtkn"),
        },
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMiddleware />}>
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Auth loginPage={false} />} />
        </Route>
        <Route path="/" element={<AuthMiddleware />}>
          <Route index element={<HomePage />} />
          <Route path={"product/:id"} element={<DetailProduct />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"profile/edit"} element={<EditProfile />} />
          <Route path={"complain"} element={<Complain />} />
          <Route path={"cart"} element={<Cart />} />
          <Route path={"checkout"} element={<Checkout />} />
          <Route path={"transaction/:id"} element={<DetailTransaction />} />
        </Route>

        <Route path="/admin" element={<Adminmiddleware />}>
          <Route index element={<Category />} />
          <Route path={"category"} element={<Category />} />
          <Route path={"category/add"} element={<AddCategory />} />
          <Route path={"category/:id"} element={<EditCategory />} />
          <Route path={"product"} element={<Product />} />
          <Route path={"product/add"} element={<AddProduct />} />
          <Route path={"product/:id"} element={<EditProduct />} />
          <Route path={"complain"} element={<ComplainAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
