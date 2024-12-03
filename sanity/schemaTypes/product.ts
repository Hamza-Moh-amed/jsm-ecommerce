import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "image",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "price",
      type: "number",
    }),
    defineField({
      name: "details",
      type: "text",
    }),
  ],
});
