'use strict';

let movieTitles = []; 

fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    movieTitles = data.results.map(movie => movie.title.toLowerCase()); // assign movieTitles inside the fetch callback
    const searchInput = document.querySelector('.search');
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('suggestions');
    searchInput.insertAdjacentElement('afterend', suggestionsContainer);
    
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const suggestions = movieTitles.filter(title => title.includes(searchTerm));
      suggestionsContainer.innerHTML = '';
      if (searchTerm.length > 1 && suggestions.length > 0) {
        suggestions.forEach(suggestion => {
          const suggestionElement = document.createElement('div');
          suggestionElement.textContent = suggestion;
          suggestionElement.addEventListener('click', () => {
            searchInput.value = suggestion;
            suggestionsContainer.innerHTML = '';
          });
          suggestionsContainer.appendChild(suggestionElement);
        });
        suggestionsContainer.style.display = 'block';
      } else if (searchTerm.length > 1 && suggestions.length === 0) {
        suggestionsContainer.innerHTML = 'No movies found';
        suggestionsContainer.style.display = 'block';
      } else {
        suggestionsContainer.style.display = 'none';
      }
    });
    
    const moviePosters = document.getElementById('movie-posters');
    data.results.forEach(movie => {
      const moviePoster = document.createElement('div');
      moviePoster.classList.add('movie-poster');
      moviePoster.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}">
        <h2>${movie.title}</h2>
      `;
      moviePosters.appendChild(moviePoster);
    });
  })
  .catch(error => console.error(error));



  
  