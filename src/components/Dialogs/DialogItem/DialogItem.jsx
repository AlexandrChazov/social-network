import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem = (props) => {
    const path="/Dialogs/" + props.id;
    return <div className={styles.dialog} >
              <NavLink to={path}>
                <img className={styles.logo} src={props.ava} alt="photo"/>
                {props.name}
              </NavLink>
            </div>
}

export default DialogItem;