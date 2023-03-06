import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = '';

  _generateMarkup() {
    const { page, results, resultsPerPage } = this._data;

    const totalPages = Math.ceil(results.length / resultsPerPage);

    // If page is 1 and the is more pages
    if (page === 1 && totalPages > 1) {
      return this._generateButtonMarkup('right');
    }

    // On the last page
    if (page === totalPages && totalPages > 1) {
      return this._generateButtonMarkup('left');
    }

    // On the last page
    if (page < totalPages) {
      let markup = this._generateButtonMarkup('left');
      markup += this._generateButtonMarkup('right');
      return markup;
    }

    return ``;
  }

  _generateButtonMarkup(direction) {
    const { page } = this._data;
    const btnDirection =
      direction === 'right' ? ['next', 'right'] : ['prev', 'left'];
    const gotoPage = direction === 'right' ? page + 1 : page - 1;

    return ` 
    <button data-goto="${gotoPage}" class="btn--inline pagination__btn--${btnDirection[0]}">
        <span>Page ${gotoPage}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${btnDirection[1]}"></use>
        </svg>
    </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
}

export default new PaginationView();
