
export function getModal(poke, n) {
	console.log("Hey! We found ", poke, n, n * 90)
	var div = document.createElement("div");
	div.innerText = `We found ${poke}`;
	div.style = `color: blue; background-color: white; width: 200px; height: 80px; z-index: 10; position: fixed; opacity: 0.8; top: ${n * 90}px; right: 0px;`
	return div
}
