import {Paginator} from "./Paginator";
import React from "react";
import TestRenderer, {create} from "react-test-renderer";

const {act} = TestRenderer;

describe("Paginator Component", () => {

  test("First pages button disabled after create component", () => {
    const component = create(<Paginator totalUsersCount={100} pageSize={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const First_pages_button = root.children[0].children[0];
    expect(First_pages_button.props.disabled).toBe(true)
  })

  test("First pages button not disabled after click by Last_pages_button", () => {
    const component = create(<Paginator totalUsersCount={100} pageSize={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const First_pages_button = root.children[0].children[0];
    const Last_pages_button = root.children[0].children[4];
    act(() => {
      Last_pages_button.props.onClick();
    });
    expect(First_pages_button.props.disabled).toBe(false)
  })

  test("Last pages button not disabled after create component", () => {
    const component = create(<Paginator totalUsersCount={100} pageSize={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const Last_pages_button = root.children[0].children[4];
    expect(Last_pages_button.props.disabled).toBe(false)
  })

  test("Last pages button disabled after click", () => {
    const component = create(<Paginator totalUsersCount={100} pageSize={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const Last_pages_button = root.children[0].children[4];
    act(() => {
      Last_pages_button.props.onClick();
    });
    expect(Last_pages_button.props.disabled).toBe(true)
  })

  test("Count of pages should be correct", () => {
    const component = create(<Paginator totalUsersCount={100} pageSize={5} countOfDisplayingPages={10}/>);
    const root = component.root;
    const pagesWrapper = root.children[0].children[2];
    expect(pagesWrapper.children.length).toBe(10)
  })

})