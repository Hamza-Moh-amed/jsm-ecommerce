"use client";
import { useStateContext } from "@/context/StateContext";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  DeleteIcon,
  Minus,
  MinusIcon,
  Plus,
  PlusIcon,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  X,
} from "lucide-react";
import Link from "next/link";
import { Product } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
  } = useStateContext();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <Button
          type="button"
          className="cart-heading hover:bg-gray-100"
          onClick={() => setShowCart(false)}
        >
          <ArrowLeftIcon />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </Button>

        {cartItems.length < 1 && (
          <div className="empty-cart flex flex-col items-center justify-center">
            <ShoppingBag className="size-32" />
            <h3 className="mt-1">Your shopping bag is empty</h3>
            <Link href="/">
              <Button
                type="button"
                onClick={() => setShowCart(false)}
                className="bg-red-500 hover:bg-red-300 !text-white-100 mt-3 w-52"
              >
                Countinue Shopping
              </Button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item: Product, index: number) => (
              <div className="product" key={item._id}>
                {item.image && (
                  <Image
                    src={urlFor(item.image[0])}
                    alt="image"
                    width={400}
                    height={400}
                    className="rounded-[15px] bg-[#ebebeb]  w-40 h-40 cursor-pointer hover:bg-[rgb(248,210,211)] transition duration-300 ease-in-out"
                  />
                )}
                <div className="flex flex-col justify-start">
                  <div className="flex justify-between items-center gap-32">
                    <h1 className=" font-bold">{item.name}</h1>
                    <h1 className="text-[20px] font-normal ">${item.price}</h1>
                  </div>
                  <div className="flex gap-2 mt-20 justify-between items-center">
                    <div className="flex justify-center items-center gap-3 w-32 border-[1px] border-gray-500 p-[6px]">
                      <button
                        className=" pr-2 border-r-2 border-r-gray-400 cursor-pointer "
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <Minus className=" size-4" />
                      </button>
                      <span className=" text-lg]">{item.quantity}</span>
                      <button
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                        className="pl-2 border-l-gray-400 border-l-2 cursor-pointer"
                      >
                        <Plus className=" size-4  " />
                      </button>
                    </div>
                    <button type="button">
                      <X />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
