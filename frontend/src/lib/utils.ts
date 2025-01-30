import dotenv from "dotenv";

dotenv.config();

export const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
export const baseURL = process.env.BASE_URL || 'http://localhost:4321'