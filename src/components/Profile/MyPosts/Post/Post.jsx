import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
  return (
    <div className={styles.item}>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREhnQMXK-T_-1xM_rBJHA2WEZwVB-TGVikpQ&usqp=CAU" alt="jw_logo" />
        { props.message }
      </div>
      <div>
        likes = { props.likesCount }
      </div>
    </div>
  )
}

export default Post;
