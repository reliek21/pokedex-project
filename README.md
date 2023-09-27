<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in Development

1. Clone this repository
2. Execute
```bash
npm install
```
3. Get NestJS CLI in your computer
```bash
npm i -g @nestjs/cli
```

4. Clonar el archivo ``.env.example`` para poder correr el proyecto y renombrar a ``.env.local`` o ``.env``:
```
.env.example > .env.local
```

5. Llenar las variables de entorno definidas en el `.env`

6. Ejecutar la aplicación en dev:
```
npm run start:dev
```

7. Get up the database
```bash
docker-compose up -d
```

8. Reconstruir la base de datos con la semilla haciendo una petición al siguiente ``endpoint``:
```
http://localhost:3000/api/v2/seed
```

## Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. 

## Stack
* TypeScript
* NestJS
* MongoDB
