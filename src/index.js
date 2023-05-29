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
const gallerySLBox = new SimpleLightbox('.gallery a');
  let loadedPictuersInSession = 0;



function appendImagesMarkup(element) {
  if (element.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
  }
  for (let i = 0; i < element.length; i++) {
    const url = element[i];
    const markup = template.template(url);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
  }
  loadMoreBtn.show();
  loadMoreBtn.enable();
  gallerySLBox.refresh();
  totalHitsCount(element.length);
}

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  loadMoreBtn.hide();
  loadedPictuersInSession = 0;

  pictureApiService.query = e.target.elements.
    searchQuery.value;
  if (pictureApiService.query.trim() === '') {
    emptyInputFieldNotify();
    return;
  } 
  pictureApiService.resetPage();
  fetchPic();
}

async function fetchPic() {
  loadMoreBtn.disable();
  try {
    const response = await pictureApiService
      .fetchPictures();
    appendImagesMarkup(response);
     successNotify();
  }
  catch (error) { errorNotify()};
}


function emptyInputFieldNotify() {
      loadMoreBtn.hide();
      return Notiflix.Notify.failure('Input field cannot be empty!');
}

function errorNotify() {
return Notiflix.Notify.failure(
          "Oops, something went wrong =("
  )
};

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

function totalHitsCount(elementLength) {
  loadedPictuersInSession += elementLength;
  const totalPicturesLoaded = pictureApiService.totalHits;

  if (loadedPictuersInSession >= totalPicturesLoaded) {
    loadMoreBtn.hide();
    return Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}



loadMoreBtn.refs.button.addEventListener('click', fetchPic);
refs.searchForm.addEventListener('submit', onSearch);


