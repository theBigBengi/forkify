import View from './View.js';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'Nothing here yet';

  _generateMarkup() {
    return this._data
      .map(bookmark => this._generateBookmarkMarkup(bookmark))
      .join('');
  }

  _generateBookmarkMarkup(result) {
    const currentHashId = window.location.hash.slice(1);

    return `          
    <li class="preview">
        <a class="preview__link ${
          currentHashId === result.id ? 'preview__link--active' : ''
        }" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
     </li>`;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new bookmarksView();
