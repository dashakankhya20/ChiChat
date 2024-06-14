import React, { useContext, useEffect, useState, useRef } from 'react';
import { MyContext } from '../MyContext';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allOtherUsers, host } from '../utils/Api_Routes';
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";

const Chat = () => {
    const socket = useRef(null); // Initialize socket ref to null
    const navigate = useNavigate();
    const { user } = useContext(MyContext);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    const handleChangeChat = (chat) => {
        setCurrentChat(chat);
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user && !socket.current) {
            socket.current = io(host, { autoConnect: false });
            socket.current.connect();
            socket.current.on('connect', () => {
                console.log('Socket connected:', socket.current.id);
                socket.current.emit("add-user", user._id);
            });
            socket.current.on('connect_error', (err) => {
                console.error('Connection Error:', err);
            });
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, [user]);

    useEffect(() => {
        const getAllOtherUsers = async () => {
            if (user && user.isAvatarImageSet) {
                const { data } = await axios.get(`${allOtherUsers}/${user._id}`);
                setContacts(data);
            } else if (user) {
                navigate("/setAvatar");
            }
        };
        getAllOtherUsers();
    }, [user, navigate]);

    return (
        <Container>
            <div className='contacts'>
                <Contacts contacts={contacts} changeChat={handleChangeChat} />
            </div>
            <div className='chat'>
                {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} socket={socket} />}
            </div>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    color: white;
    .contacts {
        width: 24vw;
        height: 90vh;
        overflow-y: auto;
        background-color: black;
        margin: 1rem;
        border-radius: 1rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
    }
    .chat {
        width: 76vw;
        height:90vh;
        background-color: black;
        margin: 1rem;
        border-radius: 1rem;
    }
`;

export default Chat;
