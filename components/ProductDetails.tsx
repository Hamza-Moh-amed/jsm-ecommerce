"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Minus, Plus, Star } from "lucide-react";
import { useStateContext } from "@/context/StateContext";
import { Product } from "@/sanity/types";

const ProductDetails = ({ product }: { product: Product }) => {
  const { image, name, details, price } = product;
  const [indexState, setIndexState] = useState(0);
  const { decreseQuantity, increaseQuantity, qty, onAdd } = useStateContext();
  return (
    <div className="flex gap-40 mt-16 m-40 text-[#324d67]">
      <div>
        <div className="image-container">
          {image && (
            <Image
              src={urlFor(image[indexState])}
              alt="product image"
              width={400}
              height={400}
              className="product-detail-image"
            />
          )}
        </div>
        <div className="flex gap-[10px] mt-[20px]">
          {image?.map((item: any, index: number) => (
            <img
              key={index}
              src={urlFor(item)}
              alt="product images"
              className={
                index === indexState
                  ? "small-image selected-image"
                  : "small-image"
              }
              onMouseEnter={() => setIndexState(index)}
            />
          ))}
        </div>
      </div>

      <div className="">
        <h1 className="mt-10 font-bold">{name}</h1>
        <div className="text-[#f02d34] mt-[10px] flex gap-[5px] items-center">
          <div className="flex gap-2">
            <Star className="size-5 text-red-500 fill-red-400" />
            <Star className="size-5 text-red-500 fill-red-400" />
            <Star className="size-5 text-red-500 fill-red-400" />
            <Star className="size-5 text-red-500 fill-red-400" />
            <Star className="size-5 text-red-500" />
          </div>
          <p className="text-[#324d67]">(20)</p>
        </div>
        <h4 className="mt-[10px] font-bold">Details: </h4>
        <p className="mt-1">{details}</p>
        <p className="text-[26px] font-normal mt-[30px] text-[#f02d34]">
          ${price}
        </p>
        <div className="flex gap-2 mt-[10px] items-center">
          <h3>Quantity:</h3>
          <p className="flex justify-center items-center gap-3 w-32 border-[1px] border-gray-500 p-[6px]">
            <span
              className=" pr-2 border-r-2 border-r-gray-400 cursor-pointer "
              onClick={decreseQuantity}
            >
              <Minus className=" size-4" />
            </span>
            <span className=" text-lg]">{qty}</span>
            <span
              className="pl-2 border-l-gray-400 border-l-2 cursor-pointer"
              onClick={increaseQuantity}
            >
              <Plus className=" size-4  " />
            </span>
          </p>
        </div>
        <div className="flex gap-[30px]">
          <button
            onClick={() => onAdd(product, qty)}
            type="button"
            className="py-2.5 px-5 border-[1px] border-[#f02d34] mt-10 text-base font-medium bg-white text-[#f02d34] cursor-pointer w-[200px] transform transition-transform duration-500 ease-in-out scale-110 "
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="w-48 px-5 py-2.5 bg-[#f02d34] text-white border-none mt-10 text-lg font-medium cursor-pointer transform scale-100 transition-transform duration-500 ease-in-out hover:scale-110"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
