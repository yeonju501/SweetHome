import spinner from "assets/spinner.gif";

function Spinner() {
	return (
		<div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center" }}>
			<img
				src={spinner}
				alt="Loading..."
				style={{ margin: "0 auto", width: "15rem", height: "15rem" }}
			/>
		</div>
	);
}

export default Spinner;
