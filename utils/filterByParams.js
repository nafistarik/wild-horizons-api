export default function filterByParams(data, key, params) {
    return data.filter(item => {
        return item[key].toLowerCase() === params.toLowerCase()
    })
}