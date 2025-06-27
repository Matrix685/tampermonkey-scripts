// ==UserScript==
// @name         Youtube Fixes
// @namespace    http://tampermonkey.net/
// @version      1.6.13
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
    }, 500);

    betterCSS();
    endcardsToggle();

    function fixShortLinks() {
        const shorts = document.querySelectorAll("ytm-shorts-lockup-view-model-v2:not(.fixed-this-youtube-short-thing)");

        shorts.forEach((short) => {
            const shortsContainer = short.parentElement;

            var link = `https://www.youtube.com/watch?v=${short.firstChild.firstChild.href.substring(31)}`;

            var a = document.createElement("a");

            a.href = link;
            a.classList.add("yt-horizontal-list-renderer");

            shortsContainer.appendChild(a);
            a.appendChild(short);

            a.querySelectorAll("*").forEach((n) => {
                n.style.pointerEvents = "none";
            });

            short.classList.add("fixed-this-youtube-short-thing");
        });
    }

    function betterCSS() {
        //    side scroll buttons in shorts                                                                               uploader avatars on homepage    toggles in player menu           stuff in the player                             circle in timeline      avatar in endcard                                                                          big avatar on channel page            volume knob               icons + images           avatar in playlists
        document.querySelector("head > style.global_styles").innerText += `
	        *:not(ytd-button-renderer.yt-horizontal-list-renderer *):not(ytd-button-renderer.yt-horizontal-list-renderer):not(div#avatar-container *):not(div.ytp-menuitem-toggle-checkbox):not(.ytp-bezel):not(.ytp-doubletap-ui-legacy *):not(.ytp-scrubber-container *):not(div[class*=ytp-ce-channel]):not(div[class*=ytp-ce-channel] > .ytp-ce-expanding-image):not(yt-decorated-avatar-view-model *):not(.ytp-volume-slider *):not(yt-img-shadow):not(.yt-avatar-stack-view-model-wiz__avatars *)  {
			    border-radius: 0px !important;
		    }

			#buttons button.yt-spec-button-shape-next {
				height: 40px;
			}
			
			a.yt-horizontal-list-renderer {
				width: 100%;
			}
		`;
    }

    function endcardsToggle() {
        // positioning and styling
        const newItem = document.createElement("div");

        newItem.classList.add("ytp-menuitem");
        newItem.setAttribute("role", "menuitemcheckbox");
        newItem.setAttribute("aria-checked", "true");

        var append = setInterval(() => {
            const menu = document.querySelector("div.ytp-panel-menu");
            const previous = document.querySelector("div.ytp-menuitem:nth-child(4)");

            menu.insertBefore(newItem, previous);

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
        var toggled = true;

        newItem.onclick = () => {
            var endCards = document.querySelectorAll(".ytp-ce-element");

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
        const content = document.querySelector("#ytp-id-18 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > .ytp-menuitem-content");

        document.querySelector("div#cinematics-container").style.display = "none";

        content.innerText = "no :3";

        content.style.fontSize = "2.5em";
        content.style.fontWeight = "bold";
    }
})();
