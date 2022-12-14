import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from '../assets/logo-no-text.png'

export default function Contacts({ contacts, currentUser, changeChat }) {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	
	useEffect(() => {
		if (currentUser) {
			setCurrentUserName(currentUser.username);
			setCurrentUserImage(currentUser.avatarImage);
		}
	}, [currentUser]);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<>
			{currentUserImage && currentUserImage && (
				<Container>
					<div className="brand">
						<img src={Logo} alt="logo" />
						<h1>SwiftChat</h1>
					</div>
					<div className="contacts">
						{contacts.map((contact, index) => {
							return (
								<div
									key={contact._id}
									className={`contact ${
										index === currentSelected ? "selected" : ""
									}`}
									onClick={() => changeCurrentChat(index, contact)}
								>
									<div className="avatar">
										<img
											src={`${contact.avatarImage}`}
											alt="avatar"
										/>
									</div>
									<div className="username">
										<h4>{contact.username}</h4>
									</div>
								</div>
							);
						})}
					</div>
					<div className="current-user">
						<div className="avatar">
							<img
								src={`${currentUserImage}`}
								alt="avatar"
							/>
						</div>
						<div className="username">
							<h2>{currentUserName}</h2>
						</div>
					</div>
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: var(--background-color);
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 3rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.5rem;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: var(--secondary-color);
				width: 0.2rem;
				border-radius: 1rem;
			}
		}
		.contact {
			background-color: var(--form-background-color);
			min-height: 5rem;
			cursor: pointer;
			width: 95%;
			border-radius: 0.3rem;
			padding: 0.4rem;
			display: flex;
			gap: 1rem;
			align-items: center;
			transition: 0.5s ease-in-out;
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
		.selected {
			background-color: var(--bg-variant-color-hover);
		}
	}
	.current-user {
		margin-right: 0.25rem;
		background-color: var(--form-background-color);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}
		.username {
			h2 {
				color: white;
			}
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			gap: 0.5rem;
			.username {
				h2 {
					font-size: 1rem;
				}
			}
		}
	}
`;
