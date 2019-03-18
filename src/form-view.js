import AbstractView from './abstract-view';

export default class FormView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return `<form class="order__form" method="GET">

    <section class="order__select select">
      <div class="select__item">
        <select class="select__form" name="day">
          <option class="select__label">Выберите дату:</option>
          ${[...this.data.keys()].map((it) => `
            <option>${it}</option>
          `).join(``)}
        </select>
      </div>
  </form>`;
  }

  selectDay() {}

  onSubmit() {}

  bind() {
    this.element.querySelector(`.select__form[name="day"]`).addEventListener(`change`, (evt) => {
      this.selectDay(evt);
    });

    this.element.addEventListener(`submit`, (evt) => {
      this.onSubmit(evt);
    });
  }
}
