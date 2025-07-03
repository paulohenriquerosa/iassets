module.exports = {
  ci: {
    collect: {
      // Start the Next.js production server before collecting
      startServerCommand: "npm run start",
      startServerReadyPattern: "started server on",
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/sobre",
        "http://localhost:3000/contato",
        "http://localhost:3000/categorias",
      ],
      numberOfRuns: 3,
      settings: { chromeFlags: "--no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "categories:accessibility": ["warn", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}; 