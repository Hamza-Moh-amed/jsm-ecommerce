import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Banner } from "@/sanity/types";

const FooterBanner = async ({ footerBanner }: { footerBanner: Banner }) => {
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
  } = footerBanner;
  const newLargeText1 = largeText1.slice(0, 11);

  return (
    <div className="py-[100px] px-[40px] bg-[#f02d34] rounded-[15px] relative h-[400px] leading-[1] text-white w-full mt-[120px]">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{newLargeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <Button type="button">{buttonText}</Button>
          </Link>
        </div>
        <Image
          src={urlFor(image!)}
          alt="headphone"
          width={450}
          height={450}
          className="absolute top-[-25%] left-[32%] "
        />
      </div>
    </div>
  );
};

export default FooterBanner;
