
import { fetchCountries } from './helpers/api';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const searchCountryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

 searchCountryInput.addEventListener('input', debounce(onShowCountryList, DEBOUNCE_DELAY));


function onShowCountryList() {
   
    const searchCountryName = searchCountryInput.value.trim();

          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
       
    if (searchCountryName) {
        fetchCountries(searchCountryName)
        .then(onRequest)
        .catch(error => {
             Notify.failure("Oops, there is no country with that name");
            console.log(error);
    } );
    }
}

function onRequest(data) {

    if (data.length > 10) {
       Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }
    onShowCountry(data);
}

function onShowCountry(data) {
   
     
    const newCountryName = data
        .map(({ name: { official }, flags: { svg } }) =>
            `<li class="country-name'">
                    <img src="${svg}" alt="${official}" width = '30px'>
                    ${official}
                </li>`)
        .join('');
        
    countryList.innerHTML = newCountryName;
    countryList.classList.remove('new-size');
    countryInfo.innerHTML = '';

  
        
    if (data.length === 1) {
        const newCountryInfo = data.map((data) =>
            ` <p>
          <span class="country-data">Capital:</span>
           ${data.capital}
        </p>
        <p>
            <span class="country-data">Population:</span>
             ${data.population}
        </p>
        <p>
            <span class="country-data">Languages:</span>
            ${Object.values(data.languages)}
        </p>`
        ).join('');
        
        countryInfo.innerHTML = newCountryInfo;
        countryList.classList.add('new-size');
    
    }
}
   






