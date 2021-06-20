import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Form, Field } from 'react-final-form';
import {validators} from "../Common/FormValidation/FormValidation";
import { InitialStateType } from '../../redux/dialogs-reducer';

type DialogsMessageOwnPropsType = {
    onSendMessage: (myMessage: string) => void
}

interface DialogsMessageValues {
    myMessage: string
}

const DialogsMessage: React.FC<DialogsMessageOwnPropsType> = (props) => {
  return (
      <Form
          onSubmit={(values: DialogsMessageValues) => {
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
                                        placeholder="Type your message"
                                        rows ={5}
                                        cols ={25}
                                        className = {styles.redBorder} />
                              <span className={styles.errorMessage}>{meta.error}</span>
                            </>
                          : <textarea {...input} placeholder="Type your message" rows ={5} cols ={25} />
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

type DialogsOwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (myMessage: string) => void
}

const Dialogs: React.FC<DialogsOwnPropsType> = (props) => {

  const dialog = props.dialogsPage.dialogs.map( d => <DialogItem ava= {d.ava} name={d.name} id={d.id} key={d.id} />);
  const message = props.dialogsPage.messages.map( m => <Message message={m.message} key = {m.id} />);

  const onSendMessage = (myMessage: string) => {
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