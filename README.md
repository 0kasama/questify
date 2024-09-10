<div align="center">
  <h1>Questify</h1>
  <p>A simple application that allows users to create to-do lists, set priorities, and track the status of those tasks.</p>
  <p>The app incorporates a game-like concept, where users can earn points and level up based on task completion.</p>
</div>

## Tech Stacks
<p  align="center"> 
<b>Backend</b><br>
<img  src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"> 
<img  src="https://img.shields.io/badge/Node.JS-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS"> 
<img  src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white" alt="Express"> 
<br><b>Frontend</b><br>
<img  src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="React"> 
<img  src="https://img.shields.io/badge/Next.JS-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white"  alt="Next.JS"> 
<br><b>Database</b><br>
<img  src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize"> 
<img  src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"> 
<img  src="https://img.shields.io/badge/postman-FF6C37.svg?style=for-the-badge&logo=postman&logoColor=white" alt="postman"> 
</p>

## Getting Started

### Requirements
 - Code Editor (ex. VS Code, Sublime Text, etc.)
 - Web Browser (ex. Chrome, Firefox, Microsfot Edges, etc.)
 - [Node.JS LTS Version or Latest](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation

### Step-by-step  how to run the app locally
1. Clone the repository
   ```
   git clone https://github.com/0kasama/questify.git
   cd questify
   ```
2. Open backend directory and install all packages
	```
   cd backend
   npm install
   ```
3. Create and set `.env` file [(check env-examples)](https://github.com/0kasama/questify/blob/main/backend/env-examples)
4. Setup the database
	```
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. Run the backend
	```
   npm run dev
   ```
6. Open the frontend directory and install all packages
	```
	cd ..
   cd frontend
   npm install
   ```
7. Set the `BASE_URL`: Adjust the `BASE_URL` in the [(frontend/src/libs/baseUrl)](https://github.com/0kasama/questify/blob/main/frontend/src/libs/baseUrl.js) file
8. Run the frontend
	```
   npm run dev
   ```

 ## Previews
 ![home-page](https://github.com/user-attachments/assets/4fac5453-b949-4067-ab54-31126b43e124)
 ![main](https://github.com/user-attachments/assets/2da06e97-5c60-4abe-adbc-96d39c986b27)

