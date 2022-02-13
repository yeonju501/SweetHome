import { useEffect } from "react";

function ProfileMove({ user }) {
	useEffect(() => {
		console.log(user);
	});
	return (
		user && (
			<div>
				<h1></h1>
				<p>{user.apt_house.apt.road_Name}</p>
				<p>hi</p>
			</div>
		)
	);
}

export default ProfileMove;
