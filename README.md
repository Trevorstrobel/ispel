## **Installation instructions**



## **Project structure**

The project is developed using following technologies:

\-    Node.js

\-    Express.js

\-    Sequelize for database interaction

\-    Multer for files uploads

\-    PostgreSQL database

The project utilizes the **Model-View-Controller** (MVC) approach. 

Basic components are in the folders with corresponding names. 

### **Model**

The models are realized using Sequelize module. Each model contains the structure presented by JavaScript object. Based on those objects, the Sequelize creates corresponding tables in the database. Relations between tables are also defines by Sequelize and are configured in the /util/associations.js

### **View**

 The views are presented by ejs templates.

### **Controller**

Controllers are .js files that contains separate methods for different get and post actions for views. There are 4 different controllers:

\- admin.js - controller for administrative part. It is responsible for user management and domain/area management

\- auth.js - authorization controller that manages signup, login and logout functionality

\- author.js - Topics management (list of topics, adding new topics)

\- error.js - error handling controller

\- 