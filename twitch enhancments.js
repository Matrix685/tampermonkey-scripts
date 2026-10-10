// ==UserScript==
// @name         Twitch Enhancers
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  A collection of enhancments for me that I want on twitch you're welcome to ignore this (currently just 1)
// @author       Matrix685
// @match      https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/Matrix685/tampermonkey-scripts/refs/heads/main/twitch%20enhancments.js
// @updateURL    https://raw.githubusercontent.com/Matrix685/tampermonkey-scripts/refs/heads/main/twitch%20enhancments.js
// ==/UserScript==

(function () {
	"use strict";

	// Your code here...
	// setInterval(copyUpTime, 1000);
	copyUpTime();

	function copyUpTime() {
		console.log("working");

		let newStyle = document.createElement("style");

		newStyle.innerText += `
			#new-uptime {
				font-weight: bold;
				margin: 0rem 5px;
				position: relative;
			}

			#new-uptime::before {
				content: "";
				display: inline-block;
				aspect-ratio: 1;
				height: 50%;
				border-radius: 50%;
				background-color: #f00;
				position: absolute;
				left: 0px;
				top: 50%;
				translate: -135% -50%
			}
		`;

		document.querySelector("head").appendChild(newStyle);

		let upTimeElement = document.createElement("div");
		upTimeElement.id = "new-uptime";

		setInterval(() => {
			try {
				const menuItems = document.querySelector("div.player-controls__right-control-group");
				const firstItem = menuItems.firstElementChild;

				menuItems.insertBefore(upTimeElement, firstItem);
			} catch {}

			let currentUpTime = document.querySelector("span.live-time p").innerText.split(" ")[0];
			upTimeElement.innerText = currentUpTime;
		}, 1000);
	}
})();
