import React, { useEffect, useState } from "react";
import styled from "styled-components";
import welcome from "../assets/welcome.gif";

const Welcome = () => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const getUser = async () => {
      setUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    };
    getUser();
  }, []);

  return (
    <Container>
      <img src={welcome} alt="Welcome gif" />
      {user ? (
        <h1>
          Welcome, <span>{user.username}!</span>
        </h1>
      ) : (
        <h1>Welcome!</h1>
      )}
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--primary-text-color);

  span {
    color: var(--secondary-color);
  }
  img{
    height: 20rem;
  }
`;

export default Welcome;
