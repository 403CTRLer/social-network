import React, { useState } from "react";
import LeftSidebar from "./includes/LeftSidebar";
import RightSidebar from "./includes/RightSidebar";
import usePage from "../hooks/usePage";
import Swal from "sweetalert2";

function CreatePage() {
	const { createPage } = usePage();
	const [formData, setFormData] = useState({
		name: "",
		domainName: "",
		additionalInfo: "",
		coverPhoto: null,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: files[0],
		}));
	};

	const onSubmitCreatePage = async (e) => {
		e.preventDefault();
		const form = document.getElementById("form-create-page");
		const formElement = new FormData(form);
		formElement.append("accessToken", localStorage.getItem("accessToken"));

		const response = await createPage(formElement);

		if (response.status === "error") {
			Swal.fire("Error", response.message, "error");
		} else if (response.status === "success") {
			Swal.fire("Success", response.message, "success");
			setFormData({
				name: "",
				domainName: "",
				additionalInfo: "",
				coverPhoto: null,
			});
		}
	};

	return (
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
									<div className="central-meta">
										<div className="editing-info">
											<h5 className="f-title">
												<i className="ti-info-alt"></i>
												Create Page
											</h5>

											<form onSubmit={onSubmitCreatePage} id="form-create-page">
												<div className="form-group">
													<label>Cover photo</label>
													<input
														type="file"
														name="coverPhoto"
														accept="image/*"
														onChange={handleFileChange}
														required
													/>
													<i className="mtrl-select"></i>
													<br />
													<br />
												</div>

												<div className="form-group">
													<input
														type="text"
														name="name"
														value={formData.name}
														onChange={handleInputChange}
														required
													/>
													<label className="control-label">Page Name</label>
													<i className="mtrl-select"></i>
													<br />
													<br />
												</div>

												<div className="form-group">
													<input
														type="text"
														name="domainName"
														value={formData.domainName}
														onChange={handleInputChange}
													/>
													<label className="control-label">www.yourdomain.com</label>
													<i className="mtrl-select"></i>
													<br />
													<br />
												</div>

												<div className="form-group">
													<textarea
														rows="4"
														name="additionalInfo"
														value={formData.additionalInfo}
														onChange={handleInputChange}
														required
													></textarea>
													<label className="control-label">Additional Info</label>
													<i className="mtrl-select"></i>
													<br />
													<br />
												</div>

												<button type="submit" className="mtr-btn" name="submit">
													<span>Save</span>
												</button>
											</form>
										</div>
									</div>
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
	);
}

export default CreatePage;
