# Web Design and User Experience INFO-6150

## The Troopers:
•	Ivan Fernando
•	Nishanth M
•	Srikanth Reddy Gubballi
•	Sujay Joshi

## Online Job Portal (JobStorm):
A Portal which helps job-seekers to view job listing form multiple companies with their details and apply for their dream job.
Makes the life of recruiter simple, they just have to post the job on their company website. JobStorm fetches the jobs posted form multiple companies and posts it on our website.
JobStorm helps job-seeker to find their dream job and employer find the perfect candidate.

### Angular app (job-portal):
Consists of multiple components as listed below. Mainly, this app communicates with the backend server. Helps the applicant to register, login, logout, view jobs, apply for jobs and contact the admin for any queries or questions. 

Home Component: Home page of the angular app
Nav Component: Nav component is used to navigate around the website
Applicants Component: Consists of list and details job components which displays the listing of jobs from each company. Also, the details of each listing. Allows applicants to apply for job
User Components: Consists of sub-components such as login and register.
Login Component: Helps the applicant login.
Register Component: Helps the applicate Register.
Contact Component: Helps the applicant to reach the portal admin for ant queries and questions.
Models Component: Consists of user model.
Page-not-found Component: leads to this page if there are any broken links.

Technology:
Angular-material-component: Helps to provide better interaction patterns.
Angular-persistance: Save the user session.
Ngrx/store: Pass the state of persistant data between components.
other features: Bootstrap, SCSS, Typescript-maps.

Service: Conists of services such as Http (Communicate with the backend), Navigation (Navigate around the website), Store (state managment), User (authorizing user to access pages). 

### Server (MVC Express app):
The server consists of mutile components as listed below, which use bycrypt for hashing user passwords, PassportJs for authentication and authorization, Node-mailer to send mail to the user upon registrationa and also mail the user when they want to be contacted by the admin.

Sign up: Helps the applicant to register.
Sign in: Helps the applicant to login.
Email: Sends an email when user registers.
Contact: Helps the applicant to send a mail to the admin for any queries or questions.

Technology:
Bypcrypt: Implement hashing of user password.
PassportJS: Implement user authentication and authorization.
JWT: provides tokens to user which helps use inturn provide sessions to user.
Node-mailer: Helps to send mail to user as an acknowlegment.

### Server-2 and Server-3 (MVC Express app):
These servers consists of multiple components as listed below, which consists of multiple routes to implement CRUD operation. Uses node-mailer to send mails to applicants upon submission of the application, Multer for file upload and download the file.

CRUD operations: Helps the recruiter create, update, view and delete jobs.
View candidates: Helps the recruiter view candidates who have applied for jobs. Also, can view the uploaded files
Home Page: Provides information about the company.

Technology:
Mongoose: ORM used to connect to the mongoDB database.
Multer: To implement file uploads
Node-mailer: provide acknowlegment to user upon submission of application
express-handlebars: implement better communication between frontend and backend.
node-sass: compile scss files to css.

#### How to run the application:

job-portal:
Inside job-portal run npm i 0r npm install. Run application server using ng serve or ng serve --open.
You can access the app at http://localhost:4200/.

server:
Inside server folder run npm i or npm install. Run application server using npm start or node ./bin/www.
You can access the app at http://localhost:3000/.

server2:
Inside server2 folder run npm i or npm install. Run application server using npm start or node ./bin/www.
You can access the app at http://localhost:5500/.

server3:
Inside server2 folder run npm i or npm install. Run application server using npm start or node ./bin/www.
You can access the app at http://localhost:5600/.





