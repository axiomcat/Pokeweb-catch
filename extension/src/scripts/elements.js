
export function getModal(poke, foundWindow, n) {
	var div = document.createElement("button");
	div.innerText = `We found ${poke}`;
	div.style = `color: blue; background-color: white; width: 200px; height: 20px; z-index: 10; position: fixed; opacity: 0.8; top: ${n * 30}px; right: 0px;`
	div.onclick = () => {
		console.log("Clicked ", poke)
		highlightMatchingText(foundWindow)
	}
	return div
}

function highlightMatchingText(text) {
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
	const matches = [];
	const lowerText = text.toLowerCase();

	while (walker.nextNode()) {
		const node = walker.currentNode;
		const nodeText = node.nodeValue;

		const index = nodeText.toLowerCase().indexOf(lowerText);
		if (index !== -1) {
			matches.push({ node, index });
			break;
		}
	}

	if (matches.length === 0) {
		console.warn('Text not found:', text);
		return;
	}

	const { node, index } = matches[0];

	const span = document.createElement('span');
	span.className = 'highlight';
	span.textContent = node.nodeValue.slice(index, index + text.length);

	const after = node.splitText(index);
	after.nodeValue = after.nodeValue.slice(text.length);

	node.parentNode.insertBefore(span, after);

	span.scrollIntoView({ behavior: 'smooth', block: 'center' });

	setTimeout(() => {
		span.classList.remove('highlight');
	}, 5000);
}
