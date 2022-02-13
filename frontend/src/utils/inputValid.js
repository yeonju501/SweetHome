export function signUpValid(email, password, phone_number) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	const regNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/;

	return regEmail.test(email) && regPassword.test(password) && regNumber.test(phone_number);
}

export function signInValid(email, password) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/;
	const isValidation = regEmail.test(email) && regPassword.test(password);
	return isValidation;
}

export function profileChange(email, phone_number) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	const regNumber = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

	return regEmail.test(email) && regNumber.test(phone_number);
}

export function emailValid(email) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	return regEmail.test(email);
}
