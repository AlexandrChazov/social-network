import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType, usersActions} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

type UsersSearchFormObjectType = {
  term: string
  friend: "null" | "true" | "false"
}

type PropsType = {
  usersPerPage: number
  currentPageNumber: number
  getUsers: (usersPerPage: number, currentPageNumber: number, filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {

  const filter = useSelector(getUsersFilter) as {term: string, friend: null | boolean};

  const dispatch = useDispatch();
  const setCurrentPage_ = (pageNumber: number) => dispatch(usersActions.setCurrentPage(pageNumber));

  const onSubmit = (values: UsersSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const filter = {
        term: values.term,
        friend: values.friend === "null" ? null : values.friend === "true" ? true : false
      }
      props.getUsers(props.usersPerPage, 1, filter); // значение values вместо filter мы передать не можем
      setCurrentPage_(1);                                 // иначе на сервер пойдут запросы со значениеми
      setSubmitting(false);                               // values.friend = "true", "null", "false"
  }                                                                 // а не values.friend = true, null, false
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{term: filter.term, friend: String(filter.friend) as "null" | "true" | "false"}}
        onSubmit={onSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="text" name="term"/>
            <Field name="friend" as="select">
              <option value="null">Show all</option>
              <option value="true">Only followed</option>
              <option value="false">Only unFollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UsersSearchForm;