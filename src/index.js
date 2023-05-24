import Notiflix from 'notiflix';
import axios from 'axios';
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');


const BASE_URL = `https://pixabay.com/api/?key=36665429-419efb0f167e76c277ad1e233&image_type=photo&orientation=horizontal&safesearch=true&q=`;

async function fetchImages(searchName){
    const images = await axios.get(`${BASE_URL}${searchName}`);
    const smallImage = images.data.hits;
    for (let i = 0; i < smallImage.length; i++) {
        const url = smallImage[i];
        const markup = `
        <div>
        <img src="${url.webformatURL}" alt="Looking for a ${searchForm}..." width= 300px>
        <table style="text-align:center","justifyContent:center">
        <tr>
            <th>Likes</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Downloads</th>
        </tr>
        <tr>
            <td>${url.likes}</td>
            <td>${url.views}</td>
            <td>${url.comments}</td>
            <td>${url.downloads}</td>
        </tr>
        </table>
        </div>`;
        appendImagesMarkup(markup);
    }
}

function appendImagesMarkup(markup) {
    gallery.insertAdjacentHTML('beforeend', markup);
}

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value;
  fetchImages(searchQuery);
}


searchForm.addEventListener('submit', onSearch);
