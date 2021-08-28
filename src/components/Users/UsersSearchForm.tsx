import React from "react";
import {Field, Form, Formik} from "formik";

type UsersSearchFormObjectType = {
  term: string
  // friend: null | boolean
}

type PropsType = {
  term: string
  usersPerPage: number
  currentPageNumber: number
  getUsers: (usersPerPage: number, currentPageNumber: number, term: string) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {

  const onSubmit = (values: UsersSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
      props.getUsers(props.usersPerPage, 1, values.term);
      setSubmitting(false);
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 400);
  }

  return (
    <div>
      <Formik
        initialValues={{term: ''/*, friend: null*/}}
        onSubmit={onSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Field type="text" name="term"/>
            {/*<Field name="friend" as="select">*/}
            {/*  <option value="null">Show all</option>*/}
            {/*  <option value="true">Only followed</option>*/}
            {/*  <option value="false">Only unFollowed</option>*/}
            {/*</Field>*/}
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