import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {  // объединяет тесты в одну группу
  test("status from props should be in state", () => {
    const component = create(<ProfileStatus status="Some text" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Some text");
  });

  test("after creation span with status should be displayed", () => {
    const component = create(<ProfileStatus status="Some text" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull()
  })

  test("after creation span should contain correct status", () => {
    const component = create(<ProfileStatus status="Some text" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[1]).toBe("Some text") //ставим точку останова, дебажим и смотрим какие свойства есть у спана - видим свойство children
  })

  test("after creation input shouldn't displayed", () => {
    const component = create(<ProfileStatus status="Some text" />);
    const root = component.root;
    const fn = () => {
      root.findByType("input");
    };
    expect(fn).toThrow()
  })

  test("input with correct status should be displayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="Some text" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");
    expect(input.props.value).toBe("Some text")
  })

  test("callback should be called", () => {
    const mockCallback = jest.fn();  // гуглим "jest fn" шпионская ф-ция, которая будет отслеживать кол-во вызовов
    const component = create(<ProfileStatus status="Some text" updateStatus = {mockCallback} />);
    const instance = component.getInstance();
    instance.editModeOff();                 // вызывем метод класса ProfileStatus который вызовет колбек updateStatus
    expect(mockCallback.mock.calls.length).toBe(1);  // ф-ция mockCallback вызывалась один раз, а значит и метод updateStatus вызывался
  })
});