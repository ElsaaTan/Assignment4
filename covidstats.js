//grabbing references for the elements
const searchTerm = document.getElementById('city');
const date = document.getElementById('date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

//URL for covid report search 
const baseURL = 'https://covid-19-statistics.p.rapidapi.com/reports';
//api key
const key = '269f9797bcmshee2bb89ba053e2bp16c2e0jsn642f6c4e3ddb';

let url;

//event listener
searchForm.addEventListener('submit', fetchResults);

//fetchResults function
function fetchResults(event) {
    //preventDefault to stop form submitting
    event.preventDefault();
    //completing URL with key and search term
    url = `${baseURL}?rapidapi-key=${key}&city_name=${searchTerm.value}`;
    //adding the date parameter if entered
    if (date.value !== '') {
        url = `${url}&date=${date.value}`;
    };
    //fetch to pass URL as a request to API
    fetch(url).then(function (result) {
        return result.json();
    }).then(function (json) {
        displayResults(json);
    });
};

//display results function
function displayResults(json) {
    console.log(json);

    // Clearing any old results
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    };

    //saving the response in the variable output
    let output = json.data;

    //if no response
    if (output.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results found.'
        section.appendChild(para);
    } else {
        //create elements 
        for (let i = 0; i < output.length; i++) {
            let container = document.createElement('article');
            let paragraph1 = document.createElement('p');
            let paragraph2 = document.createElement('p');
            let paragraph3 = document.createElement('p');
            let paragraph4 = document.createElement('p');
            let paragraph5 = document.createElement('p');

            //setting the text to each p element from the current response
            let current = output[i];
            paragraph1.textContent = "Date: " + current.date;
            paragraph2.textContent = "Confirm cases: " + current.confirmed;
            paragraph3.textContent = "Deaths: " + current.deaths;
            paragraph4.textContent = "Fatality rate: " + current.fatality_rate;
            paragraph5.textContent = "Active cases: " + current.active;

            //appending all p to the article element and appending the article element to the section
            container.appendChild(paragraph1);
            container.appendChild(paragraph2);
            container.appendChild(paragraph3);
            container.appendChild(paragraph4);
            container.appendChild(paragraph5);
            section.appendChild(container);
        }
    }
}
