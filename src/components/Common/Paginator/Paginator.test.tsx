import {Paginator} from "./Paginator";
import React from "react";
import TestRenderer, {create} from "react-test-renderer";

const {act} = TestRenderer;

describe("Paginator Component", () => {

  test("First pages button disabled after create component", () => {
    const component = create(<Paginator totalUsersCount={100} usersPerPage={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const First_pages_button = root.findByProps({className: "buttonWithArrow firstPageButton"});
    expect(First_pages_button.props.disabled).toBe(true)
  })

  test("First pages button not disabled after click by Last_pages_button", () => {
    const component = create(<Paginator totalUsersCount={100} usersPerPage={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const First_pages_button = root.findByProps({className: "buttonWithArrow firstPageButton"});
    const Last_pages_button = root.findByProps({className: "buttonWithArrow lastPageButton"});
    act(() => {
      Last_pages_button.props.onClick();
    });
    expect(First_pages_button.props.disabled).toBe(false)
  })

  test("Last pages button not disabled after create component", () => {
    const component = create(<Paginator totalUsersCount={100} usersPerPage={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const Last_pages_button = root.findByProps({className: "buttonWithArrow lastPageButton"});
    expect(Last_pages_button.props.disabled).toBe(false)
  })

  test("Last pages button disabled after click", () => {
    const component = create(<Paginator totalUsersCount={100} usersPerPage={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const Last_pages_button = root.findByProps({className: "buttonWithArrow lastPageButton"});
    act(() => {
      Last_pages_button.props.onClick();
    });
    expect(Last_pages_button.props.disabled).toBe(true)
  })

  test("Count of pages should be correct", () => {
    const component = create(<Paginator totalUsersCount={100} usersPerPage={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    //@ts-ignore
    const pagesWrapper = root.children[0].children[2]; // можно заменить на "root.findByProps" чтобы TS не ругался, но оставил так, чтобы иметь ввиду что найти элемент можно и через "children"
    expect(pagesWrapper.children.length).toBe(10)
  })

})