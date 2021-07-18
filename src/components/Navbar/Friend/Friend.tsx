import styles from "./Friend.module.css"

type PropsType = {
    name: string
    img: string
}

const Friend: React.FC<PropsType>= (props) => {
    return (
        <div>
            <img className={styles.img} src={props.img} alt="friend"/>
            {props.name}
        </div>
    )
}

export default Friend;