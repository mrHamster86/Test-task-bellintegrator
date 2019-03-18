const converterTime = (element) => {
  const newObject = {};
  for (const time of element) {
    const [property, value] = time;
    newObject[property] = [...value].map((it) => [...it]);
  }
  return newObject;
};

const converterData = (element) => {
  const newObject = {};
  for (const data of element) {
    const [property, value] = data;
    newObject[property] = converterTime([...value]);
  }
  return newObject;
};

const converterTimeMap = (element) => {
  const newMap = new Map(Object.keys(element)
                  .map((time) => [time, element[time].map((it) => new Set(it))]));
  return newMap;
};

const converterDataMap = (element) => {
  const newMap = new Map(Object.keys(element)
                    .map((data) => [data, converterTimeMap(element[data])]));
  return newMap;
};

export const dataInJson = (data) => converterData(data);
export const jsonInData = (data) => converterDataMap(data);
