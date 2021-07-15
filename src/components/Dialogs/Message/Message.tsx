import React from 'react';
import styles from '../Dialogs.module.css';

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return <div className={styles.dialog}>{props.message}</div>
}

export default Message;