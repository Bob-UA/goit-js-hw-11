import template from './templates/image-card.js'
import Notiflix from 'notiflix';
import PictureApiService from './partials/js/components/picture-service'

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load_more');
const pictureApiService = new PictureApiService();


// gallery.style = "display:flex";



function appendImagesMarkup(element) {
  for (let i = 0; i < element.length; i++) {
    const url = element[i];
    const markup = template.template(url);
    console.log(markup);
    gallery.insertAdjacentHTML('beforeend', markup);
  }
}

function onSearch(e) {
  e.preventDefault();
  pictureApiService.query = e.target.elements.
  searchQuery.value;
  pictureApiService.resetPage();
  pictureApiService
    .fetchArticles()
    .then(pictures => appendImagesMarkup(pictures));

}

function onLoadMore() {
  pictureApiService
    .fetchArticles()
    .then(pictures => appendImagesMarkup(pictures));
}

loadMoreBtn.addEventListener('click', onLoadMore)
searchForm.addEventListener('submit', onSearch);
