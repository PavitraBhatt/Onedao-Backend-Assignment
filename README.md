Run Commands

1. clone
2. npm install
3. npm start

I haven't added the environment file, which contains the database credentials and JWT secret, to ensure best practices and maintain security.


Database Tables Schema 
### Users

| Column     | Type      | Description           |
|------------|-----------|-----------------------|
| id         | SERIAL    | Primary Key           |
| name       | TEXT      | User's full name      |
| email      | TEXT      | User's email          |
| password   | TEXT      | Hashed password       |
| otp        | TEXT      | OTP for verification  |
| country    | TEXT      | User's country        |
| verified   | BOOLEAN   | Email verified status |

### Products

| Column     | Type      | Description         |
|------------|-----------|---------------------|
| id         | SERIAL    | Primary Key         |
| name       | TEXT      | Product name        |
| description| TEXT      | Product description |
| price      | NUMERIC   | Product price       |
| user_id    | INTEGER   | FK to Users table   |