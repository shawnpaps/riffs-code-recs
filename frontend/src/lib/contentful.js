// Ensure baseURL is always a valid URL
const getBaseURL = () => {
	const envURL = process.env.BASE_URL || process.env.SITE;
	if (envURL && envURL !== 'undefined') {
		console.log('envURL:', envURL);
		return envURL;
	}
	return 'http://localhost:4321';
};

export const baseURL = getBaseURL();
export const contentfulAccessToken = process.env.CONTENTFUL_TOKEN;
export const contentfulSpaceID = process.env.CONTENTFUL_SPACE_ID;
export const contentfulURL = 'https://cdn.contentful.com';
