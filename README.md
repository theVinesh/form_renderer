# Form Renderer

> This app is a take-home assignment.

todo write intro here

🔗 [video walkthrough](todo url here https://thevinesh.com)

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
  - multiselect
- If an unknown field type is encountered, it will be rendered as a `text` type.

___
## Requirements
- [x] Dynamically render all fields from the schema
- [x] Manage form state internally
- [x] On form submit, display the form data as formatted JSON below the form
- [ ] Show validation for required fields

## Bonus
- [ ] Add support for one or more additional field types ( textarea , date , etc.)
- [ ] Basic field validation messages
- [ ] Modular architecture (custom hooks or reusable field components)
- [ ] Responsive design
- [ ] Unit tests