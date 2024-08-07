let countries;
fetchCountries().then((json) => {
    countries = json;
    console.log(countries)
});

async function fetchCountries() {
    const response = await fetch('includes/country_names.json');
    const json = await response.json();
    return json;
}