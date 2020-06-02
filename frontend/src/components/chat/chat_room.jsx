import React from 'react'
import socketIOClient from "socket.io-client";
import styles from './chat_room.module.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
const ENDPOINT = "http://10.0.0.69:5000";



class ChatRoom extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message: '',
            messageList: [],
            shown: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        this.props.socket.emit('joinRoom', this.props.match.params.roomName)
        
        this.props.socket.on('chat message', (msg) => {
            let newMessageList = [...this.state.messageList]
            newMessageList.push(msg)   
            this.setState({messageList: newMessageList});
        });

    }


    toggleShow(){
        this.setState({shown: !this.state.shown})
    }

    handleChange(e) {
        this.setState({message: e.currentTarget.value})
    }

    handleSubmit(e) {
        e.preventDefault(); 
        // this.props.socket.in(`${this.props.match.params.roomName}`)
        //     .emit('chat message', { username: this.props.currentUser.handle, message: this.state.message, room: this.props.match.params.roomName });
        //     this.setState({message: ''})    
            
        this.props.socket.emit('chat message', { username: this.props.currentUser.handle, message: this.state.message, room: this.props.match.params.roomName });
        this.setState({message: ''})
    }

    render() {
        const messageList = this.state.messageList.map((data, idx) => {
        return <li key = {idx}>
                    <span className = {styles.username}>{data['username'] + ":"}</span>
                    <span className={styles.message}>{data['message']}</span>
                </li>
        })

        const chatStyles = (this.state.shown) ? styles.chatContainer : [styles.chatContainer, styles.hidden].join(" ")
        return (
            <div className = {chatStyles}>
                <div className={styles.chatTitle}>Chat</div>
                <button 
                className={styles.minus}
                onClick={()=>this.toggleShow()}>{this.state.shown ? "-" : "+"}</button>
                <ul className={styles.messages}>
                {messageList}
                </ul>

                <form className={styles.messageForm} onSubmit = {this.handleSubmit} action="">

                        <input placeholder="Send a message to the room" className={styles.chatInput} onChange = {this.handleChange} type="text" value = {this.state.message}/>

                </form>
            </div>

        )

    }

}

const mSTP = (state) => {
    return {
        currentUser: state.session.user
    }
}

// const mDTP = (dispatch) => {
//     return {
//         currentUser: state.entities.users[state.session.id]
//     }
// }




export default withRouter(connect(mSTP, null)(ChatRoom))