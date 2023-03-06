import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderLoader() {
    const markup = `
      <div class="spinner">
        <svg>
            <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup(data);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // update view's data
    this._data = data;
    // generate a new markup with the new data
    const newMarkup = this._generateMarkup(data);
    // generate virtual dom for comparing with the current dom
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // extract all elements from the NEW DOM
    const newElemnts = Array.from(newDom.querySelectorAll('*'));
    // extract all elements from the CURRENT DOM
    const currentElemnts = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElemnts.forEach((newEl, i) => {
      const currentEl = currentElemnts[i];
      const isEqual = newEl.isEqualNode(currentEl);

      // Update text
      if (!isEqual && currentEl.firstChild?.nodeValue.trim() !== '') {
        currentEl.textContent = newEl.textContent;
      }

      // Update attributes
      if (!isEqual) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
