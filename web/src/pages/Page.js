import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2"

import usePage from "../hooks/usePage"
import LeftSidebar from "./includes/LeftSidebar"
import RightSidebar from "./includes/RightSidebar"

function Page() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [page, setPage] = useState(null)
	const [posts, setPosts] = useState([])
	const [hasLiked, setHasLiked] = useState(false)
	const [totalLikes, setTotalLikes] = useState(false)
	const { getPageDetail, toggleLikePage, deletePage } = usePage()
	const user = useSelector(function (state) {
		return state.user
	})
	const dispatch = useDispatch()

	async function onInit() {
		const formData = new FormData()
		formData.append("_id", id)

		const response = await getPageDetail(formData)
		if (response.status == "success") {
			setPage(response.data)
			setPosts(response.posts)

			let tempIsLiked = false
			if (user != null) {
				for (var a = 0; a < response.data.likers.length; a++) {
					var liker = response.data.likers[a]

					if (liker._id.toString() == user._id.toString()) {
						tempIsLiked = true
						break
					}
				}
			}
			setHasLiked(tempIsLiked)
			setTotalLikes(response.data.likers.length)
		} else {
			Swal.fire("Error", response.message, "error")
		}
	}

	async function onClickToggleLikePage() {
		event.preventDefault()

		const formData = new FormData()
		formData.append("accessToken", localStorage.getItem("accessToken"))
		formData.append("_id", id)

		const response = await toggleLikePage(formData)
		if (response.status == "success") {
			setHasLiked(true)
			setTotalLikes(totalLikes + 1)

			if (user != null) {
				const tempPages = [...user.pages]
				for (let a = tempPages.length - 1; a >= 0; a--) {
					if (tempPages[a]._id == id) {
						tempPages[a].likers.unshift(response.obj)
						break
					}
				}
				const tempUser = Object.assign({}, user)
				tempUser.pages = tempPages
				dispatch({
					type: "updateUser",
					user: tempUser
				})
			}
		} else if (response.status == "unliked") {
			setHasLiked(false)
			setTotalLikes(totalLikes - 1)

			if (user != null) {
				const tempPages = [...user.pages]
				for (let a = tempPages.length - 1; a >= 0; a--) {
					if (tempPages[a]._id == id) {
						for (let b = tempPages[a].likers.length - 1; b >= 0; b--) {
							if (tempPages[a].likers[b]._id == user._id) {
								tempPages[a].likers.splice(b, 1)
								break
							}
						}
					}
				}
				const tempUser = Object.assign({}, user)
				tempUser.pages = tempPages
				dispatch({
					type: "updateUser",
					user: tempUser
				})
			}
		} else {
			Swal.fire("Error", response.message, "error")
		}
	}

	async function onSubmitDeletePage() {
		Swal.fire({
			title: "Are you sure you want to delete this page ?",
			showCancelButton: true,
			confirmButtonText: "Delete Page"
		}).then(async function (result) {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				const formData = new FormData()
				formData.append("accessToken", localStorage.getItem("accessToken"))
				formData.append("_id", id)

				const response = await deletePage(formData)
				if (response.status == "success") {
					// navigate("/Pages")

					if (user != null) {
						const tempPages = [...user.pages]
						for (let a = tempPages.length - 1; a >= 0; a--) {
							if (tempPages[a]._id == id) {
								tempPages.splice(a, 1)
								break
							}
						}
						const tempUser = Object.assign({}, user)
						tempUser.pages = tempPages
						dispatch({
							type: "updateUser",
							user: tempUser
						})
					}
				} else {
					Swal.fire("Error", response.message, "error")
				}
			}
		})
	}

	useEffect(function () {
		onInit()
	}, [])
	return (
		<>
			{page != null && (
				<>
					<section
						style={{
							background: `url(${page.coverPhoto}) center/cover no-repeat`,
							position: 'relative',
							zIndex: 1,
						}}
					>
						<div
							className="feature-photo"
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
								padding: '20px',
								borderRadius: '10px',
								backdropFilter: 'blur(10px)',
							}}
						>
							<figure>
								<img
									id="page-cover-photo"
									src={page.coverPhoto}
									style={{
										objectFit: 'cover',
										width: '100%',
										height: 'calc(100vw * 9 / 21)',
										maxHeight: '400px',
										borderRadius: '10px',
									}}
									alt="Page Cover"
								/>
							</figure>

							<div className="add-btn">
								<span
									id="page-likes"
									style={{
										backgroundColor: '#3498db',
										padding: '5px 10px',
										borderRadius: '15px',
										color: '#fff',
										marginRight: '10px',
									}}
								>
									{totalLikes} likes
								</span>

								<button
									onClick={onClickToggleLikePage}
									id="btn-toggle-like"
									className={`btn ${hasLiked ? 'btn-secondary' : 'btn-primary'}`}
								>
									{hasLiked ? 'Unlike' : 'Like'}
								</button>
							</div>

							<div className="timeline-info">
								<ul>
									<li className="admin-name" style={{ padding: 25 }}>
										<h5 id="page-name">{page.name}</h5>
										<p>
											Created by:&nbsp;
											<span id="page-admin">
												<Link to={`/search/${page.user.name}#people`}>{page.user.name}</Link>
											</span>
										</p>
									</li>

									<li className="pull-right">
										<Link
											to={`/EditPage/${id}`}
											id="link-edit-page"
											className="btn btn-info"
											style={{
												position: 'relative',
												top: '45px',
												marginRight: '120px',
											}}
										>
											Edit
										</Link>

										<form
											method="POST"
											id="form-delete-page"
											style={{
												position: 'relative',
												top: 28,
											}}
											onSubmit={(e) => {
												e.preventDefault();
												onSubmitDeletePage();
											}}
										>
											<button type="submit" className="btn btn-danger btn-sm">
												Delete
											</button>
										</form>
									</li>
								</ul>
							</div>
						</div>
					</section>

					<section>
						<div className="gap gray-bg">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-12">
										<div className="row" id="page-contents">
											<div className="col-md-3">
												<LeftSidebar />
											</div>

											<div className="col-md-6">
												<div id="add-post-box"></div>
												<div className="loadMore" id="newsfeed"></div>
											</div>

											<div className="col-md-3">
												<RightSidebar />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);

}

export default Page