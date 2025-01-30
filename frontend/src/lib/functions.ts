import {
    baseURL
} from "./utils.ts";

export const fetchAllFromTable = async (tableName: string) => {
    try {

        const url = `${baseURL}/api/${tableName}`; ;
        console.log(url)// Use env variable for API base URL
        const response = await fetch(url, {

        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching songs:", error);
        return null; // Return null or handle error gracefully
    }
};