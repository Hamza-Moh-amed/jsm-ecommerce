"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Store</Link>
      </p>
      <Button
        type="button"
        className=" !bg-white"
        onClick={() => setShowCart(true)}
      >
        <ShoppingBag />

        <span className="cart-item-qty">{totalQuantities}</span>
      </Button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
