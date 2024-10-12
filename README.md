<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# CodeKey API - Backend del Proyecto
## Este Proyecto utiliza yarn como gestor de dependencias
Si no tienes yarn instalalo globalmente
```
npm install - g yarn
```

1. Asegurate de tener Nest CLI instalado
```
npm install -g @nestjs/cli
```
2. Clonar el repositorio
```
git clone https://github.com/SebasDev807/CodeKey-api.git

```
3. Instalar dependencias
```
npm install
```

4. Levanta la base de datos
```
docker-compose up -d
```
5. renombra **.env.template** a **.env**
6. Llena las variables de entorno de **.env**


7. Ejecuta la aplicación en desarrollo
```
yarn start:dev
```

## API Endopoints

### 1. Crear un nuevo usuario
**Endpoint:**` POST - http://localhost:3000/api/v1/auth/register`  
**Descripción:** Crea un nuevo usuario en el sistema.  
**Body:**
```json  
{
  "name":"string", 
  "email":"string@unimayor.edu.co", 
  "password":"string", 
  "repeatedPassword":"string debe coincidir con password"
}
```


## Documentación de Nest

[Documentación oficial de Nest](https://nestjs.com/)

