'use strict';

// Select the input elements
const cityInput = document.querySelector('.city');
const searchInput = document.querySelector('.search');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.classList.add('suggestions');
document.body.appendChild(suggestionsContainer);

// Listen for input events on the city input element
cityInput.addEventListener('input', function() {
  // Get the value of the input element
  const inputValue = this.value;
  
  if (!inputValue) {
    // Hide the suggestions container if the input is empty
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
    return;
  }
  
  // Fetch the cities data from the cities.json file
  fetch('cities.json')
    .then(response => response.json())
    .then(data => {
      // Filter the data based on the input value
      const filteredCities = data.cities.filter(city => {
        const cityName = city.name.toLowerCase();
        return cityName.startsWith(inputValue.toLowerCase());
      });
      
      // Create an HTML string for the suggested cities or error message
      let suggestionsHTML;
      if (filteredCities.length > 0) {
        suggestionsHTML = filteredCities.map(city => {
          return `<div class="suggestion">${city.name}</div>`;
        }).join('');
      } else {
        suggestionsHTML = `<div class="error">No matching cities found</div>`;
      }
      
      // Set the HTML of the suggestions container to the HTML string
      suggestionsContainer.innerHTML = suggestionsHTML;
      suggestionsContainer.style.display = 'block';
      
      // Position the suggestions container below the input element
      const inputRect = cityInput.getBoundingClientRect();
      suggestionsContainer.style.top = inputRect.bottom + 'px';
      suggestionsContainer.style.left = inputRect.left + 'px';
    });
});

// Listen for click events on the suggested cities
suggestionsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('suggestion')) {
    // Set the clicked city name as the input element's value
    cityInput.value = event.target.textContent;
    
    // Clear the suggestions container
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
  }
});

