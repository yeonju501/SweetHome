const authority_value = ["준회원", "정회원", "아파트관리자", "어드민"];

export function authorityCheck(authority) {
	console.log(authority_value.indexOf(authority));
	if (authority === "") return 0;
	else return authority_value.indexOf(authority);
}
