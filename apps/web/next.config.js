/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false
};

import dotenv from 'dotenv';

dotenv.config({
    path:"../../.env"
})

export default nextConfig;
