/********** All the Dom Selectors **********/

const countryButton = document.querySelector('#country');
const displayRecords = document.querySelector('#displayRecords');
const inputCode = document.querySelector('.inputCode');
const searchButton = document.querySelector('.search');
const displaySingleCountry = document.querySelector('#singleCountryDetails');
const TableVisibility = document.querySelector('table');
TableVisibility.style.display = "none";





/********** All the Events handler functions **********/

const fetchAllData = () => {
    axios('https://countriesnode.herokuapp.com/v1/countries')
        .then(response => {
            TableVisibility.style.display = "block";
            displaySingleCountry.style.display = "none";
            response.data.forEach(element => {
                let row = displayRecords.insertRow(-1);
                let countries = row.insertCell(0);
                let native = row.insertCell(1);
                let language = row.insertCell(2);
                let continent = row.insertCell(3);
                countries.innerHTML = element.name;
                native.innerHTML = element.native;
                let str = '';
                if (element.languages) {
                    element.languages.forEach(elements => str += elements + ' ');
                }
                language.innerHTML = str;
                continent.innerHTML = element.continent;
            });
        })
        .catch(() => console.log('please check url'));
}




const searchByCode = () => {
    url = 'https://countriesnode.herokuapp.com/v1/countries/' + inputCode.value.trim().toUpperCase();
    console.log(url);
    axios.get(url)
        .then(response => {
            TableVisibility.style.display = "none";
            displaySingleCountry.style.display = "block";
            displaySingleCountry.innerHTML = '<div class="card mt-5 bg-info text-white" style="width: 20rem;"><div class="card-header"><h5 class=" text-center"><strong> ' + response.data.name + '</strong></h5></div><div class="card-body"><p class="card-text"><p><strong class="mr-auto">Native : </strong>' + response.data.native + '</p><p class="card-text"><p><strong>Phone Code : </strong>' + response.data.phone + '</p><p class="card-text"><p><strong>Capital : </strong>' + response.data.capital + '</p><p class="card-text"><p><strong>Continent : </strong>' + response.data.continent + '</p><p class="card-text"><p><strong>Currency : </strong>' + response.data.currency + '</p></div></div>';
        })
}



/***********Handles all the Events*************/

countryButton.addEventListener('click', fetchAllData);
searchButton.addEventListener('click', searchByCode);