const withVideos = require('next-videos'); // Habilitar import de vídeos; https://www.npmjs.com/package/next-videos

module.exports = withVideos(
    {
        swcMinify: true, // Habilitar minify em produção: https://nextjs.org/docs/advanced-features/compiler

        images: {
            domains: ['localhost', 'anheu.azurewebsites.net'], // Permitir imagens dos domínios;
        },
    }
)