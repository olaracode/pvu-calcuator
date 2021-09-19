import React, { useContext, useState } from "react";
import { IconButton, Modal, Typography, Box, Button } from "@material-ui/core";
import { AddSharp, CloseSharp } from "@material-ui/icons";
import { Carousel } from "../Carousel.jsx";
import { Context } from "../../store/appContext";

export const MobileBody = () => {
	const { store, actions } = useContext(Context);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [plantName, setPlantName] = useState("");
	const [leProduction, setLeProduction] = useState(0);
	const [hours, setHours] = useState(0);
	const [reinversion, setReinversion] = useState(0);

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
		handleClose()
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

	let totalProfit = store.pvuPrice * store.monthlyProfit;
	return (
		<>
			<div className="p-3 text-white border-white border rounded m-3">
				<div className="d-flex justify-content-between">
					<h2>Plants: {store.plants.length}</h2>
					<IconButton onClick={handleOpen}>
						<AddSharp className="text-white" />
					</IconButton>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description">
						<div className="p-2 w-100 m-auto">
							<div className="card">
								<div className="d-flex justify-content-end">
									<IconButton onClick={handleClose}>
										<CloseSharp />
									</IconButton>
								</div>
								<div className="card-title text-center h4">Create a new plant</div>
								<div className="card-body p-3">
									<div className="my-3">
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
									<div className="my-3">
										<label>Le</label>
										<input
											type="number"
											className="form-control"
											value={leProduction}
											onChange={e => setLeProduction(e.target.value)}
											placeholder="Le (500)"
										/>
									</div>
									<div className="my-3">
										<label>Horas</label>
										<input
											type="number"
											className="form-control"
											value={hours}
											onChange={e => setHours(e.target.value)}
											placeholder="Le (500)"
										/>
									</div>
									<div className="my 3 d-flex justify-content-end">
										<Button onClick={(e)=>handleCreate(e)} endIcon={<AddSharp />}>
											Agregar
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Modal>
				</div>
			</div>

			{store.plants.length === 0 ? (
				<h3 className="text-white my-5 p-3">Agregue plantas para empezar a calcular sus ganancias</h3>
			) : (
				<Carousel />
			)}
			<div className="p-3 text-white border-white border rounded m-3">
				<div className="">
					<h4>Ganancia Mensual</h4>
					<p className="pvu-price-mobile">1PVU : {store.pvuPrice}$</p>
				</div>
				<hr className="border-white" />
				<p>{Math.floor(store.monthlyLe)} Le</p>
				<p>{store.monthlyProfit} PVU</p>
				<p>{totalProfit} $</p>
			</div>
		</>
	);
};
