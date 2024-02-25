import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import useGroup from "../hooks/useGroup";
import LeftSidebar from "./includes/LeftSidebar";
import RightSidebar from "./includes/RightSidebar";

function Group() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [group, setGroup] = useState(null);
	const [posts, setPosts] = useState([]);
	const user = useSelector((state) => state.user);

	async function onInit() {
		const formData = new FormData();
		formData.append("_id", id);

		const response = await useGroup.fetchSingle(formData);
		if (response.status === "success") {
			setGroup(response.group);
			setPosts(response.data);
		} else {
			Swal.fire("Error", response.message, "error");
		}
	}

	async function deleteGroup() {
		Swal.fire({
			title: "Are you sure you want to delete this group?",
			showCancelButton: true,
			confirmButtonText: "Delete Group",
		}).then(async function (result) {
			if (result.isConfirmed) {
				const formData = new FormData();
				formData.append("accessToken", localStorage.getItem("accessToken"));
				formData.append("_id", id);

				const response = await useGroup.destroy(formData);
				if (response.status === "success") {
					navigate("/Groups");
				} else {
					Swal.fire("Error", response.message, "error");
				}
			}
		});
	}

	useEffect(function () {
		onInit();
	}, []);

	return (
		<>
			{group != null && (
				<>
					<section
						style={{
							background: `url(${group.coverPhoto}) center/cover no-repeat`,
							position: "relative",
							zIndex: 1,
						}}
					>
						<div
							className="feature-photo"
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								padding: "20px",
								borderRadius: "10px",
								backdropFilter: "blur(10px)",
							}}
						>
							<figure>
								<img
									id="group-cover-photo"
									src={group.coverPhoto}
									style={{
										objectFit: "cover",
										width: "100%",
										height: "calc(100vw * 9 / 21)",
										maxHeight: "400px",
									}}
									alt="Group Cover"
								/>
							</figure>

							<div className="add-btn">
								<span
									id="group-members"
									style={{
										backgroundColor: "#3498db",
										padding: "5px 10px",
										borderRadius: "15px",
										color: "#fff",
									}}
								>
									{group.members.length} members
								</span>
							</div>

							<div className="container-fluid">
								<div className="row merged">
									<div className="col-md-9">
										<div className="timeline-info">
											<ul>
												<li
													className="admin-name"
													style={{
														padding: 25,
													}}
												>
													<h5 id="group-name">{group.name}</h5>
													<p>
														Created by:
														<span id="group-admin">
															<Link
																to={`/Search/${group.user.name}#people`}
																style={{ color: "#3498db" }}
															>
																{group.user.name}
															</Link>
														</span>
													</p>
												</li>

												<li className="pull-right">
													<Link
														to={`/EditGroup/${id}`}
														id="link-edit-group"
														className="btn btn-info"
														style={{
															position: "relative",
															top: 45,
															marginRight: 10,
														}}
													>
														Edit
													</Link>

													<form
														method="POST"
														id="form-delete-group"
														style={{
															position: "relative",
															top: 28,
														}}
														onSubmit={(event) => {
															event.preventDefault();
															deleteGroup();
														}}
													>
														<button
															type="submit"
															className="btn btn-danger btn-sm"
														>
															Delete
														</button>
													</form>
												</li>
											</ul>
										</div>
									</div>
								</div>
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

export default Group;
