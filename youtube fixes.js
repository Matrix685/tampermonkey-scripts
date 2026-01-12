// ==UserScript==
// @name         Youtube Fixes
// @namespace    http://tampermonkey.net/
// @version      1.7.2
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

    function fixShortLinks() {
        const shorts = document.querySelectorAll("ytm-shorts-lockup-view-model-v2:not(.fixed-this-youtube-short-thing)");
        const referenceShorts = document.querySelectorAll("ytm-shorts-lockup-view-model-v2");

        try {
            let metadataPosition;

            for (const short of referenceShorts) {
                const metaButton = short.querySelector("div.shortsLockupViewModelHostOutsideMetadata.shortsLockupViewModelHostMetadataRounded");

                if (metaButton.offsetTop != 0) metadataPosition = metaButton.offsetTop;
            }

            console.log(metadataPosition);

            document.documentElement.style.setProperty("--metadata-position", `${metadataPosition}px`);

            // console.log(metadataPosition);
        } catch {
            // console.log("%cfound an oopsie", "color: blue;");
            // return;
        }

        // console.log(`%c${metadataPosition}`, "color: lime");
        // console.log("%cHELP MEEEEEEE", "font-size: 20px;")

        shorts.forEach((short) => {
            const shortsContainer = short.parentElement;
            shortsContainer.style.position = "relative";

            let link = `https://www.youtube.com/watch?v=${short.firstChild.firstChild.href.substring(31)}`;

            let a = document.createElement("a");

            a.href = link;
            a.classList.add("yt-horizontal-list-renderer");

            shortsContainer.appendChild(a);

            a.appendChild(short);

            const oldMetadataMenuButton = short.querySelector(".shortsLockupViewModelHostOutsideMetadataMenu");

            try {
                shortsContainer.appendChild(oldMetadataMenuButton);
            } catch {
                // console.log("help");
            }

            const newMetadataMenuButton = shortsContainer.lastElementChild;

            newMetadataMenuButton.classList.add("its-like-a-button-or-something-idk");

            try {
                newMetadataMenuButton.querySelector("span.yt-icon-shape").innerHTML = `
					<div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="display: inherit; width: 100%; height: 100%;">
							<path d="M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z"></path>
						</svg>
					</div>
				`;
            } catch {
                let path = document.createElement("path");
                path.setAttribute("d", "M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z");

                let svg = document.createElement("svg");
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.setAttribute("height", "24");
                svg.setAttributeNS(null, "viewBox", "0 0 24 24");
                svg.setAttribute("width", "24");
                svg.setAttribute("focusable", "false");
                svg.setAttribute("aria-hidden", "true");
                svg.setAttribute("style", "display: inherit; width: 100%; height: 100%;");

                svg.appendChild(path);

                let iconDiv = document.createElement("div");
                iconDiv.setAttribute("style", "width: 100%; height: 100%; display: block; fill: currentcolor;");

                iconDiv.appendChild(svg);

                const icon = newMetadataMenuButton.querySelector("span.yt-icon-shape");

                icon.appendChild(iconDiv);
            }

            newMetadataMenuButton.onclick = () => short.querySelector("ytm-shorts-lockup-view-model-v2 .shortsLockupViewModelHostOutsideMetadataMenu").firstElementChild.click();

            a.querySelectorAll("*:not(.shortsLockupViewModelHostOutsideMetadataMenu.shortsLockupViewModelHostShowOverPlayer)").forEach((n) => (n.style.pointerEvents = "none"));

            try {
                short.querySelector("ytm-shorts-lockup-view-model-v2 .yt-spec-button-shape-next__icon").style.visibility = "hidden";
            } catch {
                // console.log("hel");
            }

            short.classList.add("fixed-this-youtube-short-thing");
        });
    }

    function betterCSS() {
        //    side scroll buttons in shorts                                                                               uploader avatars on homepage    toggles in player menu           stuff in the player                             circle in timeline             avatar in endcard                                                                                                      big avatar on channel page            volume knob               icons + images           avatar in playlists                       autoplay toggle
        document.querySelector("head > style.global_styles").innerText += `
	        *:not(ytd-button-renderer.yt-horizontal-list-renderer *):not(ytd-button-renderer.yt-horizontal-list-renderer):not(div#avatar-container *):not(div.ytp-menuitem-toggle-checkbox):not(.ytp-bezel):not(.ytp-doubletap-ui-legacy *):not(.ytp-scrubber-container *):not(div[class*=ytp-ce-channel]):not(div[class*=ytp-ce-channel] > .ytp-ce-expanding-image):not(.ytp-ce-element-shadow):not(yt-decorated-avatar-view-model *):not(.ytp-volume-slider *):not(yt-img-shadow):not(.yt-avatar-stack-view-model-wiz__avatars *):not(.ytp-autonav-toggle *)  {
			    border-radius: 0px !important;
		    }

			:root { /* position of stupid short button that no one will ever use */
				--metadata-position: 300px;
			}

			#buttons button.yt-spec-button-shape-next { /* dumb create button at the top that isnt the right height for some reason */
				height: 40px;
			}

			a.yt-horizontal-list-renderer { /* better shorts */
				position: relative;
				width: 100%;
				height: 100%;
			}

			.its-like-a-button-or-something-idk { /* stupid short button that no one will ever use once again */
				position: absolute;
				top: calc(var(--metadata-position) + 2%);
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
})();
