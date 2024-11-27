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

(function() {
    'use strict';

    // Your code here...
    // setInterval(removeStyles, 100);
	// setInterval(reorganiseContent, 100);

	reorganiseContent();

    function removeStyles() {
        document.querySelectorAll("head style:not(#now-hold-on-just-one-second)").forEach(n => { n.remove() });
        document.querySelectorAll("head link[rel=stylesheet]").forEach(n => { n.remove() });
        // document.querySelectorAll("*").forEach(n => { n.setAttribute("style", "") });
        // document.querySelectorAll("body *:not(#good_stuff_being_added):not(#good_stuff_being_added *)").forEach(n => { n.style.opacity = "0"; });
		document.querySelectorAll("body *:not(#good_stuff_being_added):not(#good_stuff_being_added *)").forEach(n => { n.style.display = "none"; });
    }


    const style = document.createElement("style");
    document.querySelector("head").appendChild(style);
    style.setAttribute("id", "now-hold-on-just-one-second");

    style.innerText = `
		#good_stuff_being_added {
		  height: 100%;
		}

		:root {
		  --main-bg: #ccc;
		}

		* {
		  box-sizing: border-box;
		}

		body {
		  height: 100vh;
		}

		a {
		  color: #35f;
		}

		span, a, p {
		  /* font-size: 0.8rem; */
		  margin: 0rem;
		}

		.content-div {
		  background-color: var(--main-bg);
		  padding: 1px;
		  border-radius: 5px 5px 0px 0px;
		}

		.video-container {
		  width: 60%;
		}

		.content-div > .heading {
		  display: flex;
		  justify-content: space-between;
		  padding: 5px 10px;
		}

		.video-container > .footer {
		  display: flex;
		  justify-content: flex-end;
		  padding: 5px 10px;
		}

		.content {
		  padding: 5px;
		  display: block;
		  width: 100%;
		  height: auto;
		  background-color: #eee;
		}

		.video {
		  margin: 1px;
		  width: 100%;
		  height: 10rem;
		  background-color: red;
		  border-bottom: 1px dashed #666;
		}

		.page-header {
		  height: 15%;
		}

		.links {
		  display: flex;
		  justify-content: space-between;
		  height: 40%;
		}

		.page-logo {
		  height: 100%;
		}

		.page-header .right-side {
		  display: flex;
		  flex-direction: column;
		  justify-content: space-between;
		}

		.page-header .right-side a {
		  padding: 0px 5px;
		}

		.page-header .search {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  gap: 5px;
		}

		.page-header .search-bar {
		  flex-grow: 1;
		}

		.tabs {
		  padding-top: 1em;
		  height: 60%;
		  display: flex;
		  flex-direction: column;
		}

		.tab-links {
		  display: flex;
		  gap: 5px;
		}

		.tab-links a {
		  font-size: 1rem;
		}

		.tab {
		  flex-grow: 1;
		  display: flex;
		  justify-content: center;
		  background-color: #bcf;
		  padding: 5px;
		  border-radius: 5px 5px 0px 0px;
		  height: calc(100% - 1px);
		}

		.tab-links > div.active {
		  background-color: var(--main-bg);
		  height: 100%;
		}

		.quick-links {
		  background-color: var(--main-bg);
		  flex-grow: 1;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  gap: 5px;
		}

		/* div#thumbnail {
		  position: absolute;
		  width: 20%;
		  aspect-ratio: 1;
		  background-color: black;
		} */

		/* div#thumbnail {
		  display: flex;
		} */

		a#thumbnail {
		  width: 20%;
		  aspect-ratio: 1;
		  display: flex;
		}

		#thumbnail img {
		/*   position: absolute; */
		/*   width: 20%; */
		  width: 100%;
		  aspect-ratio: 1;
		  object-fit: scale-down;
		  background-color: black !important;
		}

		/* ytd-thumbnail {
		  display: flex;
		  background-color: black;
		} */

        #content {
          position: relative;
        }

        #details {
          position: absolute;
          top: 0px;
          left: 25%;
          width: calc(100% - 25%);
        }

        #meta > h3 {
          position: absolute;
          top: 0px;
          width: 100%;
          margin: 0px;
        }

        ytd-thumbnail-overlay-time-status-renderer {
          position: absolute;
          left: 25%;
        }

        /* #meta {
          width: 100%;
          position: absolute;
          top: 1rem;
        } */
    `;


	const body = document.body;
	const container = document.createElement("div");
	container.setAttribute("id", "good_stuff_being_added");

	body.appendChild(container);

    const html = `
		<div id="good_stuff_being_added">
			<div class="page-header">
			  <div class="links">
			  	<a href="https://www.youtube.com">
					<img
						 class="page-logo"
						 src="http://web.archive.org/web/20061109210911im_/http://www.youtube.com/img/logo_tagline_sm.gif"
					>
				</a>
				<div class="right-side">

				  <div class="user-links">
					<a href="#">Sign Up</a>
					<span>|</span>
					<a href="#">My Account</a>
					<span>|</span>
					<a href="#">History</a>
					<span>|</span>
					<a href="#">QuickList</a>
					<span>|</span>
					<a href="#">Help</a>
					<span>|</span>
					<a href="#">Log In</a>
				  </div>

				  <div class="search">
					<p>Search for</p>
					<input class="search-bar">
					<button class="search-button">Search</button>
				  </div>
				</div>

			  </div>

			  <div class="tabs">
				<div class="tab-links">

				  <div class="tab home active">
					<a href="#">Home</a>
				  </div>
				  <div class="tab videos">
					<a href="#">Videos</a>
				  </div>
				  <div class="tab channels">
					<a href="#">Channels</a>
				  </div><div class="tab groups">
					<a href="#">Groups</a>
				  </div>
				  <div class="tab cats">
					<a href="#">Categories</a>
				  </div>
				  <div class="tab upload">
					<a href="#">Upload</a>
				  </div>

				</div>

				<div class="quick-links">
				  <a href="#">My Account</a>
				  <span>|</span>
				  <a href="#">My Videos</a>
				  <span>|</span>
				  <a href="#">My Favourites</a>
				  <span>|</span>
				  <a href="#">My Friends</a>
				  <span>|</span>
				  <a href="#">My Inbox</a>
				  <span>|</span>
				  <a href="#">My Subscriptions</a>
				  <span>|</span>
				  <a href="#">My Groups</a>
				  <span>|</span>
				  <a href="#">My Channel</a>
				</div>
			  </div>
			</div>

			<div class="content-div video-container">
			  <div class="heading">
				<p class="featured">Featured Videos</p>
				<a class="more" href="#">See More Videos</a>
			  </div>
			  <div class="content"></div>
			  <div class="footer">
				<a href="#">See More Videos</a>
			  </div>
			</div>
		</div>
	`;

    if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
        const policy = window.trustedTypes.createPolicy('default', {
            createHTML: string => string
        });

        var trustedHTML = policy.createHTML(html);

        container.innerHTML += trustedHTML;
    } else {
		container.innerHTML += html;
	}

    function reorganiseVideo(video) {
        video.querySelector("#overlays > ytd-thumbnail-overlay-now-playing-renderer").remove();
    }

	function reorganiseContent() {
		var append = setInterval(() => {
			const videoContainer = document.querySelector(".video-container > .content");
			const videos = document.querySelectorAll("ytd-rich-item-renderer.ytd-rich-grid-renderer:nth-child(2) > div:nth-child(1)");

			// console.log(videos);

			// videoContainer.appendChild(video);
			videos.forEach(n => { videoContainer.appendChild(n); });

			if (videos[0] != null) {
				removeStyles();
                reorganiseVideo(videos[0]);
				clearInterval(append);
			}
		}, 100)



	}



})();
