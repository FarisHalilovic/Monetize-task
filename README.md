This README file provides step-by-step information on the changes made to the project, including the implementation of a responsive Navbar and modifications to the Login component.

1. Navbar Component

1.1 Navbar JavaScript Changes
The Navbar component (src/components/Navbar.js) has been updated to make it more responsive. The changes include:

Introduction of state for managing the mobile menu (menuOpen).
Implementation of a hamburger menu icon for smaller screens.
Conditional rendering of navigation links based on user authentication.
Updated styles for a cleaner look.

1.2 Navbar CSS Changes
The corresponding CSS file (src/components/NavBar.component.css) has been updated to include styles for the new features. Notable changes include:

Styles for the hamburger menu icon.
Media queries for responsive design adjustments.

2. Login Component

2.1 Login JavaScript Changes
The Login component (src/components/LoginComponent.js) has been updated to include:

Improved form validation and error handling.
Removal of unnecessary reload after successful login.
Usage of semantic HTML elements for better structure.

2.2 Login CSS Changes
The CSS file (src/components/Login.component.css) has been modified for better styling, including:

Adjusted button styles for a more uniform appearance.
Improved responsiveness.

3. Product List Component

3.1 Product List JavaScript Changes
The Product List component (src/components/ProductList.js) has been updated with the following changes:

Improved form validation and error handling.
Enhanced responsiveness.
Pagination feature for better navigation through the product list.

3.2 Product List CSS Changes
The corresponding CSS file (src/components/Product.component.css) has been updated to include styles for pagination and improved responsiveness.

How to Run the Project?
Follow these steps to run the project locally:

1. Clone the repository to your local machine.
git clone <repository-url>

2. Install dependencies.
npm install

3. Start the development server.
npm start

Visit http://localhost:3000 in your browser to view the application.

Additional Notes:
Ensure you have Node.js and npm installed on your machine.



