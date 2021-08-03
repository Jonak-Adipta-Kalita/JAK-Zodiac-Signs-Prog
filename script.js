const dex = document.getElementById('dex');
const fetchSigns = async () => {
    const url = "/zodiac.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const signs = data.signs.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displaySigns(signs);
};

const displaySigns = (sign) => {
    const signsHTMLString = sign
        .map((signe) => (`
			<li class="card" onclick="selectSign(${signe.id})">
				<img class="card-image" src="${signe.image}"/>
				<h2 class="card-title">${signe.id}. ${signe.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = signsHTMLString;
};

const selectSign = async (id) => {
	const url = `\zodiac.json`;
	const res = await fetch(url);
	const signe = await res.json();
	displayPopup(signe, id);
};

const displayPopup = (signe, id) => {
	const image = `./images/${signe.signs[id - 1].image}`;

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${signe.signs[id - 1].id + 1}. ${signe.signs[id - 1].name}
				</h2>
				<p><small>Element: </small>${signe.signs[id - 1].element}</p>
				<p><small>Emoji: </small>${signe.signs[id - 1].emoji}</p>
				<p><small>Dates: </small>${signe.signs[id - 1].dates}</p>
				<p><small>Rulling Celestial Body: </small>${signe.signs[id - 1].rulling_celestial_body}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchSigns();
