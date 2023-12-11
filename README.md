# Next.js Clouty Shop

Para correr localmente, se necesita la base de datos.

```
docker-compose up -d
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Reconstruir los módulos de node y levantar Next

```
npm install
npm run dev
```

## Llenar la base de datos con información de pruebas

```
http://localhost:3000/api/seed
```
