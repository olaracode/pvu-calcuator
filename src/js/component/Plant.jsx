import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import { CloseSharp } from "@material-ui/icons";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Plant = props => {
	const container = props.mobile ? "rounded border p-3 m-auto" : "w-75 rounded border p-3 m-auto";
	const { store, actions } = useContext(Context);
	console.log(props.plant.id);
	return (
		<div className="col-lg-4 col-sm-12 my-3">
			<div className={container}>
				<div className="d-flex justify-content-end">
					<IconButton onClick={() => actions.deletePlant(props.plant.id)}>
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
		</div>
	);
};
Plant.propTypes = {
	plant: PropTypes.object,
	mobile: PropTypes.bool
};
