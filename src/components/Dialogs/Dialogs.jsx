import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

  const dialog = props.dialog.map( d => <DialogItem ava= {d.ava} name={d.name} id={d.id} />);
  const message = props.message.map( m => <Message message={m.message} />);

  const sendButtonRef = React.createRef();

  const sendMessage = () => {
    props.addMessage();
  }

  const onMessageChange = () => {
    const text = sendButtonRef.current.value;
    props.updateMessageText(text);
  }

    return (
        <div className={styles.dialogs}>
          <div>
            { dialog }
          </div>
          <div>
            { message }
          </div>
          <textarea onChange={ onMessageChange } ref = { sendButtonRef } value = { props.newMessage} />
          <button onClick = { sendMessage }>Send</button>
        </div>
    )
}

export default Dialogs;