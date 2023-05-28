function template(url) {
  return `<div class="gallery__item">
    <a href="${url.largeImageURL}" title="${url.tags}">
    <img class="gallery__image" src="${url.webformatURL}" alt="${url.tags}" loading="lazy" width="250" height="150"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${url.likes}
      </p>
      <p class="info-item">
        <b>Views</b>${url.views}
      </p>
      <p class="info-item">
        <b>Comments</b>${url.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${url.downloads}
      </p>
    </div>
  </div>`;
}

export default {template};
