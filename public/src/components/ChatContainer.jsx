import React from "react";
import styled from "styled-components";

export default function ChatContainer({ currentChat }) {
	return (
		<>
			{currentChat && (
				<Container>
					<div className="chat-header">
						<div className="user-details">
							<div className="avatar"></div>
							<div className="username">
								<img
									src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
									alt="avatar"
								/>
								<h4>{currentChat.username}</h4>
							</div>
						</div>
					</div>
					<div className="chat-messages"></div>
					<div className="chat-input"></div>
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
padding-top: 1rem;
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h4 {
        color: white;
      }
    }
  }
}
`;