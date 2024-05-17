import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { sendMessageRoute, getAllMessagesRoute } from '../utils/Api_Routes';
import axios from "axios";
import { MyContext } from '../MyContext';
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({ currentChat, socket }) => {
    const { user } = useContext(MyContext);
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // console.log(user);
    // console.log(currentChat);
    // Axios call for fetching messages between two users 
    const fetchMessages = async () => {
        if (currentChat) {
            const result = await axios.post(getAllMessagesRoute, {
                from: user._id,
                to: currentChat._id,
            });
            //console.log(result);
            setMessages(result.data);
        }
    }

    // Axios call for sending a message
    const handleSendMsg = async (msg) => {
        // alert(msg);
        const result = await axios.post(sendMessageRoute, {
            from: user._id,
            to: currentChat._id,
            message: msg
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: user._id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        //setMessages(msgs);
        // console.log(result);
        setMessages(prevMessages => [...prevMessages, { fromSelf: true, message: msg }]);
        fetchMessages();
    }
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            })
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages])

    useEffect(() => {
        fetchMessages()
    }, [currentChat]);
    //console.log(messages)
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={currentChat.avatarImage} alt="User Profile" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div ref={scrollRef} key={uuidv4()}>
                        <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                            <div className="content">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
            {/* <div className="chat-messages">
                <ChatInput handleSendMsg={handleSendMsg} />
            </div>
            <div className="chat-input">

            </div> */}
        </Container>
    )
}

const Container = styled.div`
padding-top:1rem;
display:grid;
grid-template-rows: 10% 78% 12%;
gap:0.1rem;
overflow:hidden;
height:100%;
@media screen and (min-width: 720px) and (max-width: 1080px){
    grid-auto-rows: 15% 70% 15%;
}
.chat-header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    .user-details {
        display:flex;
        align-items:center;
        gap:1rem;
        .avatar {
            img {
                height:3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
}
.chat-messages {
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    .message {
        display:flex;
        align-items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.1rem;
            border-radius:1rem;
            color:#d1d1d1;
        }
    }
    .sended {
        justify-content:flex-end;
        .content {
            background-color:#4f04ff21;
        }
    }
    .received {
        justify-content:flex-start;
        .content {
            background-color: #9900ff20;
        }
    }
}
`;
export default ChatContainer