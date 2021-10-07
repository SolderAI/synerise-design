

module.exports = {
    addons:[
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        // '@storybook/addon-docs',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null,
            },
        },
        '@storybook/addon-knobs',
        // '@storybook/addon-controls',
        '@storybook/addon-links',
        '@storybook/addon-backgrounds',
    ],
    // stories:['../stories/**/*.stories.tsx','../stories/**/*.mdx']
    stories:['../stories/**/*.stories.@(tsx|mdx)']
}