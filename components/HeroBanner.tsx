import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Banner } from "@/sanity/types";

const HeroBanner = ({ heroBanner }: { heroBanner: Banner }) => {
  const {
    buttonText,
    product,
    image,
    desc,
    smallText,
    midText,
    largeText1,
    largeText2,
    discount,
    saleTime,
  } = heroBanner;
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Image
          src={urlFor(image)}
          alt="headphone"
          width={450}
          height={450}
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${product}`}>
            <Button type="button">{buttonText}</Button>
          </Link>
        </div>

        <div className="desc">
          <h5>Description</h5>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
