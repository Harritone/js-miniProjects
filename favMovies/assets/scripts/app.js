//const addMovieBtn = document.querySelector('.btn-add');
const startAddMovieBtn = document.querySelector('header button');
const addMovieModal = document.getElementById('add-modal');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const backdrop = document.getElementById('backdrop');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const clearMovieInput = () => {
  //for(const userInput of userInputs) {
  //  userInput.value = '';
  //}
  userInputs.forEach(userInput => userInput.value = '');
};


const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = 'block';
  } else {
    entryText.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (id) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
}

const startDeleteMovieHandler = (id) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.removeEventListener('click', deleteMovieHandler)
  cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
  
  confirmDeletionBtn.addEventListener('click',
    deleteMovieHandler.bind(null, id)
  );
};

const renderNewMovie = (movie) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${movie.image}" alt="${movie.title}">
  </div>
  <div class="movie-element__info">
    <h2>${movie.title}</h2>
    <p>${movie.rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, movie.id))
  movieList.append(newMovieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
  clearMovieInput();
  };

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
  //closeMovieDeletionModal();
  clearMovieInput();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
}

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
};


const addMovieHandler = () => {

  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if(titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || ratingValue < 1 || ratingValue > 5) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  }
  movies.push(newMovie);
  closeMovieModal();
  toggleBackdrop();
  updateUI()
  renderNewMovie(newMovie);
};

startAddMovieBtn.addEventListener('click', () => showMovieModal());
backdrop.addEventListener('click', () => backdropClickHandler());
cancelAddMovieBtn.addEventListener('click', () => cancelAddMovieHandler());
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
