import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../MyContext";
import dummyImage from "../utils/images/dummy-image.png";

const Contacts = ({ contacts, changeChat }) => {
    const { user } = useContext(MyContext);
    const [currentChatSelected, setCurrentChatSelected] = useState(undefined);
    const changeCurrentChat = (index, contact) => {
        setCurrentChatSelected(index);
        changeChat(contact);
    };
    console.log(currentChatSelected);
    return (
        <Container>
            <div className="user-container">
                <img src={user.avatarImage} alt="User Profile" />
                <div className="user-details">
                    <h3>
                        {user.firstName} {user.lastName}
                    </h3>
                    <p>{user.username}</p>
                </div>
            </div>
            <div className="contact-container">
                {contacts.map((contact, index) => (
                    <div
                        className={`contact-card ${index === currentChatSelected ? "selected" : ""
                            }`}
                        key={index}
                        onClick={() => changeCurrentChat(index, contact)}
                    >
                        <img src={contact.avatarImage || dummyImage} alt="Avatar" />
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .user-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color:#0d0d30;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 0.1rem groove grey;
    .user-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
    }
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
      color: grey;
    }
    img {
      width: 3rem;
      height: 3rem;
      border: 0.2rem solid #4e0eff;
      border-radius: 1.5rem;
    }
  }
  .user-container h3 {
    text-transform: uppercase;
  }
  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .contact-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      width: 80%;
      padding: 0.5rem;
      border-bottom: 0.1rem groove grey;
      transition:0.5s ease-in-out;
      cursor:pointer;
      &.hover {
        background-color: #9186f3;
        border-radius:1rem;
      }
      &.selected {
        background-color: #9186f3;
        border-radius:1rem;
      }
      img {
        width: 3rem;
        height: 3rem;
        border: 0.2rem solid white;
        border-radius: 1.5rem;
      }
    }
  }
`;
export default Contacts;
