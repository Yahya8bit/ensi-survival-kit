# Notes

## Search: local now, Algolia DocSearch later

The site currently uses `@easyops-cn/docusaurus-search-local` (configured in
`docusaurus.config.js`, under `themes`) — client-side search built at
build time from the static HTML, no external service, works offline in
dev. Indexes both English and French (`language: ["en", "fr"]`), since
most course content here is in French.

The site is public and deployed (Netlify: https://ensi-survival-kit.netlify.app/),
so it's eligible to apply for **Algolia DocSearch** — a free, hosted,
crawler-based search-as-you-type service for public documentation sites.
It's generally higher quality than the local plugin (typo tolerance, faster,
better relevance ranking) but requires applying and waiting for approval +
initial crawl setup, so it's not a same-day swap.

**To migrate later:**

1. Apply at <https://docsearch.algolia.com/apply> with the deployed site URL.
2. Once approved, Algolia sends back `appId`, `apiKey`, and `indexName`.
3. Remove the `@easyops-cn/docusaurus-search-local` entry from the `themes`
   array in `docusaurus.config.js` (and the package from `package.json`).
4. Add to the Docusaurus config's top-level object:

   ```js
   algolia: {
     appId: "YOUR_APP_ID",
     apiKey: "YOUR_SEARCH_API_KEY", // public search-only key, safe to commit
     indexName: "YOUR_INDEX_NAME",
   },
   ```

   (`themeConfig.algolia` in Docusaurus's classic preset — see
   <https://docusaurus.io/docs/search#connecting-algolia>.)

No other changes needed; DocSearch replaces the search UI automatically.
