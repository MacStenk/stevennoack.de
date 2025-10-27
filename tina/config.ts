import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || 
               process.env.VERCEL_GIT_COMMIT_REF || 
               process.env.HEAD || 
               "main";

export default defineConfig({
  branch,
  
  // ⚠️ Client ID hier DIREKT eintragen (nicht als ENV)!
  clientId: "04361101-fd41-451a-9582-8ea748c53ccd",
  
  // ⚠️ Token bleibt als ENV (SECRET!)
  token: process.env.TINA_TOKEN,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "posts",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",  // ⚠️ String, nicht datetime!
            name: "pubDate",
            label: "Published Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});