import dotenv from 'dotenv';

dotenv.config();

export const baseURL = process.env.BASE_URL || 'http://localhost:4321';
export const contentfulAccessToken = process.env.CONTENTFUL_TOKEN;
export const contentfulSpaceID = process.env.CONTENTFUL_SPACE_ID;
export const contentfulURL = 'https://cdn.contentful.com';
