<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# CodeKey API - Backend del Proyecto

## Tabla de contenido

- [Tabla de contenido](#tabla-de-contenido)
- [Cómo contribuir](#cómo-contribuir)
  <!-- - [Contributor Behavior](#contributor-behavior) -->
  - [Configurar el entorno de desarrollo](#configurar-el-entorno-de-desarrollo)
  - [API Endopoints](#api-endopoints)
  - [Pull Requests](#pull-requests)
  <!-- - [License](#license) -->

## Cómo contribuir

### Configurar el entorno de desarrollo

Este Proyecto utiliza yarn como gestor de dependencias

1. Manejador de paquetes. Si no tienes yarn instalalo globalmente.

```bash
npm install -g yarn
```

2. Asegurate de tener Nest CLI instalado.

```bash
# npm
npm install -g @nestjs/cli

# o yarn
yarn global add @nestjs/cli
```

3. Clonar el repositorio.

```bash
git clone https://github.com/SebasDev807/CodeKey-api.git
```

4. Instalar dependencias.

```bash
cd CodeKey-api
yarn install
```

5. Levanta la base de datos.

```bash
  docker-compose up -d
```

6. renombra **.env.template** a **.env**

7. Llena las variables de entorno de **.env**

8. Ejecuta la aplicación en desarrollo.

```bash
  yarn start:dev
```
9. Llenar la base de datos(Ejecutar la semilla) > **Advertencia:**: Solo ejecutar una vez

```bash
  http://localhost:3000/api/v1/seed
```

### API Endpoints
Accede al siguiente url para visualizar la documentación

```
http://localhost:3000/api
```

## Documentación de Nest

[Documentación oficial de Nest](https://nestjs.com/)
