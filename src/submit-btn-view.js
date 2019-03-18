import AbstractView from './abstract-view';

export default class SubmitBtnView extends AbstractView {
  constructor(isRelevant = false, isDisabled = false) {
    super();
    this.isRelevant = isRelevant;
    this.isDisabled = isDisabled;
  }

  get template() {
    return `
    <input type="submit" class="order__submit" value="Забронировать" ${this.isRelevant && this.isDisabled ? `` : `disabled`}>`;
  }

  bind() {}
}
