import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import template from './templates/image-card.js';
import PictureApiService from './partials/js/components/picture-service'
import LoadMoreBtn from './partials/js/components/load-more-btn.js'
import 'simplelightbox/dist/simple-lightbox.min.css';




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
  clearGallery();

  pictureApiService.query = e.target.elements.
    searchQuery.value;
  if (pictureApiService.query.trim() === '') {
    emptyInputFieldNotify();
    return;
  }
  loadMoreBtn.show();
  pictureApiService.resetPage();
  fetchPictures();
}

function fetchPictures() {
  
    loadMoreBtn.disable();
  pictureApiService
    .fetchPictures()
    .then(pictures => {
      appendImagesMarkup(pictures), successNotify();
    })
    .catch(error => errorNotify(error.response.data));
}

function emptyInputFieldNotify() {
      loadMoreBtn.hide();
      return Notiflix.Notify.failure('Input field cannot be empty!');
}

function errorNotify(error) {
        {if (error === `[ERROR 400] "page" is out of valid range.`) {  loadMoreBtn.enable();
          return Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }  else {return Notiflix.Notify.failure(
          "Oops, something went wrong =("
        )}} 
}

function successNotify() {
  if (pictureApiService.page === 2 && pictureApiService.totalHits > 0) {
    return Notiflix.Notify.success(
      `Hooray! We found ${pictureApiService.totalHits} images.`
    );
  }
}

function clearGallery() {
  refs.galleryList.innerHTML = "";
}



loadMoreBtn.refs.button.addEventListener('click', fetchPictures);
refs.searchForm.addEventListener('submit', onSearch);

const gallerySLBox = new SimpleLightbox('gallery a');
gallerySLBox.refresh(); 

