"use client";

import React from "react";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import Link from "next/link";
import Image from "next/image";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then(async (m) => {
      // additional prism syntaxes
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
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Equation,
          Modal,
          Pdf,
          Collection: () => null,
        }}
      />
    </div>
  );
}
