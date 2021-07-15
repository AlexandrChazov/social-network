import React from "react";
import ReactDOM from 'react-dom';
import MainApp from "./App";
import {act} from 'react-dom/test-utils'; // можно и без этой функции, но тогда будет варнинг, функция подготавливает компоненту к проверке. В этом случае работа теста будет более приближена к тому как React взаимодействует с браузером

test("renders without crashing", () => {
  const div = document.createElement("div");
  act(() => {
    ReactDOM.render(<MainApp/>, div);
  });
  ReactDOM.unmountComponentAtNode(div); // вернёт true если элемент удалился и false если такого элемента нет
});
