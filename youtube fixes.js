// ==UserScript==
// @name         Youtube Fixes
// @namespace    http://tampermonkey.net/
// @version      1.7.5
// @description  Fixes various UI things on youtube (and maybe some other stuff)
// @author       Matrix685
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/Matrix685/Tampermonkey/refs/heads/main/youtube%20fixes.js
// @updateURL    https://raw.githubusercontent.com/Matrix685/Tampermonkey/refs/heads/main/youtube%20fixes.js
// ==/UserScript==

(function () {
	"use strict";

	// Your code here...
	console.log("%cfixing all the shit youtube broke (or made worse). one moment please", "color: #f66; font-size: 3rem;");

	setInterval(() => {
		fixShortLinks();
		ambientMode();
		fullscreenButton();
	}, 500);

	betterCSS();
	endcardsToggle();
	shortsPulveriser();
	shortsRenamer();

	function fixShortLinks() {
		const shorts = document.querySelectorAll("ytm-shorts-lockup-view-model-v2:not(.fixed-this-youtube-short-thing)");
		const referenceShorts = document.querySelectorAll("ytm-shorts-lockup-view-model-v2");

		try {
			let metadataPosition;

			for (const short of referenceShorts) {
				const metaButton = short.querySelector("div.shortsLockupViewModelHostOutsideMetadata.shortsLockupViewModelHostMetadataRounded");
				const image = short.querySelector("a.shortsLockupViewModelHostEndpoint");

				// console.log(short.offsetHeight);
				if (metaButton.offsetTop != 0) metadataPosition = short.offsetHeight - image.offsetHeight;
			}

			// console.log(metadataPosition);

			document.documentElement.style.setProperty("--metadata-position", `${metadataPosition}px`);
		} catch {
			// console.log("%cfound an oopsie", "color: blue;");
			// return;
		}

		shorts.forEach((short) => {
			const shortsContainer = short.parentElement;

			const newContainer = document.createElement("div");
			newContainer.style.position = "relative";
			newContainer.classList.add("yt-horizontal-list-renderer");

			shortsContainer.appendChild(newContainer);

			let link = `https://www.youtube.com/watch?v=${short.firstChild.firstChild.href.substring(31)}`;

			let a = document.createElement("a");

			a.href = link;

			newContainer.appendChild(a);

			a.appendChild(short);

			const oldMetadataMenuButton = short.querySelector(".shortsLockupViewModelHostOutsideMetadataMenu");

			try {
				newContainer.appendChild(oldMetadataMenuButton);
			} catch {}

			const newMetadataMenuButton = newContainer.lastElementChild;

			newMetadataMenuButton.classList.add("its-like-a-button-or-something-idk");

			const metabuttonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			metabuttonSVG.setAttribute("width", "24");
			metabuttonSVG.setAttribute("height", "24");
			metabuttonSVG.setAttribute("viewBox", "0 0 24 24");

			const SVGpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
			SVGpath.style.fill = "white";
			SVGpath.setAttribute("d", "M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z");

			metabuttonSVG.appendChild(SVGpath);

			newMetadataMenuButton.querySelector("button").replaceChild(metabuttonSVG, newMetadataMenuButton.querySelector("button").firstElementChild);

			newMetadataMenuButton.onclick = () => short.querySelector("ytm-shorts-lockup-view-model-v2 .shortsLockupViewModelHostOutsideMetadataMenu").firstElementChild.click();

			a.querySelectorAll("*:not(.shortsLockupViewModelHostOutsideMetadataMenu.shortsLockupViewModelHostShowOverPlayer)").forEach((n) => (n.style.pointerEvents = "none"));

			try {
				short.querySelector(".shortsLockupViewModelHostOutsideMetadataMenu").style.visibility = "hidden !important";
			} catch {
				// console.log("hel");
			}

			short.classList.add("fixed-this-youtube-short-thing");
		});
	}

	function betterCSS() {
		//    side scroll buttons in shorts                                                                               uploader avatars on homepage    toggles in player menu           stuff in the player                             circle in timeline             avatar in endcard                                                                                                      big avatar on channel page            volume knob               icons + images           avatar in playlists                       autoplay toggle           collab avatars
		document.querySelector("head > style.global_styles").innerText += `
	        *:not(ytd-button-renderer.yt-horizontal-list-renderer *):not(ytd-button-renderer.yt-horizontal-list-renderer):not(div#avatar-container *):not(div.ytp-menuitem-toggle-checkbox):not(.ytp-bezel):not(.ytp-doubletap-ui-legacy *):not(.ytp-scrubber-container *):not(div[class*=ytp-ce-channel]):not(div[class*=ytp-ce-channel] > .ytp-ce-expanding-image):not(.ytp-ce-element-shadow):not(yt-decorated-avatar-view-model *):not(.ytp-volume-slider *):not(yt-img-shadow):not(.yt-avatar-stack-view-model-wiz__avatars *):not(.ytp-autonav-toggle *):not(avatar-view-model):not(avatar-view-model *)  {
			    border-radius: 0px !important;
		    }

			:root { /* position of stupid short button that no one will ever use */
				--metadata-position: 300px;
			}

			div.ytGridShelfViewModelGridShelfItem > div.yt-horizontal-list-renderer,
			div#content > div.yt-horizontal-list-renderer { /* wetter shorts */
				width: 100%;
				height: 100%;
			}

			div.yt-horizontal-list-renderer > a { /* better shorts */
				display: inline-block;
				width: 100%;
				height: 100%;
			}

			.its-like-a-button-or-something-idk { /* stupid short button that no one will ever use once again */
				position: absolute;
				bottom: var(--metadata-position);
				top: auto;
				transform: translateY(110%);
				right: 0px;
			}

			.its-like-a-button-or-something-idk > button { /* this button from hell needs so much maintenance omg */
				padding: 0px !important;
			}

			.ytp-ce-hide-button-container,
			div#cinematics-container,
			div#cinematics-full-bleed-container { /* things to hide because bad */
				display: none !important;
			}

			.i-hate-youtube-and-their-stupid-fullscreen-button { /* ever so slightly better fullscreen button */
				position: absolute;
				right: -30px;
				bottom: 0px;
				height: 100%;
				width: 100px;
				cursor: pointer;
			}

			.renamed-bitch { /* i dont like shorts */
				font-weight: bold;
				color: #f00;
				position: absolute;
				left: 0px;
			}

			.big-renamed-bitch { /* shorts are bad fight me */
				font-size: 30px;
				transform: rotate(-10deg);
				top: 0px;
			}

			.small-renamed-bitch { /* have i mentioned that i dislike shorts? */
				font-size: 40px;
				transform: rotate(-45deg);
				top: 5px;
			}
		`;
	}

	function endcardsToggle() {
		// positioning and styling
		const newItem = document.createElement("div");

		newItem.classList.add("ytp-menuitem");
		newItem.setAttribute("role", "menuitemcheckbox");
		newItem.setAttribute("aria-checked", "true");

		let append = setInterval(() => {
			const menu = document.querySelector("div.ytp-panel-menu");
			const previous = document.querySelector("div.ytp-menuitem:nth-child(3)");

			try {
				menu.insertBefore(newItem, previous);
			} catch {
				// console.log("%cfound an oopsie", "color: blue;");
				// return;
			}

			if (previous != null) clearInterval(append);
		}, 500);

		const icon = document.createElement("div");
		icon.classList.add("ytp-menuitem-icon");

		newItem.appendChild(icon);

		const label = document.createElement("div");
		label.classList.add("ytp-menuitem-label");

		const text = document.createTextNode("Toggle Endcards");
		label.appendChild(text);

		newItem.appendChild(label);

		const content = document.createElement("div");
		content.classList.add("ytp-menuitem-content");
		newItem.appendChild(content);

		const checkbox = document.createElement("div");
		checkbox.classList.add("ytp-menuitem-toggle-checkbox");
		content.appendChild(checkbox);

		// actual LOGIC
		let toggled = true;

		newItem.onclick = () => {
			let endCards = document.querySelectorAll(".ytp-ce-element");

			if (toggled) {
				newItem.setAttribute("aria-checked", "false");

				endCards.forEach((element) => {
					element.style.display = "none";
				});
			} else {
				newItem.setAttribute("aria-checked", "true");

				endCards.forEach((element) => {
					element.style.display = "inline";
				});
			}

			toggled = !toggled;
		};
	}

	function ambientMode() {
		const checkboxes = document.querySelectorAll("div[id*=ytp-id] > div.ytp-popup-content > div.ytp-panel > div.ytp-panel-menu > div[role=menuitemcheckbox]");

		let ambientToggle;

		for (const check of checkboxes) {
			if (check.children[1].innerText.toLowerCase() == "ambient mode") ambientToggle = check.children[2];
		}

		try {
			ambientToggle.innerText = "no :3";

			ambientToggle.style.fontSize = "2.5em";
			ambientToggle.style.fontWeight = "bold";
		} catch {
			// console.log("%cfound an oopsie", "color: blue;");
			// return;
		}
	}

	function fullscreenButton() {
		const controls = document.querySelector(".ytp-chrome-controls:not(.bad-button-made-less-bad-bbutton)");

		if (controls == null) return;

		controls.style.position = "relative";

		let newbutton = document.createElement("div");
		newbutton.classList.add("i-hate-youtube-and-their-stupid-fullscreen-button");

		try {
			controls.appendChild(newbutton);
		} catch {}

		newbutton.onclick = () => document.querySelector(".ytp-fullscreen-button").click();

		controls.classList.add("bad-button-made-less-bad-bbutton");
	}

	function shortsPulveriser() {
		let shortsbad = setInterval(() => {
			if (window.location.href.includes("/shorts/")) {
				console.warn("WE GOT SOME SHORTS. THIS IS NOT A DRILL");
				clearInterval(shortsbad);
				console.log(window.location.href.replace("/shorts/", "/watch?v="));
				window.location.href = window.location.href.replace("/shorts/", "/watch?v=");
			}
		}, 500);
	}

	function shortsRenamer() {
		// someday make this rickroll or something
		let mini = setInterval(() => {
			const labels = document.querySelectorAll("ytd-mini-guide-entry-renderer");

			let shortLabel;

			try {
				for (const entry of labels) {
					let stringList = Array.from(entry.querySelectorAll("span.title")).map((n) => n.innerText.toLowerCase());

					if (stringList.includes("shorts")) shortLabel = entry;
				}
			} catch {}

			if (shortLabel != undefined && shortLabel.querySelector(".renamed-bitch") == null) {
				console.log("triple check this is working");

				let overLabel = document.createElement("div");
				overLabel.classList.add("renamed-bitch");
				overLabel.classList.add("small-renamed-bitch");
				overLabel.innerText = "No.";

				shortLabel.appendChild(overLabel);
			}
		}, 500);

		let regular = setInterval(() => {
			const labels = document.querySelectorAll("ytd-guide-entry-renderer");

			// console.log(labels);

			let shortLabel;

			try {
				for (const entry of labels) {
					let stringList = Array.from(entry.querySelectorAll("yt-formatted-string")).map((n) => n.innerText.toLowerCase());

					if (stringList.includes("shorts")) shortLabel = entry;

					// console.log(entry);
				}
			} catch {}
			// console.log(shortLabel);

			if (shortLabel != undefined && shortLabel.querySelector(".renamed-bitch") == null) {
				console.log("double check this is working");

				let overLabel = document.createElement("div");
				overLabel.classList.add("renamed-bitch");
				overLabel.classList.add("big-renamed-bitch");
				overLabel.innerText = "Not a chance.";

				shortLabel.appendChild(overLabel);
			}
		}, 500);
	}
})();
