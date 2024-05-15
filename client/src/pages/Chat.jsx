import React, { useContext, useEffect, useState, useRef } from 'react';
import { MyContext } from '../MyContext';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allOtherUsers, host } from '../utils/Api_Routes';
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

const Chat = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const { user, setUser, isLoggedIn } = useContext(MyContext);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    const handleChangeChat = (chat) => {
        setCurrentChat(chat);
    }
    console.log(currentChat);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        if(user) {
            socket.current = io(host);
            socket.current.emit("add-user", user._id);
        }
    })
    useEffect(() => {
        const getAllOtherUsers = async () => {
            if (user.isAvatarImageSet) {
                const data = await axios.get(`${allOtherUsers}/${user._id}`);
                setContacts(data.data);
            } else {
                navigate("/setAvatar");
            }
        }
        getAllOtherUsers();
    }, [])
    console.log(contacts)
    console.log("Chat Page", user);
    return (
        <Container>
            <div className='contacts'>
                <Contacts contacts={contacts} changeChat={handleChangeChat} />
            </div>
            <div className='chat'>
                {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} socket={socket}/>}
            </div>
        </Container>
    )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:row;
    alignItems:center;
    justify-content:center;
    color:white;
    .contacts {
        width:24vw;
        height:auto;
        overflow-y:auto;
        background-color:black;
        margin:1rem;
        border-radius:1rem;
        &::-webkit-scrollbar {
            width:0.2rem;
            &-thumb {
                background-color:#ffffff39;
                width:0.1rem;
                border-radius:1rem;
            }
        }
    }
    .chat {
        width:76vw;
        background-color:black;
        margin:1rem;
        border-radius:1rem;
    }

`;
export default Chat