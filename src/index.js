import './css/styles.css';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchCountryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

 searchCountryInput.addEventListener('input', debounce(onShowCountryList, DEBOUNCE_DELAY));



function onShowCountryList(e) {
    e.preventDefault();
    const searchCountryName = searchCountryInput.value.trim();
   
    console.log(searchCountryName);
    fetchCountries(searchCountryName).then(onShowCountryName);
}



function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name`;
    const fields = `name, capital, population, flags, languages`;
    return fetch(`${url}/${name}?fields=${fields}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json();
        })
}
        


function onShowCountryName(data) {
    const newCountryName = data
        .map(({ name: { official }, flags: { svg }}) =>
            `<li>
     <img src="${svg}" alt="${official}">
     ${official}
            </li>`)
        .join('');
    countryList.insertAdjacentHTML('afterbegin', newCountryName);
       

}

// function onShowCountryInfo(name) {

//     const newCountryInfo = name.map(({ name, capital, population, flags, languages }) => 
//                `<h1>${name.official}</h1>
// <p>${flags.svg}</p>
// <p>${capital}</p>
// <p>${population}</p>
// <p>${languages}</p>`
//     ).join('');
    
//     countryInfo.insertAdjacentHTML('afterbegin', newCountryInfo) ;
// }