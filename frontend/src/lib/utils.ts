import dotenv from 'dotenv';

dotenv.config();

export const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
export const baseURL = process.env.BASE_URL || 'http://localhost:4321';
export const contentfulURL = 'https://cdn.contentful.com';
export const contentfulSpaceID = process.env.CONTENTFUL_SPACE_ID;
export const contentfulAccessToken = process.env.CONTENTFUL_TOKEN;
