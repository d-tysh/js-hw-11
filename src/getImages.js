async function getImages(query, queryPage, queryPerPage) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '38136420-cef344aec407ce1d86600f9a2';

    const options = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: queryPage,
        per_page: queryPerPage
    })

    const response = await fetch(`${BASE_URL}?${options}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export {getImages};