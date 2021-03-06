import React, { useContext, useState } from "react";
import { IconButton, Snackbar, Button } from "@material-ui/core";
import { CloseSharp } from "@material-ui/icons";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export const Plant = props => {
	const [open, setOpen] = useState(false);
	const { store, actions } = useContext(Context);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	const handleDelete = () => {
		actions.deletePlant(props.plant.id);
		setOpen(false);
	};
	console.log(props.plant.id);
	return (
		<div className="col-lg-4 col-sm-12 my-3">
			<div className={"rounded border p-3 m-auto"}>
				<div className="d-flex justify-content-end">
					<IconButton onClick={() => handleClick()}>
						<CloseSharp />
					</IconButton>
				</div>

				<h4 className="text-center">{props.plant.name}</h4>
				<hr className="mx-3" />
				<div className="d-flex justify-content-around">
					<p>{props.plant.le} le</p>
					<p>{props.plant.hrs} hrs</p>
				</div>
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea eliminar esta planta?"}</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleDelete} color="primary" autoFocus>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
Plant.propTypes = {
	plant: PropTypes.object,
	mobile: PropTypes.bool
};
