import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/users-reducer";

type UsersSearchFormObjectType = {
  term: string
  friend: "null" | "true" | "false"
}

type PropsType = {
  filter: FilterType
  usersPerPage: number
  currentPageNumber: number
  getUsers: (usersPerPage: number, currentPageNumber: number, filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {
  const onSubmit = (values: UsersSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const filter = {
        term: values.term,
        friend: values.friend === "null" ? null : values.friend === "true" ? true : false
      }
      props.getUsers(props.usersPerPage, 1, filter); // значение values вместо filter мы передать не можем
      setSubmitting(false);                               // иначе на сервер пойдут запросы со значениеми
  }                                                                 // values.friend = "true", "null", "false"
  return (                                                          // а не values.friend = true, null, false
    <div>
      <Formik
        initialValues={{term: '', friend: "null"}}
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