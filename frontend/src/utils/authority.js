const authority_value = ["", "준회원", "정회원", "아파트관리자", "어드민"];

export function authorityCheck(authority) {
	return authority_value.indexOf(authority);
}
