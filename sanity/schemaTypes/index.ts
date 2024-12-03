import { type SchemaTypeDefinition } from "sanity";
import { banner } from "./banner";
import { product } from "./product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, banner],
};
