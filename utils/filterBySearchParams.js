export default function filterBySearchParams(data, searchParams) {
    const { continent, country, is_open_to_public } = searchParams;
    if (continent) {
        data = data.filter(item => item.continent.toLowerCase() === continent.toLowerCase());
    }
    if (country) {
        data = data.filter(item => item.country.toLowerCase() === country.toLowerCase());
    }
    if (is_open_to_public) {
        data = data.filter(item => item.is_open_to_public === JSON.parse(is_open_to_public.toLowerCase()));
    }
    return data;
}