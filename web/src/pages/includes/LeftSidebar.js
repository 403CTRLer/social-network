import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const LeftSidebar = function () {
	const user = useSelector((state) => state.user);
	const [friendsCount, setFriendsCount] = useState(0);

	useEffect(() => {
		if (user != null) {
			var tempFriendsCount = 0;
			for (var a = 0; a < user.friends.length; a++) {
				if (
					user.friends[a].status === "Pending" &&
					!user.friends[a].sentByMe
				) {
					tempFriendsCount++;
				}
			}
			setFriendsCount(tempFriendsCount);
		}
	}, [user]);

	return (
		<aside
			style={{
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
				<h4 className="widget-title">Shortcuts</h4>
				<ul className="naves" id="left-sidebar">
					<li>
						<i className="ti-user"></i>
						&nbsp;
						<Link to="/Friends">
							Friends
							{friendsCount > 0 && (
								<span
									style={{
										backgroundColor: "#3498db",
										padding: "5px 10px",
										borderRadius: "15px",
										color: "#fff",
										marginLeft: "5px",
									}}
								>
									({friendsCount})
								</span>
							)}
						</Link>
					</li>

					<li>
						<i className="ti-comments-smiley"></i>
						&nbsp;
						<Link to="/Inbox">
							Inbox{" "}
							<span
								className="badge"
								id="inbox-badge"
								style={{ backgroundColor: "#3498db" }}
							></span>
						</Link>
					</li>

					<li>
						<i className="ti-files"></i>
						&nbsp;<Link to="/CreatePage">Create page</Link>
					</li>

					<li>
						<i className="ti-magnet"></i>
						&nbsp;<Link to="/CreateGroup">Create group</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};

export default LeftSidebar;
