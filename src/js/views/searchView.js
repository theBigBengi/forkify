import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _errorMessage = '';

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      // Prevent form's default behavior
      e.preventDefault();
      // Then execute the handler
      handler();
    });
  }
}

export default new SearchView();
