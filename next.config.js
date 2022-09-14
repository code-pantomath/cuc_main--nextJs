/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },


  // webpack: (config) => {
  //   // this will override the experiments
  //   config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
  //   // this will just update topLevelAwait property of config.experiments
  //   // config.experiments.topLevelAwait = true 
  //   return config;
  // },



  images: {
    // limit of 25 deviceSizes values
    //deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
   // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    domains: ["images.unsplash.com"],
    // path prefix for Image Optimization API, useful with `loader`
    path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: 'default',
    // disable static imports for image files
    disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
    //formats: ['image/webp', "image/avif"],
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // the following are experimental features, and may cause breaking changes
  },



  rewrites: [
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "app.cheapudemy.com"
        }
      ],
      destination: "/app/:path*"
    }
  ],



  env: {
    WEBSITE_DOMAIN_NAME: "CheapUdemy.com",

    API_MAIN_SERVER_ENDPOINT_URL: "https://t8w1ywq447.execute-api.eu-central-1.amazonaws.com",
    // API_MAIN_SERVER_ENDPOINT_URL: "https://localhost:7052",

    SUPPORT_SERVER_WEB_SOCKET__ENDPOINT_URL: "https://cheapudemy-com--support-server.herokuapp.com",
    // SUPPORT_SERVER_WEB_SOCKET__ENDPOINT_URL: "http://127.0.0.1:40001",
  },
  
}


module.exports = nextConfig;
