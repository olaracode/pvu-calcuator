import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Context } from "../store/appContext";
import { Body } from "../component/calculator/Body.jsx";
import { MobileBody } from "../component/calculator/MobileBody.jsx";
import PropTypes from "prop-types";
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}
const HeaderWeb = props => {
	return (
		<div className="d-flex w-100 justify-content-between p-5">
			<Link to="/" className="h2 text-white">
				PVU Calculadora
			</Link>
			<Button variant="outlined" className="text-white border-white p-3 pvu-price fw-bolder mx-3">
				1 PVU : {props.pvu} USD
			</Button>
		</div>
	);
};
const HeaderMobile = () => {
	return (
		<div className="w-100 text-center p-3">
			<Link to="/" className="h2 text-white">
				PVU Calculadora
			</Link>
		</div>
	);
};
export const Calculadora = () => {
	const { store, actions } = useContext(Context);
	const dimensions = getWindowDimensions();
	const [isMobile, setIsMobile] = useState(false);
	useState(() => {
		if (dimensions.width < 700) {
			setIsMobile(!isMobile);
		}
	});

	const container = isMobile
		? "d-flex w-100 justify-content-between m-2"
		: "d-flex w-100 justify-content-between p-5";
	const button = isMobile
		? "text-white border-white pvu-price fw-bolder mx-3"
		: "text-white border-white p-3 pvu-price fw-bolder mx-3";
	return (
		<div className="bg-dark container-custom">
			{isMobile ? (
				<>
					<HeaderMobile />
					<MobileBody />
				</>
			) : (
				<>
					<HeaderWeb pvu={store.pvuPrice} />
					<Body />
				</>
			)}
		</div>
	);
};

HeaderWeb.propTypes = {
	pvu: PropTypes.number
};
