// ==UserScript==
// @name         Really old youtube
// @namespace    http://tampermonkey.net/
// @version      2024-11-19
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // Your code here...
    setInterval(removeStyles, 100);

    function removeStyles() {
        document.querySelectorAll("head style:not(#now-hold-on-just-one-second)").forEach((n) => {
            n.remove();
        });
        document.querySelectorAll("head link[rel=stylesheet]").forEach((n) => {
            n.remove();
        });
        document.querySelectorAll("*").forEach((n) => {
            n.setAttribute("style", "");
        });
        document.querySelectorAll("body *:not(div)").forEach((n) => {
            n.remove();
        });
    }

    const style = document.createElement("style");
    document.querySelector("head").appendChild(style);
    style.setAttribute("id", "now-hold-on-just-one-second");

    style.innerText = `
        * {
            background-color: #444;
        }
    `;

    const body = document.body;
    const html = `
		<div class="video-container">
			<div>Chrome. You fucking suck.</div>
		</div>
	`;

    if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
        const policy = window.trustedTypes.createPolicy("default", {
            createHTML: (string) => string,
        });

        var trustedHTML = policy.createHTML(html);

        body.innerHTML = trustedHTML;
    } else {
        body.innerHTML += html;
    }
})();
