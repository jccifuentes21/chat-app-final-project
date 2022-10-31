import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";

export default function SetAvatar() {
	const api = "https://api.multiavatar.com/45678945";
	const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


	return (
		<>
			<Container>
				<div className="title-container">
					<h1>Pick your avatar</h1>
				</div>
                <div className="avatars">
                    {

                    }
                </div>
			</Container>
			<ToastContainer />
		</>
	);
}

const Container = styled.div``;
