# WDD 231: Chamber of Commerce Project

This directory contains the core development files for the Chamber of Commerce website project. 

## Project Overview
The Chamber of Commerce site is designed to support, promote, and showcase local businesses. It serves as an applied-learning portal demonstrating responsive web design, semantic HTML5 markup, clean modular CSS layout principles, and dynamic asynchronous data rendering.

## Core Features
* **Mobile-First Design:** Fully optimized viewport scaling layout ranging seamlessly from narrow 320px screens up to wide desktop resolutions.
* **Dynamic Business Directory:** Renders business entries seamlessly from an external JSON data source using asynchronous JavaScript (`fetch` with `async/await`).
* **Interactive Grid/List Views:** Users can toggle layout arrangements on the fly between structural multi-column grid cards and structured text-list rows.

## Directory Architecture
* `directory.html` - Main application entry point featuring metadata, semantic sections, and DOM injection layout nodes.
* `css/` - Styling tier consisting of a clean canvas browser reset (`normalize.css`) and responsive layout modules (`directory.css`).
* `js/` - Interactive script layer driving fetch requests, element builder loops, view-state toggles, and automatic footer timestamps.
* `data/members.json` - Structured business database profiles storing individual name, address, contact, and tier assets.

## Built With
* Semantic HTML5
* Vanilla CSS3 (Custom Media Queries & Grid/Flexbox architectures)
* Modern JavaScript (ES6 Modules & Fetch API)

