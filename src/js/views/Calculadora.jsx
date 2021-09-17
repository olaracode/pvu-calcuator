import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { fadeInDown, fadeOutUp } from "react-animations";
import { IconButton, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { AddSharp, DeleteRounded, CloseSharp } from "@material-ui/icons";
import { Context } from "../store/appContext";
import { Plant } from "../component/Plant.jsx";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export const Calculadora = () => {
	const { store, actions } = useContext(Context);
	const [plantName, setPlantName] = useState("");
	const [leProduction, setLeProduction] = useState(0);
	const [hours, setHours] = useState(0);
	const [reinversion, setReinversion] = useState(0);
	const dimensions = getWindowDimensions();
	const [isMobile, setIsMobile] = useState(false);
	useState(() => {
		if (dimensions.width < 700) {
			setIsMobile(!isMobile);
		}
	});
	const handleCreate = e => {
		e.preventDefault();
		let netProfit = leProduction - reinversion;
		let newPlant = {
			name: plantName,
			le: parseInt(leProduction, 10),
			hrs: parseInt(hours, 10),
			reinversion: parseInt(reinversion, 10),
			profit: parseInt(netProfit, 10),
			id: Math.floor(Math.random() * 10000) + 1
		};
		actions.addPlant(newPlant);
	};
	const handleSetName = name => {
		if (name === "Sapling") {
			setPlantName(name);
			setLeProduction(250);
			setReinversion(150);
			setHours(72);
		} else if (name === "Sunflower") {
			setPlantName(name);
			setLeProduction(850);
			setReinversion(150);
			setHours(144);
		} else {
			setPlantName(name);
		}
	};
	const container = isMobile
		? "d-flex w-100 justify-content-between m-2"
		: "d-flex w-100 justify-content-between p-5";
	const button = isMobile
		? "text-white border-white pvu-price fw-bolder mx-3"
		: "text-white border-white p-3 pvu-price fw-bolder mx-3";
	const form = isMobile ? "row justify-content-between" : "row p-5 justify-content-between";
	const cardContainer = isMobile ? "my-2 p-2" : "px-5 my-3 py-2";
	const plants = isMobile ? "row" : "row p-5";
	const mainCard = isMobile ? "card" : "w-75 m-auto card";
	let totalProfit = store.pvuPrice * store.monthlyProfit;
	return (
		<div className="bg-dark container-custom">
			<div className={container}>
				<Link to="/" className="h2 text-white">
					PVU Calculadora
				</Link>
				<Button variant="outlined" className={button}>
					1 PVU : {store.pvuPrice} USD
				</Button>
			</div>
			<div className={cardContainer}>
				<div className={mainCard}>
					<div className="card-header d-flex justify-content-between align-items-center">
						<h4>
							Plants:
							{store.plants.length < 0 ? 0 : store.plants.length}
						</h4>
					</div>
					<div className="card-body">
						<div className={form}>
							<div className="col-lg-4 col-sm-12 py-2">
								<select
									className="form-control"
									aria-label="Default select example"
									value={plantName}
									onChange={e => handleSetName(e.target.value)}>
									<option selected>Planta</option>
									<option value="Sapling">Sapling</option>
									<option value="Sunflower">Sunflower Mama</option>
									<option value="NFT">NFT</option>
								</select>
							</div>
							<div className="col-lg-3 col-sm-12 py-2">
								<input
									type="number"
									className="form-control"
									value={leProduction}
									onChange={e => setLeProduction(e.target.value)}
									placeholder="Le (500)"
								/>
							</div>
							<div className="col-lg-3 col-sm-12 py-2">
								<input
									type="number"
									className="form-control"
									value={hours}
									onChange={e => setHours(e.target.value)}
									placeholder="Hours (72)"
								/>
							</div>
							<div className="col-lg-2 col-sm-12 d-flex m-auto justify-content-center">
								<IconButton onClick={e => handleCreate(e)}>
									<AddSharp />
								</IconButton>
							</div>
						</div>
						<hr />

						<div className={plants}>
							{store.plants.map(currentPlant => {
								return <Plant key={currentPlant.id} plant={currentPlant} mobile={isMobile} />;
							})}
						</div>
					</div>
					<div className="card-footer">
						<p>Ganancia Mensual</p>
						<div className="d-flex p-3 justify-content-between">
							<p>
								{Math.floor(store.monthlyLe)}
								le
							</p>
							<p>
								{store.monthlyProfit}
								PVU
							</p>
							<p>{totalProfit}$</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
