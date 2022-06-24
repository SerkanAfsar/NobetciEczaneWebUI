import axios from "axios";
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
});

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    httpsAgent: agent,
});