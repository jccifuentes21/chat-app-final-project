import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chat = () => {
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	useEffect(async () => {
		if (!localStorage.getItem("chat-app-user")) {
			navigate("/login");
		} else {
			setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
		}
	}, []);

	useEffect(async () => {
		if (currentUser) {
			if (currentUser.isAvatarImageSet) {
				const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
				setContacts(data.data);
			} else {
				navigate("/set-avatar");
			}
		}
	}, [currentUser]);

	return (
		<Container>
			<div className="container"></div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: var(--background-color);
	.container {
		height: 85vh;
		width: 85vw;
		background-color: var(--form-background-color);
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (max-width: 720px) and (min-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;

export default Chat;
