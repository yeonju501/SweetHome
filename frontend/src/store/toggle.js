const CLICK_TOGGLE = "toggle/SET_TOGGLE";
const CHANGE_POSITION = "toggle/SET_POSITION";

const toggleState = {
	toggleValue: false,
	position: "main",
};

export const SET_TOGGLE = (currentToggle, currentPositon) => ({
	type: CLICK_TOGGLE,
	currentToggle,
	currentPositon,
});

export const SET_POSITION = (currentToggle, currentPositon) => ({
	type: CHANGE_POSITION,
	currentToggle,
	currentPositon,
});
