export const fetchAllSongs = async () => {
    try {
        const url = `${import.meta.env.BASE_URL}/api/songs`; // Use env variable for API base URL
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
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