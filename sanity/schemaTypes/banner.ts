import { defineField, defineType } from "sanity";

export const banner = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "buttonText",
      type: "string",
    }),
    defineField({
      name: "product",
      type: "string",
    }),
    defineField({
      name: "dec",
      type: "string",
    }),
    defineField({
      name: "smallText",
      type: "string",
    }),
    defineField({
      name: "midText",
      type: "string",
    }),
    defineField({
      name: "largeText1",
      type: "string",
    }),
    defineField({
      name: "largeText2",
      type: "string",
    }),
    defineField({
      name: "discount",
      type: "string",
    }),
    defineField({
      name: "saleTime",
      type: "string",
    }),
  ],
});
