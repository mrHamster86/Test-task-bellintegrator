import getData from './get-data';
import Presenter from './presenter';
import {dataInJson, jsonInData} from './converter';

const renderElemen = (position, element) => {
  position.innerHTML = ``;
  position.appendChild(element);
};

export default class App {

  static init(position) {
    if (!localStorage.getItem(`dataList`)) {
      const data = getData(Date.now());
      localStorage.setItem(`dataList`, JSON.stringify(dataInJson(data)));
    }
    const dataList = jsonInData(JSON.parse(localStorage.getItem(`dataList`)));
    const presenter = new Presenter(dataList);
    renderElemen(position, presenter.element);
  }

}
