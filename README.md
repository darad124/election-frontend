
# Election Frontend

This is the frontend application for the Election System project. It is built using Vite, React, and Tailwind CSS.

## Project Structure

```sh
election-frontend
├── node_modules
├── public
├── src
│   ├── assets
│   ├── pages
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/darad124/election-frontend.git
   cd election-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server with Vite, run:

```sh
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (the default Vite port).

### Building for Production

To build the project for production using Vite, run:

```sh
npm run build
# or
yarn build
```

The optimized and minified files will be generated in the `dist` directory.

### Previewing the Production Build

To preview the production build with Vite, run:

```sh
npm run preview
# or
yarn preview
```

### Linting

To lint the code using ESLint, run:

```sh
npm run lint
# or
yarn lint
```

## Environment Variables

If your project uses environment variables, create a `.env` file in the root directory and add your variables there. For example:

```sh
VITE_API_URL=https://api.example.com
```

Make sure not to commit sensitive information to your version control system.

## Testing File Uploads

### Example Environment Variables

```sh
VITE_API_URL=http://localhost:8000
VITE_ADMIN_EMAIL=admin@example.com
```

### Test Case for File Upload

To test the file upload feature, you can use the following sample CSV data. Save this data into a file named `students.csv`:

```csv
student_id,first_name,last_name,email,date_of_birth,year_of_study,faculty,is_eligible
S88595,Amani,Abdalla,amani.abdalla@example.com,1996-07-14,3,Business,Yes
S88596,Baraka,Ali,baraka.ali@example.com,1997-08-22,4,Computer Science,No
S88597,Bakari,Bakari,bakari.bakari@example.com,1998-09-03,2,Engineering,Yes
S88598,Dalila,Chacha,dalila.chacha@example.com,1999-10-19,1,Mathematics,No
S88599,Faraji,Chege,faraji.chege@example.com,1996-11-30,3,Psychology,Yes
S88600,Fatuma,Farah,fatuma.farah@example.com,1997-12-18,4,History,Yes
S88601,Hamisi,Hassan,hamisi.hassan@example.com,1998-01-27,2,English,No
S88602,Hawa,Ismail,hawa.ismail@example.com,1999-02-10,1,Chemistry,Yes
S88603,Jabari,Kamau,jabari.kamau@example.com,1996-03-22,3,Biology,Yes
S88604,Juma,Kariuki,juma.kariuki@example.com,1998-04-16,2,Physics,No
S88605,Khadija,Kimani,khadija.kimani@example.com,1997-05-14,4,Economics,Yes
S88606,Keisha,Kiplagat,keisha.kiplagat@example.com,1999-06-11,1,Political Science,No
S88607,Khadija,Koita,khadija.koita@example.com,1996-07-30,3,Sociology,Yes
S88608,Laila,Lumumba,laila.lumumba@example.com,1998-08-29,2,Anthropology,No
S88609,Lisha,Makori,lisha.makori@example.com,1997-09-20,4,Geography,Yes
S88610,Makena,Mburu,makena.mburu@example.com,1999-10-12,1,Linguistics,No
S88611,Mjomba,Mugambi,mjomba.mugambi@example.com,1996-11-23,3,Philosophy,Yes
S88612,Nia,Ngugi,nia.ngugi@example.com,1998-12-31,2,Religious Studies,No
S88613,Nyota,Omari,nyota.omari@example.com,1997-01-07,4,Archaeology,Yes
S88614,Pendo,Omondi,pendo.omondi@example.com,1999-02-18,1,Environmental Science,No
S88615,Rahma,Onyango,rahma.onyango@example.com,1996-03-09,3,Humanities,Yes
```

### Steps to Test File Upload

1. **Start the Backend Server**: Ensure your Django backend server is running at the URL specified in the `VITE_API_URL` environment variable.

2. **Upload the CSV File**:
   - Open the frontend application in your browser at `http://localhost:5173`.
   - Navigate to the file upload section.
   - Upload the `students.csv` file.
   - Submit the file for processing.

3. **Verify the Upload**:
   - Check the table in the frontend application to verify that the student data from the CSV file is displayed.
   - Ensure the backend processed the file correctly and saved the data to the database.

4. **Email Notification** (Bonus):
   - If the backend is configured to send email notifications, check the specified admin email for a notification confirming the successful processing of the file.

## Project Goals and Features

### Goals

- **Database Design**: Design a database to store information about eligible student voters.
- **Frontend Development**: Develop a user interface using React and Vite where an admin can:
  - Upload CSV or Excel files containing student voter information.
  - View a list of uploaded students in a table.
- **Backend Development**: Build a REST API using Django and Django Rest Framework to:
  - Handle file uploads.
  - Process and save data asynchronously due to potentially large file sizes.
  - Notify the admin via email once the data processing is complete. (Bonus)
- **Performance and Scalability**: Ensure the system is performant and can handle large files efficiently.
- **Deployment**: Deploy the application to a PaaS (such as Vercel/Netlify for the frontend and Heroku/On-render for the backend). (Bonus)
- **External Python Packages**: Use external Python packages to handle and process Excel/CSV files. (Bonus)
- **Documentation**: Provide documentation outlining your thought process, design decisions, and any assumptions made. (Bonus)

### Features

- **Secure Voting**: Ensure the integrity and security of votes.
- **Real-Time Results**: Display election results in real-time.
- **User-Friendly Interface**: Easy-to-use interface for both voters and administrators.

## Deployment

Instructions for deploying the application will depend on your hosting provider. Here are some general steps:

1. Build the project using `npm run build` or `yarn build`.
2. Upload the contents of the `dist` directory to your web server or hosting service.

## Configuration

### Tailwind CSS

Tailwind CSS is configured in the `tailwind.config.js` file. You can customize the theme, add plugins, and configure other settings.

### ESLint

ESLint is configured in the `.eslintrc.cjs` file. You can customize the rules according to your coding standards.

## Contributing

If you would like to contribute, please open an issue or submit a pull request with your changes.

## Acknowledgments

Mention any acknowledgments or credits if applicable.

## Live Demo

You can view a live demo of the application at [Election Frontend Live Demo](https://election-frontend-mauve.vercel.app/).

## License

This project is licensed under the MIT License.
