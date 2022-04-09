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
    if (searchCountryName === '') {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
       
        return;
   }
    fetchCountries(searchCountryName)
        .then(onShowCountryName)
        .catch(error => {
             
        Notify.failure("Oops, there is no country with that name");
   
            console.log(error);
    } );
    
}


function fetchCountries(name) {

    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

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
        


function onShowCountryName(data) {
   
    if (data.length > 10) {
       Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }

  
        const newCountryName = data
            .map(({ name: { official }, flags: { svg } }) =>
                `<li>
                    <img src="${svg}" alt="${official}" width = '30px'>
                    ${official}
                </li>`)
            .join('');
        countryList.innerHTML = newCountryName;
    
    countryList.classList.remove('newSizeLetter');
    onShowCountryInfo(data); 
     
    
   }
   

function onShowCountryInfo(data) {

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
        
        // newCountryName.classList.add('newSizeLetter');
       
        
    
        countryInfo.innerHTML = newCountryInfo;
        countryList.classList.add('newSizeLetter');
    }  
}



