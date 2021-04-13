import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Form, Field } from 'react-final-form';
import {validators} from "../Common/FormValidation/FormValidation";

const DialogsMessage = (props) => {
  return (
      <Form
          onSubmit={(values) => {
            props.onSendMessage(values.myMessage);
            values.myMessage = "";
          }}
          render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Field name="myMessage" validate = {validators.maxLength(50)} >
                  {({ input, meta }) => (
                      <div>
                        {meta.error
                          ? <>
                              <textarea {...input}
                                        type = "text"
                                        placeholder="Type your message"
                                        rows = "5"
                                        cols = "25"
                                        className = {styles.redBorder} />
                              <span className={styles.errorMessage}>{meta.error}</span>
                            </>
                          : <textarea {...input} type = "text" placeholder="Type your message" rows = "5" cols = "25" />
                        }
                      </div>
                  )}
                </Field>
                <button type="submit" disabled={!values.myMessage} >Submit</button>
              </form>
          )}
      />
  )
}

const Dialogs = (props) => {

  const dialog = props.dialogsPage.dialogs.map( d => <DialogItem ava= {d.ava} name={d.name} id={d.id} key={d.id} />);
  const message = props.dialogsPage.messages.map( m => <Message message={m.message} key = {m.id} />);

  const onSendMessage = (myMessage) => {
    props.sendMessage(myMessage);
  }

    return (
        <div className={styles.dialogs}>
          <div>
            { dialog }
          </div>
          <div>
            <div className={styles.messages}>
              { message }
            </div>
            <DialogsMessage onSendMessage = {onSendMessage} />
          </div>
        </div>
    )
}

export default Dialogs;