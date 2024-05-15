import React, { useState } from "react";
import styled from "styled-components";
import Picker, { Theme } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    console.log(event);
    console.log(emoji.emoji);
    const message = msg + emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault(); 
    if(msg.length > 0){
      handleSendMsg(msg);
      setMsg('');
    }
  }
  //console.log(msg)
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <EmojiPickerContainer>
              <Picker
                onEmojiClick={handleEmojiClick}
                className="emoji-picker-react"
                theme={Theme.DARK}
              />
            </EmojiPickerContainer>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  border-radius: 1rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        //   background-color:#080420;
        //   box-shadow:0 5px 10px #9a86f3;
        //   border-color:#9a86f3;
        //   .emoji-categories {
        //     button {
        //       filter:contrast(0);
        //     }
        //   }
        //    .emoji-search {
        //     background-color: transparent;
        //     border-color: #9a86f3;
        //    }
        //   .emoji-group:before {
        //     background-color:#080420;
        //   }
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    border-radius: 2rem;
    background-color: #ffffff34;
    padding: 0.9rem;

    input {
      width: 90%;
      height: 80%;
      outline: none;
      border: none;
      background: transparent;
      color: white;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: -480px;
`;

export default ChatInput;
