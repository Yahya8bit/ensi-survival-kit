// @ts-check

const { themes: prismThemes } = require("prism-react-renderer");

const config = async () => {
  const { default: math } = await import("remark-math");
  const { default: katex } = await import("rehype-katex");

  /** @type {import('@docusaurus/types').Config} */
  return {
    markdown: {
      mermaid: true,
      hooks: {
        onBrokenMarkdownLinks: "warn",
      },
    },
    themes: [
      "@docusaurus/theme-mermaid",
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        ({
          hashed: true,
          language: ["en", "fr"],
          highlightSearchTermsOnTargetPage: true,
        }),
      ],
    ],
    title: "ENSI Survival Kit",
    tagline:
      "A Guide on how to survive your studies at ENSI. You will find tips, references, projects & cheat sheets.",
    url: "https://Yahya8bit.github.io",
    baseUrl: process.env.BASE_URL ?? "/",
    onBrokenLinks: "throw",
    favicon: "img/favicon.ico",
    organizationName: "Yahya8bit",
    projectName: "ensi-survival-kit",

    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },

    plugins: [
      async function myPlugin(context, options) {
        return {
          name: "docusaurus-tailwindcss",
          configurePostCss(postcssOptions) {
            // Appends TailwindCSS and AutoPrefixer.
            postcssOptions.plugins.push(require("tailwindcss"));
            postcssOptions.plugins.push(require("autoprefixer"));
            return postcssOptions;
          },
        };
      },
    ],

    stylesheets: [
      {
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap",
        type: "text/css",
      },
      {
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css",
        type: "text/css",
        integrity:
          "sha384-nH0MfJ44wi1dd7w6jinlyBgljjS8EJAh2JBoRad8a3VDw2K69vfaaqm4WnR+gXtA",
        crossorigin: "anonymous",
      },
    ],

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        {
          sitemap: {
            changefreq: "weekly",
            priority: 0.5,
            filename: "sitemap.xml",
          },
          docs: {
            // DEBT use docusaurus native mermaid supposrt
            remarkPlugins: [math],
            rehypePlugins: [katex],
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl:
              "https://github.com/Yahya8bit/ensi-survival-kit/edit/master",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        mermaid: {
          // Real per-mode colors are applied in the swizzled
          // src/theme/Mermaid component (mermaid.options.themeVariables is
          // a single object shared across light/dark, and mermaid parses
          // colors synchronously so CSS var() strings aren't usable here).
          theme: { light: "base", dark: "base" },
        },
        navbar: {
          title: "ENSI Knowledge",
          logo: {
            alt: "ENSI Knowledge",
            src: "img/logo.svg",
            srcDark: "img/logo-dark.svg",
          },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Explorer les cours",
            },
            {
              href: "https://github.com/Yahya8bit/ensi-survival-kit",
              label: "GitHub",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Étudier",
              items: [
                {
                  label: "Commencer ici",
                  to: "/docs/intro",
                },
              ],
            },
            {
              title: "Projet",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/Yahya8bit/ensi-survival-kit",
                },
              ],
            },
          ],
          copyright: `ENSI Knowledge · Contenu communautaire · GPL v3.0`,
        },
        prism: {
          theme: prismThemes.oneLight,
          darkTheme: prismThemes.oneDark,
          additionalLanguages: [
            "bash",
            "csharp",
            "java",
            "cshtml",
            "prolog",
            "hcl",
          ],
        },
      }),
  };
};

module.exports = config;
