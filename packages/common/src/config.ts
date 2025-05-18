import dotenv from 'dotenv';

dotenv.config({
    path: '../../../.env'
});

export const backendURL = process.env.BACKEND_URL;

export const wsURL = process.env.NEXT_PUBLIC_WS_URL;