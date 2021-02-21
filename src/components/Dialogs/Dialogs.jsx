import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

  const dialog = props.dialogsPage.dialogs.map( d => <DialogItem ava= {d.ava} name={d.name} id={d.id} />);
  const message = props.dialogsPage.messages.map( m => <Message message={m.message} />);

  const onMessageChange = (event) => {
    const text = event.target.value;
    props.messageChange(text);
  }

  const onSendMessage = () => {
    props.sendMessage();
  }

    return (
        <div className={styles.dialogs}>
          <div>
            { dialog }
          </div>
          <div>
            { message }
          </div>
          <textarea onChange={ onMessageChange } value = { props.dialogsPage.newMessage} />
          <button onClick = { onSendMessage }>Send</button>
        </div>
    )
}

export default Dialogs;