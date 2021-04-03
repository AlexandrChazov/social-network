import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Form, Field } from 'react-final-form';

const DialogsMessage = (props) => {
  return (
      <Form
          onSubmit={(values) => {
            props.onSendMessage(values.myMessage);
            values.myMessage = "";
          }}
          render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Field name="myMessage" component="textarea" placeholder="Type your message" />
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
            { message }
          </div>
              <DialogsMessage onSendMessage = {onSendMessage} />
        </div>
    )
}

export default Dialogs;