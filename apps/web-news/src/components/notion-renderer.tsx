"use client";

import React from "react";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

// Importar os estilos CSS do react-notion-x
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
// Importar nossos estilos customizados
import "@/styles/notion.css";

// Interface para as props do componente NotionImage
interface NotionImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Componente wrapper customizado para imagens do Notion
const NotionImage = ({ src, alt, className, style, ...props }: NotionImageProps) => {
  // Usar img tag nativa para evitar problemas com width/height obrigatórios do Next.js Image
   
  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      style={style}
      loading="lazy"
      {...props}
    />
  );
};

const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then(async (m) => {
      // Importar sintaxes adicionais do Prism
      await Promise.all([
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-markup-templating.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-markup.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-bash.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-c.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-cpp.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-csharp.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-docker.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-java.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-js-templates.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-coffeescript.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-diff.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-git.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-go.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-graphql.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-handlebars.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-less.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-makefile.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-markdown.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-objectivec.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-ocaml.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-python.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-reason.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-rust.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-sass.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-scss.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-solidity.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-sql.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-stylus.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-swift.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-wasm.js'),
        // @ts-expect-error ignore no prisma types
        import('prismjs/components/prism-yaml.js')
      ])
      return m.Code
    })
  )
  const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
  )
  const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    {
      ssr: false
    }
  )
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
      ssr: false
    }
  )

interface NotionContentProps {
  recordMap: ExtendedRecordMap;
}

export function NotionContent({ recordMap }: NotionContentProps) {
  const { theme } = useTheme();

  return (
    <div className="notion-content">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={theme === "dark"}
        showCollectionViewDropdown={false}
        linkTableTitleProperties={false}
        isLinkCollectionToUrlProperty={false}
        disableHeader={true}
        className="notion-renderer"
        previewImages={true}
        forceCustomImages={false}
        showTableOfContents={false}
        minTableOfContentsItems={0}
        components={{
          nextImage: NotionImage,
          nextLink: Link,
          Code,
          Equation,
          Modal,
          Pdf,
          Collection: () => null,
        }}
        mapPageUrl={(pageId) => {
          // Map any internal notion links to our own routing
          return `/${pageId}`;
        }}
        mapImageUrl={(url) => {
          // You can implement custom image URL mapping here if needed
          return url;
        }}
      />
    </div>
  );
}
