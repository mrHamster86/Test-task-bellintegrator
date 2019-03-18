import AbstractView from './abstract-view';
import {setup} from './get-data';

export default class SelectSeatsView extends AbstractView {
  constructor(data, isRelevant = true) {
    super();
    this.data = data;
    this.isRelevant = isRelevant;

  }

  get template() {
    const arrSeats = new Array(setup.numberSeats).fill(``);

    return `
      <section class="order__place place">
        ${this.data.map((it, row) => `
          <div class="place__conteiner">
            <span class="place__row-title">Ряд № ${row + 1}</span>
            <ul class="place__list">
              ${arrSeats.map((item, seat) => `
              <li class="place__item">
                <input type="checkbox"
                  name="place" value="${row + 1}-${seat + 1}"
                  id="seat-${row + 1}-${seat + 1}"
                  class="visually-hidden"
                  ${it.has(seat + 1) && this.isRelevant ? `` : `disabled`}
                />
                <label for="seat-${row + 1}-${seat + 1}"
                  class="place__label ${it.has(seat + 1) && this.isRelevant ? `` : `place__label--disabled`}"
                >
                  ${seat + 1}
                </label>
              </li>`).join(``)}
            </ul>
          </div>`).join(``)}
      </section>`;
  }

  onOrderPlace() {}

  bind() {
    this.element.addEventListener(`click`, () => {
      this.onOrderPlace();
    });
  }
}
