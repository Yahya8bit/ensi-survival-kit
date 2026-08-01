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
          language: ["en"],
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
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
        type: "text/css",
        integrity:
          "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
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
          title: "Home",
          logo: {
            alt: "My Site Logo",
            src: "img/logo.svg",
            srcDark: "img/logo-dark.svg",
          },
          items: [
            {
              type: "doc",
              docId: "intro",
              position: "left",
              label: "Docs",
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
              title: "Docs",
              items: [
                {
                  label: "Tutorial",
                  to: "/docs/intro",
                },
              ],
            },
            {
              title: "More",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/Yahya8bit/ensi-survival-kit",
                },
              ],
            },
          ],
          copyright: `Licensed under GPL v3.0`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.vsDark,
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
