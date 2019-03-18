import FormView from './form-view';
import SelectTimeView from './select-time-view';
import SelectSeatsView from './select-seats-view';
import SubmitBtnView from './submit-btn-view';

import * as moment from 'moment';
import 'moment/locale/ru';

export default class FormPresenter {
  constructor(model) {
    this.model = model;

    this.view = new FormView(this.model);
    this.timeView = null;
    this.seatsList = null;
    this.submitBtn = null;

    this.day = null;
    this.time = null;

    this.bindDay();
  }

  get element() {
    return this.view.element;
  }

  get dayNow() {
    return Date.now();
  }

  get isRelevant() {
    return moment(this.dayNow).isBefore(moment(`${this.day} ${this.time}`, `D MMMM HH:mm`));
  }

  get isDisabletBtn() {
    return this.seatsList.element.querySelectorAll(`input[type="checkbox"]:checked`).length > 0;
  }

  addSubmitBtn() {
    if (this.submitBtn === null) {
      this.submitBtn = new SubmitBtnView(this.isRelevant, this.isDisabletBtn);
      this.view.element.appendChild(this.submitBtn.element);
    } else {
      const submitBtn = new SubmitBtnView(this.isRelevant, this.isDisabletBtn);
      this.view.element.replaceChild(submitBtn.element, this.submitBtn.element);
      this.submitBtn = submitBtn;
    }
  }

  deletSubmitBtn() {
    this.view.element.removeChild(this.submitBtn.element);
    this.submitBtn = null;
  }

  addSelectTime() {
    if (this.timeView === null) {
      this.timeView = new SelectTimeView(this.model.get(this.day));
      this.view.element.querySelector(`.select`).appendChild(this.timeView.element);
    } else {
      const timeView = new SelectTimeView(this.model.get(this.day));
      this.view.element.querySelector(`.select`).replaceChild(timeView.element, this.timeView.element);
      this.timeView = timeView;
      if (this.seatsList !== null) {
        this.deletSelectSeats();
      }
    }
    this.bindTime();
  }

  deletSelectTime() {
    this.deletSelectSeats();
    this.view.element.querySelector(`.select`).removeChild(this.timeView.element);
    this.timeView = null;
  }

  addSelectSeats() {
    if (this.seatsList === null) {
      this.seatsList = new SelectSeatsView(this.model.get(this.day).get(this.time), this.isRelevant);
      this.view.element.appendChild(this.seatsList.element);
    } else {
      const seatsList = new SelectSeatsView(this.model.get(this.day).get(this.time), this.isRelevant);
      this.view.element.replaceChild(seatsList.element, this.seatsList.element);
      this.seatsList = seatsList;
    }
    this.addSubmitBtn();
    this.bindSelectSeats();
  }

  deletSelectSeats() {
    this.view.element.removeChild(this.seatsList.element);
    this.seatsList = null;
    this.deletSubmitBtn();
  }

  selectDay(evt) {
    const value = evt.target.value;

    if (this.model.has(value)) {
      this.day = value;
      this.addSelectTime();
    } else {
      this.day = null;
      this.deletSelectTime();
    }
  }

  selectTime(evt) {
    const value = evt.target.value;

    if (this.model.get(this.day).has(value)) {
      this.time = value;
      this.addSelectSeats();
    } else {
      this.time = null;
      this.deletSelectSeats();
    }
  }

  onOrderPlace() {
    this.addSubmitBtn();
  }

  onSubmit(evt) {
    evt.preventDefault();

  }

  bindDay() {
    this.view.selectDay = (evt) => this.selectDay(evt);
    this.view.onSubmit = (evt) => this.onSubmit(evt);
  }

  bindTime() {
    this.timeView.selectTime = (evt) => this.selectTime(evt);
  }

  bindSelectSeats() {
    this.seatsList.onOrderPlace = () => this.onOrderPlace();
  }
}
