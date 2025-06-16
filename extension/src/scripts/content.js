import { getDistanceWithinText } from "./matching";
import { ALL_POKEMON } from "./pokemon"
import { getModal } from "./elements";

const SERVER_URL = "https://4eb0-186-113-98-91.ngrok-free.app"
const theText = document.body.innerText
const text = theText.toLowerCase()

const DISTANCE_THRESHOLD = 1;

let foundCount = 0

let foundSet = {}
for (const poke of ALL_POKEMON) {
	const { minDistance, foundWindow } = getDistanceWithinText(poke, text)
	if (minDistance <= DISTANCE_THRESHOLD) {
		console.log("Found ", poke, minDistance, foundWindow)
		const modal = getModal(poke, foundWindow, foundCount)
		document.body.appendChild(modal)
		foundCount += 1;
		foundSet[poke] = true
		fetch(`${SERVER_URL}/?pokemon=${poke}`, { headers: { "ngrok-skip-browser-warning": "any-value" } })
	}
}
