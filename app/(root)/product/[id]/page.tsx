import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_ID_QUERY, PRODUCT_QUERY } from "@/sanity/lib/queries";
import { Product } from "@/sanity/types";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const product = await client.fetch(PRODUCT_BY_ID_QUERY, { id });
  const products = await client.fetch(PRODUCT_QUERY);

  console.log(product);
  console.log(products);
  return (
    <div>
      <ProductDetails product={product} />
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item: Product) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
