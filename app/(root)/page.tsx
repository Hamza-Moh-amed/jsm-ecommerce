import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { BANNER_QUERY, PRODUCT_QUERY } from "@/sanity/lib/queries";
import { Product } from "@/sanity/types";

export default async function Home() {
  const products = await client.fetch(PRODUCT_QUERY);
  const bannerData = await client.fetch(BANNER_QUERY);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      {products.length > 0 && (
        <div className="products-container">
          {products.map((product: Product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}

      <div className="w-full flex">
        <div className="w-200px ml-20" />
        <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
        <div className="w-200px mr-20" />
      </div>
    </>
  );
}
