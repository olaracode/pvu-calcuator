import React, { useContext, useState } from "react";
import { IconButton } from "@material-ui/core";
import { AddSharp } from "@material-ui/icons";
import { Context } from "../../store/appContext";

export const Form = () => {
	const { store, actions } = useContext(Context);
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

	const webForm = (
		<div className="row p-5 justify-content-between">
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
	);
	return <div>{webForm}</div>;
};
