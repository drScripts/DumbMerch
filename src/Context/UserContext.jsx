import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { setAuth } from "../services";
import { API } from "../services";

export const UserContext = createContext();

const initialState = {
  user: {},
  isLogin: false,
  cartCount: 0,
  token: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "USER_SUCCESS_LOGIN":
      localStorage.setItem("usrtbrirtkn", payload?.token);
      setAuth(payload?.token);
      return {
        ...state,
        user: payload?.user,
        isLogin: true,
        token: payload?.token,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: payload?.user,
      };
    case "USER_LOGOUT":
      localStorage.removeItem("usrtbrirtkn");
      return {
        ...state,
        user: {},
        isLogin: false,
        token: null,
      };

    case "UPDATE_CART_COUNT":
      let count = 0;
      payload?.carts?.forEach((cart, index) => (count += cart.qty));
      if (count > 9) {
        count = "+9";
      }
      return {
        ...state,
        cartCount: count,
      };
    case "USER_ERROR":
      toast.error(payload?.message);
      break;
    case "CART_ADD":
      return {
        ...state,
        cartCount: state.cartCount + 1,
      };
    case "CART_RESET":
      return {
        ...state,
        cartCount: 0,
      };
    default:
      break;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUserCart = async () => {
      const { data, status } = await API.get("/carts").catch((err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      });
      if (status === 200) {
        dispatch({
          type: "UPDATE_CART_COUNT",
          payload: { carts: data?.data?.carts },
        });
      }
    };

    if (state?.user?.role === "user") {
      getUserCart();
    }
  }, [state.user]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
