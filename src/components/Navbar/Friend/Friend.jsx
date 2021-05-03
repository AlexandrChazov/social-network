import styles from "./Friend.module.css"

const Friend = (props) => {
  return (
      <div>
        <img className = {styles.img} src = { props.img } alt = "friend"/>
        { props.friend }
      </div>
  )
}

export default Friend;