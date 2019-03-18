import AbstractView from './abstract-view';

export default class SelectTimeView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return `
      <div class="select__item">
        <select class="select__form" name="time">
          <option class="select__label">Выберите время сеанса:</option>
          ${[...this.data.keys()].map((it) => `
            <option>${it}</option>
          `).join(``)}
        </select>
      </div>`;
  }

  selectTime() {}

  bind() {
    this.element.querySelector(`.select__form[name="time"]`).addEventListener(`change`, (evt) => {
      this.selectTime(evt);
    });
  }
}
