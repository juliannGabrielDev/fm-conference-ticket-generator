const inAvatar = document.getElementById("avatar-input");
const inName = document.getElementById("in-name");
const inEmail = document.getElementById("in-email");
const inUser = document.getElementById("in-user");

const emailDisclaimer = document.getElementById("email-disclaimer");

const dropArea = document.getElementById("drop-area");
const avatarInputArea = document.getElementById("avatar-input-area");
const avatarInfo = document.getElementById("avatar-info");

const imagePreview = document.getElementById("image-preview");
const avatarDisclaimer = document.getElementById("avatar-disclaimer");

const removeAvatarBtn = document.getElementById("remove-avatar-btn");
const changeAvatarBtn = document.getElementById("change-avatar-btn");
const generateBtn = document.getElementById("generate-btn");

const MAX_SIZE_KB = 500;
const AVATAR_DISCLAIMER = "Upload your photo (JPG or PNG, max size: 500KB).";
let selectedAvatar = null;
let avatarDataUrl = null;

/* Beginning of avatar input logic */
const showAvatarError = (message) => {
	avatarDisclaimer.textContent = message;
	avatarDisclaimer.style.color = "hsl(7, 71%, 60%)";
	selectedAvatar = null;
	imagePreview.src = "";
	inAvatar.value = "";
	avatarInputArea.style.display = "flex";
	avatarInfo.style.display = "none";
};

const resetAvatarDisclaimer = () => {
	avatarDisclaimer.textContent = AVATAR_DISCLAIMER;
	avatarDisclaimer.style.color = "";
};

const resetAvatarInput = () => {
	selectedAvatar = null;
	avatarInfo.style.display = "none";
	avatarInputArea.style.display = "flex";
	imagePreview.src = "";
	inAvatar.value = "";
	avatarDataUrl = null;
};

const handleFile = (file) => {
	resetAvatarDisclaimer();

	if (!file.type.includes("image/")) {
		alert("Please, upload an image file");
		inAvatar.value = "";
		return;
	}
	if (file.size > MAX_SIZE_KB * 1024) {
		showAvatarError("File too large. Please upload a photo under 500KB.");
		return;
	}
	selectedAvatar = file;
	avatarInfo.style.display = "grid";
	avatarInputArea.style.display = "none";

	const reader = new FileReader();
	reader.onload = (e) => {
		imagePreview.src = e.target.result;
		avatarDataUrl = e.target.result;
	};
	reader.readAsDataURL(file);
};

dropArea.addEventListener("dragover", (e) => {
	e.preventDefault();
	dropArea.classList.add("dragover");
});
dropArea.addEventListener("dragleave", () =>
	dropArea.classList.remove("dragover")
);
dropArea.addEventListener("drop", (e) => {
	e.preventDefault();
	dropArea.classList.remove("dragover");
	const file = e.dataTransfer.files[0];
	if (file && file.type.startsWith("image/")) {
		handleFile(file);
	} else if (file) {
		alert("Please, upload an image file");
	}
});
inAvatar.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file && file.type.startsWith("image/")) {
		handleFile(file);
	} else if (file) {
		alert("Please, upload an image file");
		inAvatar.value = "";
	}
});

dropArea.addEventListener("click", () => inAvatar.click());

removeAvatarBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	resetAvatarInput();
});

changeAvatarBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	inAvatar.click();
});
/* End of avatar input logic */

/* Beginning of email input logic */
const EMAIL_DISCLAIMER = "Please enter a valid email address";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showEmailError = (message) => {
	emailDisclaimer.textContent = message;
	emailDisclaimer.style.display = "block";
	inEmail.style.borderColor = "hsl(7, 71%, 60%)";
};

const hideEmailError = () => {
	emailDisclaimer.style.display = "none";
	inEmail.style.borderColor = "";
};

inEmail.addEventListener("input", (e) => {
	const value = e.target.value;
	if (!EMAIL_REGEX.test(value)) {
		showEmailError(EMAIL_DISCLAIMER);
	} else {
		hideEmailError();
	}
});
/* End of email input logic */

/* Beginning of generate button logic */
const h1 = document.getElementById("title");
const pDescription = document.getElementById("p-description");

const ticketForm = document.getElementById("ticket-form");

const ticket = document.getElementById("ticket");
const ticketAvatar = document.getElementById("ticket-avatar");
const ticketName = document.getElementById("ticket-name");
const ticketUser = document.getElementById("ticket-user");
const ticketCode = document.getElementById("ticket-code");

const formData = {
	avatar: null,
	name: null,
	email: null,
	user: null,
};

const generateCode = () => {
	return Math.floor(10000 + Math.random() * 90000);
}

const showTicketScreen = () => {
	const TICKET_MESSAGE = `Congrats, <span class="title-name">${formData.name}!</span> Your ticket is ready.`;
	const TICKET_DESCRIPTION = `We've emailed your ticket to <span class="p-description-email">${formData.email}</span> and will send updates in the run up to the event.`;

	h1.innerHTML = TICKET_MESSAGE;
	pDescription.innerHTML = TICKET_DESCRIPTION;

	ticketName.textContent = formData.name;
	ticketUser.textContent = formData.user;
	ticketCode.textContent = generateCode();
	ticketAvatar.src = formData.avatar;
};

const validateForm = () => {
	const validFields = {
		avatar: selectedAvatar !== null,
		name: inName.value.trim() !== "",
		email: EMAIL_REGEX.test(inEmail.value),
		user: inUser.value.trim() !== "",
	};

	generateBtn.disabled = !(
		validFields.avatar &&
		validFields.name &&
		validFields.email &&
		validFields.user
	);
};

validateForm();

inAvatar.addEventListener("change", validateForm);
inName.addEventListener("input", validateForm);
inEmail.addEventListener("input", validateForm);
inUser.addEventListener("input", validateForm);

generateBtn.addEventListener("click", (e) => {
	e.preventDefault();

	ticketForm.style.display = "none";
	ticket.style.display = "grid";

	formData.avatar = avatarDataUrl;
	formData.name = inName.value;
	formData.email = inEmail.value;
	formData.user = inUser.value;

	showTicketScreen();
});
/* End of generate button logic */
