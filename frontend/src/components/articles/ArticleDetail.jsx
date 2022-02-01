import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comments from "../comments/Comments";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ArticleDetail({ articleId }) {
	const token = useSelector((state) => state.token.token);

	const [member, setMember] = useState();
	const [articleData, setArticleData] = useState();

	useEffect(() => {
		axios({
			url: `${SERVER_URL}/api/boards/articles/${articleId}`,
			method: "get",
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<div>게시판 제목</div>
			<article>
				<div>
					<p>닉네임</p>
					<p>작성 날짜</p>
					<p>작성 시간</p>
				</div>
				<div>
					<button>쪽지</button>
					<button>신고</button>
				</div>
				<div>
					<button>수정</button>
					<button>삭제</button>
				</div>
				<h3>글 제목</h3>
				<p>글 내용</p>
				<div>
					<span>좋아요 수</span>
					<span>댓글 수</span>
					<button>🤍</button>
				</div>
			</article>
			<div>
				<Comments />
			</div>
		</div>
	);
}

export default ArticleDetail;
