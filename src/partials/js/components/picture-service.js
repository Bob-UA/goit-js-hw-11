import axios from 'axios';
export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }



  async fetchPictures() {
    const BASE_URL = `https://pixabay.com/api/?key=36665429-419efb0f167e76c277ad1e233&image_type=photo&orientation=horizontal&safesearch=true&q=${this.searchQuery}&per_page=40&page=${this.page}`;
    const images = await axios.get(`${BASE_URL}`);
    
    const data = images.data.hits;
    this.incrementPage(data);
    this.totalHitsResponse(images.data.totalHits);
    return data;
  }

  incrementPage(data) {
    if (data) {
      return this.page += 1;
    }
    }
    
   totalHitsResponse(value) {
    return this.totalHits = value;
    }

  
    resetPage() {
        this.page = 1;
    }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  
}

