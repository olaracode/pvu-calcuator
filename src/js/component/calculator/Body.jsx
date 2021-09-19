import React, { useContext } from "react";
import { Form } from "./Form.jsx";
import { Plant } from "../Plant.jsx";
import { Context } from "../../store/appContext";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

export const Body = () => {
	const { store, actions } = useContext(Context);
	let totalProfit = store.pvuPrice * store.monthlyProfit;

	return (
		<div className="px-5 my-3 py-2">
			<div className="w-75 m-auto card">
				<div className="card-header d-flex justify-content-between align-items-center">
					<h4>
						Plants:
						{store.plants.length < 0 ? 0 : store.plants.length}
					</h4>
				</div>
				<div className="card-body">
					<Form />
					<hr />

					<div className="row p-5">
						{store.plants.map(currentPlant => {
							return <Plant key={currentPlant.id} plant={currentPlant} mobile={false} />;
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
	);
};
