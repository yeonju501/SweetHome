export function SignUpValid(email, password, phone_number) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	const regNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/;

	return regEmail.test(email) && regPassword.test(password) && regNumber.test(phone_number);
}

export function SignInValid(email, password) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/;
	const isValidation = regEmail.test(email) && regPassword.test(password);
	return isValidation;
}
