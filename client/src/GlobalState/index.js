import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ProductAPI from "../api/ProductAPI";
import UserAPI from "../api/UserAPI";
import CategoriesAPI from "../api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const response = await axios.get("/user/refresh_token");
        setToken(response.data.accesstoken);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken(); 
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
