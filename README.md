
# Vue.js Invoice Management App

A simple Vue 3 application for managing invoices with features like adding items, sorting, pagination, and form validation. The project uses Tailwind CSS for styling and Vuelidate for form validation.

---

## Features
- Add new invoices with validation.
- Sort the list by columns (e.g., name, billing date, etc.).
- Paginate the list (10 items per page).
- Responsive design using Tailwind CSS.
- Toast notifications for actions like adding and downloading invoices.

---

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   Using npm:
   ```bash
   npm run dev
   ```
   Or using yarn:
   ```bash
   yarn dev
   ```

4. **Open the app**:
   - The development server will usually run at `http://localhost:5173` (check your terminal for the exact URL).

---

## Project Structure
- **`src/components`**: Contains Vue components like the list, popup form, and layout components.
- **`src/assets`**: Static assets such as images or fonts.
- **`tailwind.config.js`**: Configuration for Tailwind CSS.

---

## Scripts
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run serve`**: Serves the production build locally.

---

## Usage

### Adding a New Invoice
1. Click the **Add Invoice** button to open the popup.
2. Fill in the fields (Name, Billing Date, Amount, etc.) with valid data:
   - Name, Status, and Plan are required fields.
   - Amount must be numeric and greater than 0.
   - Billing Date cannot be in the future.
3. Submit the form to add the invoice to the list.

### Sorting and Pagination
- Click on column headers to sort by that column.
- Navigate between pages using the pagination controls.

### Export or Download Actions
- Select rows using the checkboxes, then use the **Export** or **Download** buttons to perform actions. Toast notifications will confirm the action.

---

## Customization

### Changing Styling
The project uses Tailwind CSS. Modify `tailwind.config.js` or add classes directly in templates to change the design.

### Adding New Features
1. Add new components in the `src/components` folder.
2. Import and register them in `App.vue` or appropriate parent components.

---

## Known Issues
- Validation may need to be extended for more complex scenarios.
- Add error handling for server actions (if integrated).

---

## Dependencies
Key dependencies used in the project:
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vuelidate](https://vuelidate-next.netlify.app/)

---

## Contributing
Feel free to fork this repository and submit pull requests for any improvements or fixes.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any questions or feedback, please open an issue or contact the project maintainer.
