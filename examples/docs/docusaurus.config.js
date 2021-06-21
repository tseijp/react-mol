/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'react-mol',
  tagline: 'react-mol are cool',
  url: 'https://tseijp.github.io',
  baseUrl: '/react-mol/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'tseijp',
  projectName: 'react-mol',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      title: '🍡react mol',
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Docs'},
        ...[
            'Basic',
            'Cannon',
            'Catan',
            'Flow',
            'Mol',
            'Spring',
            'Trail'
        ].map(label => ({to: '#'+label, label, position: 'left'})),
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
            {label: 'Docs', to: '/docs/intro'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/react-mol'},
            {label: 'Twitter', href: 'https://twitter.com/tseijp'},
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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tseijp/react-mol/edit/master/examples/',
        },
      },
    ],
  ],
};
