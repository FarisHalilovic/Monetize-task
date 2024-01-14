This README file provides step-by-step information on the changes made to the project, including the implementation of a responsive Navbar and modifications to the Login component.

<b>1. Navbar Component</b>

<b>1.1 Navbar JavaScript Changes</b>

The Navbar component (src/components/Navbar.js) has been updated to make it more responsive. The changes include:

Introduction of state for managing the mobile menu (menuOpen).
Implementation of a hamburger menu icon for smaller screens.
Conditional rendering of navigation links based on user authentication.
Updated styles for a cleaner look.

<b>1.2 Navbar CSS Changes</b>

The corresponding CSS file (src/components/NavBar.component.css) has been updated to include styles for the new features. Notable changes include:

Styles for the hamburger menu icon.
Media queries for responsive design adjustments.

<b>2. Login Component</b>

<b>2.1 Login JavaScript Changes</b>

The Login component (src/components/LoginComponent.js) has been updated to include:

Improved form validation and error handling.
Removal of unnecessary reload after successful login.
Usage of semantic HTML elements for better structure.

<b>2.2 Login CSS Changes</b>

The CSS file (src/components/Login.component.css) has been modified for better styling, including:

Adjusted button styles for a more uniform appearance.
Improved responsiveness.

<b>3. Product List Component</b>

<b>3.1 Product List JavaScript Changes</b>

The Product List component (src/components/ProductList.js) has been updated with the following changes:

Improved form validation and error handling.
Enhanced responsiveness.
Pagination feature for better navigation through the product list.

<b>3.2 Product List CSS Changes</b>

The corresponding CSS file (src/components/Product.component.css) has been updated to include styles for pagination and improved responsiveness.

<b>How to Run the Project?</b>

Follow these steps to run the project locally:

<b>1. Clone the repository to your local machine:</b>

git clone (repository-url)

<b>2. Install dependencies:</b>

npm install

<b>3. Start the development server:</b>

npm start

Visit http://localhost:3000 in your browser to view the application.

Additional Notes:
Ensure you have Node.js and npm installed on your machine.


<b>Enjoy the project!</b>
