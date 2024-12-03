import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { image, _id, name, price, details } = product;
  return (
    <div>
      <Link href={`/product/${_id}`}>
        <div className="product-card">
          {image && (
            <Image
              src={urlFor(image && image[0])}
              alt="Product Image"
              width={250}
              height={250}
              className="product-image"
            />
          )}
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
