// lib/notion.ts
import { Client } from "@notionhq/client";
import { type ExtendedRecordMap } from "notion-types";
import { NotionCompatAPI } from "notion-compat";
import { unstable_cache } from "next/cache";

import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const notionCompat = new NotionCompatAPI(
  new Client({ auth: process.env.NOTION_TOKEN }),
);

export type Post = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  status: string;
  published: boolean;
  date: string;
  createdTime: string;
  category: string;
  tags: string[];
  author: { name: string; avatar: string };
  coverImage?: string;
};

type NotionQueryResult =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse;

// Type guards
function isFullPage(page: NotionQueryResult): page is PageObjectResponse {
  return page.object === "page" && "properties" in page;
}

type NotionProperty = {
  type: string;
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  select?: { name: string };
  multi_select?: Array<{ name: string }>;
  date?: { start: string };
  created_time?: string;
  checkbox?: boolean;
  people?: Array<{ name: string; avatar_url: string }>;
  [key: string]: unknown;
};

function extractProperty(
  prop: NotionProperty,
): string | string[] | boolean | { name: string; avatar: string } {
  switch (prop.type) {
    case "title":
      return prop.title?.map((p) => p.plain_text).join("") || "";
    case "rich_text":
      return prop.rich_text?.map((r) => r.plain_text).join("") || "";
    case "select":
      return prop.select?.name || "";
    case "multi_select":
      return prop.multi_select?.map((m) => m.name) || [];
    case "date":
      return prop.date?.start || "";
    case "created_time":
      return prop.created_time || "";
    case "checkbox":
      return prop.checkbox || false;
    case "people":
      return {
        name: prop.people?.[0]?.name || "",
        avatar: prop.people?.[0]?.avatar_url || "",
      };
    default:
      return "";
  }
}

// Helper to ensure tags contain only ASCII-safe characters.
const sanitizeTag = (tag: string): string =>
  tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9-_]/g, "-") // Replace any non-allowed chars with '-'
    .replace(/-+/g, "-") // Collapse consecutive dashes
    .replace(/^-+|-+$/g, "");

export async function getAllPosts(): Promise<Post[]> {
  return unstable_cache(
    async () => {
      const databaseId = process.env.NOTION_DATABASE_ID!;
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "Status",
          status: { equals: "Published" },
        },
        sorts: [{ property: "Date", direction: "descending" }],
      });
      return response.results.filter(isFullPage).map((page) => {
        // Extrai cover externo ou interno
        let coverImage: string | undefined;
        if (page.cover) {
          if (page.cover.type === "external") {
            coverImage = page.cover.external.url;
          } else if (page.cover.type === "file") {
            coverImage = page.cover.file.url;
          }
        }

        return {
          id: page.id,
          slug: extractProperty(
            page.properties["Slug"] as NotionProperty,
          ) as string,
          title: extractProperty(
            page.properties["Title"] as NotionProperty,
          ) as string,
          summary: extractProperty(
            page.properties["Summary"] as NotionProperty,
          ) as string,
          status: extractProperty(
            page.properties["Status"] as NotionProperty,
          ) as string,
          published: extractProperty(
            page.properties["Published"] as NotionProperty,
          ) as boolean,
          date: extractProperty(
            page.properties["Date"] as NotionProperty,
          ) as string,
          createdTime: extractProperty(
            page.properties["Created time"] as NotionProperty,
          ) as string,
          category: extractProperty(
            page.properties["Category"] as NotionProperty,
          ) as string,
          tags: extractProperty(
            page.properties["Tags"] as NotionProperty,
          ) as string[],
          author: extractProperty(
            page.properties["Author"] as NotionProperty,
          ) as { name: string; avatar: string },
          coverImage,
        };
      });
    },
    ["posts", "blog", "notion-posts"],
    {
      revalidate: 3600, // Revalidar a cada 1 hora
      tags: ["posts", "blog", "notion-posts"],
    },
  )();
}

export async function getPostBySlug(
  slug: string,
): Promise<Post & { content: ExtendedRecordMap }> {
  return unstable_cache(
    async () => {
      const databaseId = process.env.NOTION_DATABASE_ID!;
      const dbQuery = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "Slug",
          rich_text: { equals: slug },
        },
      });

      if (!dbQuery.results.length) {
        throw new Error(`Post not found for slug: ${slug}`);
      }

      const page = dbQuery.results[0];

      if (!isFullPage(page)) {
        throw new Error("Invalid page response");
      }

      const content = await notionCompat.getPage(page.id);

      // Mesma extração de cover
      let coverImage: string | undefined;
      if (page.cover) {
        if (page.cover.type === "external")
          coverImage = page.cover.external.url;
        else if (page.cover.type === "file") coverImage = page.cover.file.url;
      }

      return {
        id: page.id,
        slug,
        title: extractProperty(
          page.properties["Title"] as NotionProperty,
        ) as string,
        summary: extractProperty(
          page.properties["Summary"] as NotionProperty,
        ) as string,
        status: extractProperty(
          page.properties["Status"] as NotionProperty,
        ) as string,
        published: extractProperty(
          page.properties["Published"] as NotionProperty,
        ) as boolean,
        date: extractProperty(
          page.properties["Date"] as NotionProperty,
        ) as string,
        createdTime: extractProperty(
          page.properties["Created time"] as NotionProperty,
        ) as string,
        category: extractProperty(
          page.properties["Category"] as NotionProperty,
        ) as string,
        tags: extractProperty(
          page.properties["Tags"] as NotionProperty,
        ) as string[],
        author: extractProperty(
          page.properties["Author"] as NotionProperty,
        ) as { name: string; avatar: string },
        coverImage,
        content,
      };
    },
    [`post-${sanitizeTag(slug)}`, "posts", "blog"],
    {
      revalidate: 3600, // Revalidar a cada 1 hora
      tags: [`post-${sanitizeTag(slug)}`, "posts", "blog"],
    },
  )();
}

// Nova função para buscar todas as categorias únicas
export async function getAllCategories(): Promise<string[]> {
  return unstable_cache(
    async () => {
      const databaseId = process.env.NOTION_DATABASE_ID!;
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "Status",
          status: { equals: "Published" },
        },
      });

      const categories = new Set<string>();

      response.results.filter(isFullPage).forEach((page) => {
        const category = extractProperty(
          page.properties["Category"] as NotionProperty,
        ) as string;

        if (category && category.trim() !== "") {
          categories.add(category);
        }
      });

      return Array.from(categories).sort();
    },
    ["categories", "notion-categories"],
    {
      revalidate: 3600, // Revalidar a cada 1 hora
      tags: ["categories", "notion-categories"],
    },
  )();
}

// Nova função para buscar posts por categoria
export async function getPostsByCategory(
  category: string,
  limit?: number,
): Promise<Post[]> {
  return unstable_cache(
    async () => {
      const databaseId = process.env.NOTION_DATABASE_ID!;
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "Status",
              status: { equals: "Published" },
            },
            {
              property: "Category",
              select: { equals: category },
            },
          ],
        },
        sorts: [{ property: "Date", direction: "descending" }],
        page_size: limit || 100,
      });

      return response.results.filter(isFullPage).map((page) => {
        // Extrai cover externo ou interno
        let coverImage: string | undefined;
        if (page.cover) {
          if (page.cover.type === "external") {
            coverImage = page.cover.external.url;
          } else if (page.cover.type === "file") {
            coverImage = page.cover.file.url;
          }
        }

        return {
          id: page.id,
          slug: extractProperty(
            page.properties["Slug"] as NotionProperty,
          ) as string,
          title: extractProperty(
            page.properties["Title"] as NotionProperty,
          ) as string,
          summary: extractProperty(
            page.properties["Summary"] as NotionProperty,
          ) as string,
          status: extractProperty(
            page.properties["Status"] as NotionProperty,
          ) as string,
          published: extractProperty(
            page.properties["Published"] as NotionProperty,
          ) as boolean,
          date: extractProperty(
            page.properties["Date"] as NotionProperty,
          ) as string,
          createdTime: extractProperty(
            page.properties["Created time"] as NotionProperty,
          ) as string,
          category: extractProperty(
            page.properties["Category"] as NotionProperty,
          ) as string,
          tags: extractProperty(
            page.properties["Tags"] as NotionProperty,
          ) as string[],
          author: extractProperty(
            page.properties["Author"] as NotionProperty,
          ) as { name: string; avatar: string },
          coverImage,
        };
      });
    },
    [`posts-category-${sanitizeTag(category)}`, "posts", "blog"],
    {
      revalidate: 3600, // Revalidar a cada 1 hora
      tags: [`posts-category-${sanitizeTag(category)}`, "posts", "blog"],
    },
  )();
}
