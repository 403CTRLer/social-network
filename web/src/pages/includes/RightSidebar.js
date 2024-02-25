import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSidebar = function () {
	const user = useSelector((state) => state.user);

	return (
		<aside
			style={{
				position: "sticky",
				top: 100,
				background: "rgba(200, 200, 200, 0.3)",
				backdropFilter: "blur(100px)",
				borderRadius: "10px",
				padding: "20px",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
				transition: "background 0.3s ease-in-out",
				overflow: "hidden",
			}}
		>
			<div className="widget" style={{ minHeight: "100%" }}>
				<h4 className="widget-title">Your pages</h4>

				<div id="my-pages">
					{user != null && (
						<>
							{user.pages.map(function (data) {
								return (
									<div
										className="your-page"
										key={`my-page-${data._id}`}
										style={{
											marginBottom: "20px",
											padding: "10px",
											borderRadius: "10px",
											background: "#2c3e50", // Adjust the background color
										}}
									>
										<figure>
											<Link to={`/page/${data._id}`}>
												<img
													src={data.coverPhoto}
													style={{
														width: "100%",
														height: "auto",
														borderRadius: "5px",
													}}
													alt={`${data.name}'s cover`}
												/>
											</Link>
										</figure>

										<div className="page-meta" style={{ marginTop: "10px" }}>
											<Link
												to={`/Page/${data._id}`}
												className="underline"
												style={{ color: "#ecf0f1" }} // Adjust the text color
											>
												{data.name}
											</Link>
										</div>

										<div
											className="page-likes"
											style={{
												marginTop: "10px",
												borderTop: "1px solid #34495e", // Adjust the border color
												paddingTop: "10px",
											}}
										>
											<ul className="nav nav-tabs likes-btn">
												<li
													className="nav-item"
													style={{ width: "100%" }}
												>
													<a
														className="active"
														href="#page-likes"
														data-toggle="tab"
														style={{ borderBottom: "none" }}
													>
														<span style={{ float: "left", marginLeft: "8px" }}>
															Likes
														</span>
														<span
															style={{
																float: "right",
																marginRight: "20px",
																color: "#e74c3c", // Adjust the color
															}}
														>
															<i className="ti-heart"></i> {data.likers.length}
														</span>
													</a>
												</li>
											</ul>
										</div>
									</div>
								);
							})}
						</>
					)}
				</div>
			</div>
		</aside>
	);
};

export default RightSidebar;
