
export function fetchCountries(name) {

    const MAIN_URL= 'https://restcountries.com/v3.1/name';
    const fields = `name,capital,population,flags,languages`;
    return fetch(`${MAIN_URL}/${name}?fields=${fields}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json();
        })
}