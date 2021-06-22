import axios from "axios";
import { useEffect, useState } from "react";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const response = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          response.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(response.data?.cart);
        } catch (error) {
          alert(error.response.data?.msg);
        }
      };
      getUser();
    }
  }, [token]);


  const addCart = async (product) => {
    if (!isLogged)
      return alert("Please login or register to continue buying it !");
    const checkItemHasCart = cart.every((item) => {
      return item._id !== product._id;
    });

    if (checkItemHasCart) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("This product has been added ! Check cart");
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history,setHistory]
  };
}

export default UserAPI;
