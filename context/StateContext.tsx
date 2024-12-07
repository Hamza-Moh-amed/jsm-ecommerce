"use client";

import { useToast } from "@/hooks/use-toast";
import { Product } from "@/sanity/types";
import React, { createContext, useState, ReactNode } from "react";

interface ContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  totalQuantities: number;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
  increaseQuantity: () => void;
  decreseQuantity: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuantity: (id: string, action: "inc" | "dec") => void;
  onRemove: (product: Product) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const onAdd = (product: Product, quantity: number) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    const updatedCartItems = existingProduct
      ? cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cartItems, { ...product, quantity }];

    setCartItems(updatedCartItems);
    setTotalPrice((prev) => prev + product.price! * quantity);
    setTotalQuantities((prev) => prev + quantity);

    toast({
      title: "Cart Updated",
      description: `${product.name} added to cart. Total: $${totalPrice + product.price! * quantity}`,
    });
  };

  {
    /*const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price! * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
          : cartProduct
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast({
      title: "Cart Updated Sucessfully",
    });
  };*/
  }

  const toggleCartItemQuantity = (id: string, action: "inc" | "dec") => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                action === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );

    const item = cartItems.find((item) => item._id === id);
    if (!item) return;

    const priceChange = action === "inc" ? item.price : -item.price;
    setTotalPrice((prev) => prev + priceChange);
    setTotalQuantities((prev) => prev + (action === "inc" ? 1 : -1));
  };

  {
    /*const toggleCartItemQuantity = (id: string, value: string) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === "inc") {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: foundProduct.quantity + 1 };
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: foundProduct.quantity - 1 };
            }
            return item;
          })
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };*/
  }

  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    setCartItems(cartItems.filter((item) => item._id !== product._id));
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities((prev) => prev - foundProduct.quantity);
  };

  const increaseQuantity = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreseQuantity = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        qty,
        setQty,
        totalQuantities,
        setTotalQuantities,
        increaseQuantity,
        decreseQuantity,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const context = React.useContext(Context);
  if (!context)
    throw new Error("useStateContext must be used within a StateContext");
  return context;
};
