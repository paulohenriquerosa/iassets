export const criticalCss = `
/* Critical CSS extracted manually for above-the-fold */
:root {
  --radius: 0.75rem;
  --background: #fafafa;
  --foreground: #0a0a0a;
}
body {
  background: var(--background);
  color: var(--foreground);
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  letter-spacing: -0.01em;
  margin: 0;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background: #020617;
    --foreground: #f8fafc;
  }
}
`; 