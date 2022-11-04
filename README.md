# WEBOOKS
## Application Description
An online library for you to browse, borrow and read!

## Application link
- **[Application Link](https://main--w-ebooks.netlify.app/)**
- **[WireFrame Desktop](https://xd.adobe.com/view/1636a14c-d45d-4747-ae86-f8a85b0ca908-4365/)**
- **[WireFrame Mobile](https://xd.adobe.com/view/0ee9aa87-06c8-49bf-9b47-7cdd196a9526-5bba/)**
- **[SQL DB Design](https://dbdiagram.io/d/634c0deef0018a1c5f12f35e)**

![Sample App Image](https://storage.googleapis.com/webooks-epub/Screenshot%202022-11-05%20003203.png)

## Database
Postgres SQL

## packages
### Front-end:
- React
- MUI library
- Axios
- React-dropzone
- react-reader
- react-spring-bottom-sheet

### Back-end:
- Express Node.js
- Google-cloud/storage
- Image Kit
- Elephant sql
- sequelize ORM
- Hosted on render.com 
- **[webooks server](https://w-ebooks.onrender.com)**
- **[Git Hub Repo](https://github.com/Sandrafongshurui/webooks-express)**

### Difficulties:
- Uploading images and epub files in the same submit form for the create book route.
- Issues with cors configuration for fetching AWS bucket items
- Cookies not setting due to different domains orgin
- Making each componenet as reusable as possible
- Keep editing tables with many migration files
- Not even touching any of my stretch goals

### Stretch Goals:
- Search/filter Bar by genres
- Notification for users if other users has returned a book that they reserved, through Event emitter