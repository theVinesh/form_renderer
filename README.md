# Form Renderer

> This app is a take-home assignment.

## Demo
- Published [here](https://form-renderer.vineshbuilds.app) for a quick look and to play around.
- [video walkthrough](https://www.loom.com/share/a6655d53a6cf4d05b497265ae18c11e8?sid=e8fb731e-4a6c-42e3-976b-90ac9eaff161)

## Description
This is a simple form renderer, built with React and TypeScript that takes a JSON schema and renders a form based on it.
It demonstrates modern React patterns with custom hooks, reusable components, and responsive design.
It also demonstrates using `vitest` for writing unit tests for components and hooks.

## Features
- Input a JSON schema through a text area
- Validate and Preview the schema
- View the rendered form with various field types (text, number, textarea, date, select, checkbox)
- Fill out the form with validation for required fields
- Submit the form and see the collected data displayed as formatted JSON

## Setup
 
1. Clone the repository
2. `cd` to the project directory
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Open local url provided by vite ( by default [http://localhost:5173](http://localhost:5173)) to view it in the browser.
6. Run `npm test` to run the tests

## Notes & Assumptions
- The form schema is provided as a JSON object in the provided text area.
- Assumes that the form field type would be one of the following:
  - text
  - number
  - textarea
  - date
  - select
  - checkbox
- If an unknown field type is encountered, it will be rendered as a `text` type.

___
## Requirements
- [x] Dynamically render all fields from the schema
- [x] Manage form state internally
- [x] On form submit, display the form data as formatted JSON below the form
- [x] Show validation for required fields

## Bonus
- [x] Add support for one or more additional field types ( textarea , date , etc.)
- [ ] Basic field validation messages
- [x] Modular architecture (custom hooks or reusable field components)
- [x] Responsive design
- [x] Unit tests