function template(url){
  return `<li style="padding:15px">
  <a class="gallery__link" href="${url.largeImageURL}">
  <img src="${url.webformatURL}" alt="Looking for a pictures..." width= 300px>
  <table style="text-align:center">
  <tr style="max-width:100%">
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
  </li>`;
}

export default {template};
