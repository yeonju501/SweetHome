import spinner from "../assets/spinner.gif";

function Spinner() {
	return (
		<div>
			<img src={spinner} alt="Loading..." style={{ textAlign: "center", width: "20rem" }} />
		</div>
	);
}

export default Spinner;
