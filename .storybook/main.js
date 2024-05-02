const config = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: [
    '@storybook/addon-console',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  docs: {
    autodocs: 'tag',
  },
  open: false,
};

export default config;