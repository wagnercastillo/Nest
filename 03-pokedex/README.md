<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar el respositorio 

2. Ejecutar 

```
npm install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno dentro de ```.env```

7. Ejecutar la aplicación en dev:  ``` yarn start:dev || npm run start:dev```

8. Reconstruir la base de datos con la semilla 
```
localhost:3000/api/v2/seed
```

## Production Build

1. Crear el archivo ``` .env.prod```
2. Llenar las variables de entorno de prod
3. Crear una imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. Run
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

- Nota
Por defecto, __docker-compose__ usa el archivo ```.env```, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yaml up --build


## Stack Usado
* MongoDB
* Nest

