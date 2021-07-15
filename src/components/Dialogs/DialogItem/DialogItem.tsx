import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    id: number
    name: string
    ava: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    const path="/Dialogs/" + props.id;
    return <div className={styles.dialog} >
              <NavLink to={path}>
                <img className={styles.logo} src={props.ava} alt="user"/>
                {props.name}
              </NavLink>
            </div>
}

export default DialogItem;