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

## Stack Usado
* MongoDB
* Nest