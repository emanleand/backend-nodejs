# backend-nodejs
This crud manage a portfolio web and is developed with node.js and mongodb.

## Initialize Project
### Instalation
    - NodejS 12+
    - Mongo DB
    - Postman
### Run
    - npm i
    - sudo systemctl start mongod
    - npm run start
## Function
<img src="./diagrams/icons/POST.jpg" alt="drawing" height="17"/> **/api/save-project**

```JAVA
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "project name",
    "description": "project description",
    "category": "project category",
    "year": "project year",
    "lang": "project lang"
}'
```

<img src="./diagrams/icons/POST.jpg" alt="drawing" height="17"/> **/upload-image/:id**

```JAVA
--header 'Content-Type: application/json' \
--form-data 'file'
```

<img src="./diagrams/icons/PUT.svg" alt="drawing" height="17"/> **/project/:id**
```JAVA
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "project name",
    "description": "project description",
    "category": "project category",
    "year": "project year",
    "lang": "project lang"
}'
```

## Collection
