const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pvuPrice: 0,
			plants: [],
			monthlyLe: 0,
			monthlyProfit: 0
		},
		actions: {
			// Use getActions to call a function within a fuction
			setPvuPrice: price => {
				setStore({ pvuPrice: price });
				console.log(getStore().pvuPrice);
			},
			getIncome: () => {
				let le = 0;
				let plants = getStore().plants;
				const getLe = () =>
					plants.map(plant => {
						let lePerHour = plant.profit / plant.hrs;
						console.log(lePerHour);
						let monthly = lePerHour * 730;
						le += monthly;
					});
				getLe();
				console.log(le);
				setStore({ monthlyLe: le });
				let profit = Math.floor(le / 150);
				setStore({ monthlyProfit: profit });
			},
			getPlantas: () => {
				setStore({ plants: JSON.parse(localStorage.getItem("plants")) });
				getActions().getIncome();
			},
			deletePlant: id => {
				console.log(id);
				let plants = getStore().plants;
				let filteredPlants = plants.filter(plant => {
					if (plant.id !== id) {
						return plant;
					}
				});
				setStore({ plants: filteredPlants });
				localStorage.setItem("plants", JSON.stringify(getStore().plants));

				getActions().getIncome();
			},
			addPlant: plant => {
				if (getStore().plants.length === 0) {
					setStore({ plants: [plant] });
					getActions().getIncome();

					localStorage.setItem("plants", JSON.stringify(getStore().plants));
				} else {
					setStore({ plants: [...getStore().plants, plant] });
					getActions().getIncome();

					localStorage.setItem("plants", JSON.stringify(getStore().plants));
				}
			}
		}
	};
};

export default getState;
