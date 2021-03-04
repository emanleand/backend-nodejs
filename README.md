# backend-nodejs
Backend in Nodejs
## Function
<img src="./diagrams/icons/POST.svg" alt="drawing" height="17"/> **/api/save-project**

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

<img src="./diagrams/icons/POST.svg" alt="drawing" height="17"/> **/upload-image/:id**

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