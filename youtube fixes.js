// ==UserScript==
// @name         Youtube Fixes
// @namespace    http://tampermonkey.net/
// @version      2024-08-07
// @description  try to take over the world!
// @author       You
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

    setInterval(fixShortLinks, 500);
    setInterval(ambientMode, 500);
    unRoundEverything();
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

    function unRoundEverything() {
        //   uploader's avatar		    your avatar (top right)					      side scroll buttons							  									                       uploader avatars on homepage    commenter avatars															toggles in player menu 				   stuff in the player		   circle in timeline			  avatar in endcard			   							   big avatar on channel page			featured channels							  volume knob				uploader avatars on search page
        document.querySelector("head > style").innerHTML += `
	    *:not(yt-img-shadow#avatar):not(yt-img-shadow.ytd-topbar-menu-button-renderer):not(ytd-button-renderer.yt-horizontal-list-renderer *):not(ytd-button-renderer.yt-horizontal-list-renderer):not(div#avatar-container *):not(yt-img-shadow.ytd-comment-view-model):not(yt-img-shadow#author-thumbnail):not(div.ytp-menuitem-toggle-checkbox):not(.ytp-bezel-text-hide *):not(.ytp-scrubber-container *):not(div.ytp-ce-channel-this):not(.ytp-ce-channel-this *):not(yt-decorated-avatar-view-model *):not(yt-img-shadow.ytd-grid-channel-renderer):not(.ytp-volume-slider *):not(yt-img-shadow.ytd-video-renderer)  {
			  border-radius: 0px !important;
			}`;
    }

    function endcardsToggle() {
        // positioning and styling
        const menu = document.querySelector("div.ytp-panel-menu");
        const previous = document.querySelector("div.ytp-menuitem:nth-child(4)");
        const newItem = document.createElement("div");

        newItem.classList.add("ytp-menuitem");
        newItem.setAttribute("role", "menuitemcheckbox");
        newItem.setAttribute("aria-checked", "true");

        menu.insertBefore(newItem, previous);

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
                    element.style.display = "inline";
                });
            } else {
                newItem.setAttribute("aria-checked", "true");
                endCards.forEach((element) => {
                    element.style.display = "none";
                });
            }

            toggled = !toggled;
        };
    }

    function ambientMode() {
        document.querySelector("div#cinematics-container").style.display = "none";
    }
})();
