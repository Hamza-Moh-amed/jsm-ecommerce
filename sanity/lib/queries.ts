import { defineQuery } from "next-sanity";

export const PRODUCT_QUERY =
  defineQuery(`*[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
  _id, 
  image,
  name,
  slug,
  price,
  details,
}`);

export const PRODUCT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "product" && $slug == slug.current][0]{
  _id, 
  image,
  name,
  slug,
  price,
  details,
}`);

export const PRODUCT_BY_ID_QUERY =
  defineQuery(`*[_type == "product" && _id == $id][0]{
  _id, 
  image,
  name,
  slug,
  price,
  details,
}`);

export const BANNER_QUERY =
  defineQuery(`*[_type == "banner"] | order(_createdAt desc) {
    image,
    buttonText,
    product,
    desc,
    smallText,
    midText,
    largeText1,
    largeText2,
    discount,
    saleTime,
}`);
