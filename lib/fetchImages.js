export default async function fetchImages(url) {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization:process.env.PEXELS
            },
            cache: "no-store" // Disable caching
        });
        if (!res.ok) {
            throw new Error("Fetching Error!\n");
        }

        const images = await res.json();
        return images;
    } catch (error) {
        console.error(error);
    }
}
