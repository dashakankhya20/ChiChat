import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AvatarRoute } from "../utils/Api_Routes";
import { Comment } from "react-loader-spinner";
import { Buffer } from "buffer";
import { MyContext } from "../MyContext";

const SetAvatar = () => {
  // const api = `https://api.multiavatar.com/Starcrasher.png?apikey=YOUR_API_KEY`;
  const apiURL = `https://api.multiavatar.com/45678945`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const { user, setUser } = useContext(MyContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  },[])
  console.log(user);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    const setProfilePicture = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${apiURL}/${Math.round(Math.random() * 1000)}?apikey=${process.env.API_URL
          }`
        );
        const imageBuffer = Buffer.from(image.data, "binary");
        const base64Image = imageBuffer.toString("base64");
        data.push(`data:image/svg+xml;base64,${base64Image}`);
      }
      setAvatars(data);
      setIsLoading(false);
      console.log("Data.Image", data.image);
    };
    setProfilePicture();
  }, []);

  const setAsProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const { data } = await axios.put(`${AvatarRoute}/${user._id}`, {
        avatarImage: avatars[selectedAvatar],
      });
      if (data.isSet) {
        // Update user state using setUser function
        setUser(prevUser => ({
          ...prevUser,
          isAvatarImageSet: true,
          avatarImage: data.image,
        }));
        toast.success("Your avatar has been set!", toastOptions);
        navigate("/login");
      } else {
        toast.error("Error setting avatar. Please try again!", toastOptions);
      }
    }
  };

  console.log(avatars);
  return (
    <>
      {isLoading ? (
        <CenteredContainer>
          <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#6936f5"
          />
        </CenteredContainer>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick your avatar!</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  {console.log(avatar)}
                  <img
                    src={avatar}
                    alt="Avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setAsProfilePicture}>
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>

      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  .title-container {
    h1 {
      color: #6936f5;
    }
  }
  
  .avatars {
    gap: 2rem;
    display:flex;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      img {
        height: 6rem;
        width: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  
    }
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default SetAvatar;
