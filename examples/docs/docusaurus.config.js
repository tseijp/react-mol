/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'react-mol',
  tagline: '🍡A molecular chemistry based simulation library',
  url: 'https://tseijp.github.io',
  baseUrl: '/react-mol/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'tseijp',
  projectName: 'react-mol',
  themeConfig: {
    prism: {theme: require('prism-react-renderer/themes/vsDark')},
    navbar: {
      title: '🍡react mol',
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Documents'},
        {to: '/examples/intro', label: 'Examples', position: 'left'},
        {
          href: 'https://github.com/tseijp/react-mol',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Pages',
          items: [
            {label: 'Docs', to: '/documents/intro'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/tseijp/react-mol'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'documents',
          routeBasePath: 'documents',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tseijp/react-mol/edit/master/examples/',
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'examples',
        path: 'examples',
        routeBasePath: 'examples',
      },
    ],
  ],
};
