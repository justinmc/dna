# DNA
A DNA visualization experiment

## Overview
This project consists of a React and Redux app that lets the user modify a DNA macromolecule, and it sits on top of a canvas app that visualizes the molecule and allows interactions.

One of the main things I wanted to investigate with this project was the interface between a React app and a graphical canvas app, and I really wanted to try out rendering to the canvas using React components.  I did this by creating a mixin (mixins/canvas_mixin.js) that gives the component access to a canvas context if it's rendered inside of one.  This gives all the composability and re-rendering logic that React provides, but as-is, it also introduces some problems.

The main way that these canvas React components don't behave like normal React components is that they can't handle normal user events like `onClick`, etc.  This results in needing to manually check mouse coordinates against what is being rendered and reacting to it in the normal render cycle.  Performance in fine for normal sized molecules but would be improved by not needing to rerender to handle user input.  It works, but adds a lot of complexity and loses some of the benefit of React when doing user interaction.

The project could also reduce complexity by using a more powerful graphical abstraction, though I had a lot of fun writing this from scratch.

Architecturally, the data flow is very easy to reason about and benefits from one source of truth in the Redux data.  It's a solid proof of concept and would be a lot of fun to investigate further.
