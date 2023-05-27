import Notiflix from 'notiflix';
import template from './templates/image-card.js';
import PictureApiService from './partials/js/components/picture-service'
import LoadMoreBtn from './partials/js/components/load-more-btn.js'


const refs = {
galleryList: document.querySelector('.gallery'),
searchForm: document.querySelector('.search-form'),
}


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pictureApiService = new PictureApiService();




function appendImagesMarkup(element) {
  if (element.length === 0) {
      loadMoreBtn.hide();
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
  }
      loadMoreBtn.enable();
  for (let i = 0; i < element.length; i++) {
    const url = element[i];
    const markup = template.template(url);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
  }
}

function onSearch(e) {
  e.preventDefault();

  pictureApiService.query = e.target.elements.
    searchQuery.value;
  if (pictureApiService.query.trim() === '') {
    return Notiflix.Notify.failure('Input field cannot be empty!');
  }
  loadMoreBtn.show();
  pictureApiService.resetPage();
  clearGallery();
  fetchPictures();

}


function fetchPictures() {
    loadMoreBtn.disable();
  pictureApiService
    .fetchPictures()
    .then(pictures => {
      appendImagesMarkup(pictures);
    })
    .catch(error =>
        {if (error.response.data === `[ERROR 400] "page" is out of valid range.`) {  loadMoreBtn.enable();
          return Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }}        
    );
}

function response(pictures) {
  if (pictures === 0) {
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

function clearGallery() {
  refs.galleryList.innerHTML = "";
}

loadMoreBtn.refs.button.addEventListener('click', fetchPictures);
refs.searchForm.addEventListener('submit', onSearch);
