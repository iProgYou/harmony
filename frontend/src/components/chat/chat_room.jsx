import React from 'react'
import socketIOClient from "socket.io-client";
import styles from './chat_room.module.css'
import {connect} from 'react-redux'
const ENDPOINT = "http://10.0.0.69:5000";



class ChatRoom extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message: '',
            messageList: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {

        this.socket = socketIOClient();
        this.socket.on('chat message', (msg) => {
            let newMessageList = [...this.state.messageList]
            newMessageList.push(msg)   
            this.setState({messageList: newMessageList});
        });

    }



    handleChange(e) {
        this.setState({message: e.currentTarget.value})
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.socket.emit('chat message', {username: this.props.currentUser.handle, message: this.state.message});
        this.setState({message: ''})
    }

    render() {
        const messageList = this.state.messageList.map((data) => {
        return <li>
                    <span>{data['username']}</span>
                    <span>{data['message']}</span>
                </li>
        })


        return (
            <div className = {styles.chatContainer}>

                {messageList}

                <form className={styles.messageForm} onSubmit = {this.handleSubmit} action="">

                    <label>
                        Message
                        <input onChange = {this.handleChange} type="text" value = {this.state.message}/>
                    </label>

                </form>
            </div>

        )

    }

}

const mSTP = (state) => {
    return {
        currentUser: state.entities.users[state.session.user.id]
    }
}

// const mDTP = (dispatch) => {
//     return {
//         currentUser: state.entities.users[state.session.id]
//     }
// }




export default connect(mSTP, null)(ChatRoom)