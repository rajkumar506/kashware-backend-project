# Kashware Backend Project
Project contain one microservice in nodejs has three functionalities-
1. Authentication 
2. JSON Patching 
3. Image Thumbnail Generater
#### Authentication: 
This is **Public Endpoint** when a user hit the **email** and **password** a token will generate. This token will authenticate the user for protected routes

#### JSON Patching:
This is **Protected Endpoint** token will used to verify the user this functionality is used to update the Object and return updated object.

#### Image Thumbnail Generation:
This is **Protected Endpoint** used to generate the 50x50 size image which will store in image folder of project user will provide a link of image to download the image and then resize it in seperate file and return link of modified image.

#### Installation:
* use **npm install** to install dependencies
* use **npm start** to start the server
* use **npm test** to run all the testcases
#### Usage:
1. ##### Signin:
* Request Body (Email: user_email, Password: user_password)
* Response (Token: Token_string)
2. ##### JSON Patching:
* Request Body (oldObject: {...} , patchObject:{ [...]  }))
* Response (updated_Object:{...})
3. ##### Image Thumbnail:
* Request Body (url:".....")
* Response (url of resize image: "....")
* Store in => images/image....png
#### Testing:
##### module used:
* **mocha**
*  **Chai**






