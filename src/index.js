// import imageCardTpl from './templates/image-card.hbs'
import Notiflix from 'notiflix';
import PictureApiService from './partials/js/components/picture-service'

// console.log(imageCardTpl);
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load_more');
const pictureApiService = new PictureApiService();


gallery.style = "display:flex";



function appendImagesMarkup(element) {
  for (let i = 0; i < element.length; i++) {
    const url = element[i];
    const markup = `
            <div>
        <img src="${url.webformatURL}" alt="Looking for a pictures..." width= 300px>
        <table style="text-align:center","justifyContent:center">
        <tr>
            <th>Likes</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Downloads</th>
        </tr>
        <tr>
            <td>"${url.likes}"</td>
            <td>"${url.views}"</td>
            <td>"${url.comments}"</td>
            <td>"${url.downloads}"</td>
        </tr>
        </table>
        </div>`;
    gallery.insertAdjacentHTML('beforeend', markup);
  }
}

function onSearch(e) {
  e.preventDefault();
  pictureApiService.query = e.target.elements.
  searchQuery.value;
  pictureApiService.resetPage();
  pictureApiService.fetchArticles();

}

function onLoadMore() {
  pictureApiService.fetchArticles();
}

loadMoreBtn.addEventListener('click', onLoadMore)
searchForm.addEventListener('submit', onSearch);
