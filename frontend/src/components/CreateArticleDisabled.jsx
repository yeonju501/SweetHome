function CreateArticleDisabled({ setDisabled }) {
	const handleCreateArticleClick = () => {
		setDisabled((prev) => !prev);
	};

	return (
		<div onClick={handleCreateArticleClick}>
			<p>글을 작성해보세요!</p>
		</div>
	);
}

export default CreateArticleDisabled;
