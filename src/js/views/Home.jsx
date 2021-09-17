import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.scss";
import styled from "styled-components";
import { Context } from "../store/appContext";
import { Button } from "@material-ui/core";
import Background from "../../img/banner.jpg";
import { Link } from "react-router-dom";
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}
export const Home = () => {
	const { store, actions } = useContext(Context);
	const dimensions = getWindowDimensions();

	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		if (dimensions.width < 1000) {
			setIsMobile(true);
		}
	}, []);
	const Banner = styled.div`
		height: 100vh;
		width: 100vw;
		background-image: url(${Background});
		background-size: cover;
	`;
	const nav = !isMobile ? (
		<div className="p-1 d-flex w-100 justify-content-end">
			<Button variant="outlined" className="text-white border-white p-3 pvu-price fw-bolder mx-3">
				1 PVU : {store.pvuPrice} USD
			</Button>
			<Button variant="outlined" className="text-white border-white p-3 pvu-price fw-bolder">
				About us
			</Button>
		</div>
	) : (
		<div className="p-3 d-flex w-100 justify-content-between text-white">
			<p>1 PVU : {store.pvuPrice} USD</p>
			<p>About us</p>
		</div>
	);
	const footer = !isMobile ? (
		<div className="position-absolute text-white text-center banner-diclaimer">
			<p>Precio del pvu actualizado dinamicamente usando informacion de PancakeSwap</p>
		</div>
	) : (
		<div className="text-white text-center mobile-disclaimer py-5">
			<p>Precio del pvu actualizado dinamicamente usando informacion de PancakeSwap</p>
		</div>
	);
	return (
		<Banner>
			<div className="container-fluid">
				{nav}
				<div className="d-flex flex-column p-5 justify-content-center text-white banner-details">
					<h1>Calculadora PVU 2.0</h1>
					<p>Calcula de manera rapida y sencilla la produccion de tu cuenta de PVU</p>
					<Button variant="outlined" className="banner-cta">
						<Link to="/calculadora">Comienza Ahora</Link>
					</Button>
					{footer}
				</div>
			</div>
		</Banner>
	);
};
