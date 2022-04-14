import React, { useState, useEffect } from "react";
import axios from "axios";

const rates = {}; //Храним все валюты с выбранной датой

//Полученная дата используется для подстановки в API
const getToday = () => { 
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

console.log(getToday());

//Записываем валюты в rates
const renderContent = (response) => {
  const { data } = response;
   for(let i = 0; i < 26; ++i) {
     rates[i] = data[i];
     
   } 
  ExchangeValue ();
}



//функция курса валют, первое поле всегда фиксированное
function ExchangeValue () {
  const elementUSD = document.querySelector('[data-value="USD"]');
  const elementEUR = document.querySelector('[data-value="EUR"]');
  const elementRUB = document.querySelector('[data-value="RUB"]');
  const select = document.querySelector("#select");
  elementUSD.textContent = (1 / rates[5].Cur_OfficialRate).toFixed(4);
  elementEUR.textContent = (1 / rates[6].Cur_OfficialRate).toFixed(4);
  elementRUB.textContent = (1 / rates[17].Cur_OfficialRate).toFixed(4);
}

//Обращение к api
axios.get(`https://www.nbrb.by/api/exrates/rates?ondate=${getToday()}&periodicity=0`)
.then(renderContent);

// function ExchangeValue() {
//   //Функция вычисления и отображения курса валют
//   const elementUSD = document.querySelector('[data-value="USD"]');
//   const elementEUR = document.querySelector('[data-value="EUR"]');
//   const elementRUB = document.querySelector('[data-value="RUB"]');
//   const select = document.querySelector("#select");
//   elementUSD.textContent = (
//     (rates[select.value].Cur_OfficialRate / rates.USD.Cur_OfficialRate) *
//     rates.USD.Cur_Scale
//   ).toFixed(2);
//   elementEUR.textContent = (
//     (rates[select.value].Cur_OfficialRate / rates.EUR.Cur_OfficialRate) *
//     rates.EUR.Cur_Scale
//   ).toFixed(2);
//   elementRUB.textContent = (
//     (rates[select.value].Cur_OfficialRate / rates.RUB.Cur_OfficialRate) *
//     rates.RUB.Cur_Scale
//   ).toFixed(2);
// }

// function ConvertValue() {
//   //Функция вычисления и отображения конвертации
//   //Элементы формы, ввод суммы, выбор валюты, поле с результатом
//   const input = document.querySelector("#input");
//   const result = document.querySelector("#result");
//   const selectPay = document.querySelector("#selectPay");
//   const selectReceive = document.querySelector("#selectReceive");
//   const info = document.querySelector('[data-value="Info"]');
//   const select = document.querySelector("#select");
//   result.value = (
//     (parseFloat(input.value) *
//       (rates[selectPay.value].Cur_OfficialRate /
//         rates[selectPay.value].Cur_Scale)) /
//     (rates[selectReceive.value].Cur_OfficialRate /
//       rates[selectReceive.value].Cur_Scale)
//   ).toFixed(2);
//   info.textContent =
//     "1" +
//     " " +
//     rates[selectPay.value].Cur_Abbreviation +
//     " = " +
//     parseFloat(
//       rates[selectPay.value].Cur_OfficialRate /
//         rates[selectPay.value].Cur_Scale /
//         (rates[selectReceive.value].Cur_OfficialRate /
//           rates[selectReceive.value].Cur_Scale)
//     ).toFixed(5) +
//     " " +
//     rates[selectReceive.value].Cur_Abbreviation;
// }

function App() {
  //Определяем какая вкладка открыта
  const [exchangeOpened, setExchangeOpened] = React.useState(true);
  const [converterOpened, setConverterOpened] = React.useState(false);

  Render();

  function Render() {
    useEffect(() => {
      ExchangeValue();
    });
    return null;
  }
  
  return (
    <div className="wrapper">
      <header className="header">
        <ul className="buttonNav">
          <li>
          <button
              className="button"
              onClick={() => (
                setExchangeOpened(true),
                setConverterOpened(false)
                // ,GetCurrencies()
              )}
            >
              Курсы валют
            </button>
          </li>
          <li>
          <button
              className="button"
              onClick={() => (
                setConverterOpened(true),
                setExchangeOpened(false)
                // ,GetCurrencies()
              )}
            >
              Конвентер валют
            </button>
          </li>
        </ul>
      </header>
      <div className="content">
                
      
      {converterOpened ? (
        <div className="convert">
          <h1>Конвертер валют на {getToday()}</h1>
          <div className="form">
            <div className="col">
              <label htmlFor="name">Отдаю:</label>
              <select
                className="form-control"
                id="selectPay"
                // onInput={ConvertValue}
              >
                <option value="BYN" defaultValue>
                  BYN - Белорусский рубль
                </option>
                <option value="USD">USD - Доллар США</option>
                <option value="EUR">EUR - Евро</option>
                <option value="RUB">RUB - Рубль</option>
                <option value="UAH">UAH - Гривен</option>
                <option value="PLN">PLN - Злотых</option>
              </select>
              <input
                id="input"
                type="number"
                className="form-control"
                autoFocus
                // onInput={ConvertValue}
              />
            </div>
            <div className="col">
              <label htmlFor="name">Получаю:</label>
              <select
                id="selectReceive"
                className="form-control"
                // onInput={ConvertValue}
              >
                <option value="USD" defaultValue>
                  USD - Доллар США
                </option>
                <option value="BYN">BYN - Белорусский рубль</option>
                <option value="EUR">EUR - Евро</option>
                <option value="RUB">RUB - Рубль</option>
                <option value="UAH">UAH - Гривен</option>
                <option value="PLN">PLN - Злотых</option>
              </select>
              <input
                id="result"
                type="number"
                className="form-control"
                disabled
              />
            </div>
          </div>
          
        </div>
      ) : null}

      {exchangeOpened ? (
        <div className="exchange">
          <h1>Курс валют на {getToday()}
            <select
              id="select"
              className="form-control"
              disabled="disabled"
              onInput={ExchangeValue}
            >
             <option value="BYN" defaultValue>
                BYN - Белорусский рубль
              </option>
            </select>
            </h1>
          
          <div className="blocks">
            <div className="courses">
              <div className="itemTitle">Курс USD</div>
              <div className="itemValue" data-value="USD">
                --USD
              </div>
            </div>
            <div className="courses">
              <div className="itemTitle">Курс EUR</div>
              <div className="itemValue" data-value="EUR">
                --EUR
              </div>
            </div>
            <div className="courses">
              <div className="itemTitle">Курс RUB</div>
              <div className="itemValue" data-value="RUB">
                --RUB
              </div>
            </div>
          </div>

          
        </div>
      ) : null}
    </div>


    </div>
  );
}

export default App;
