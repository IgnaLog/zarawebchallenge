<h1 align="center">ZARA WEB CHALLENGE</h1>

</br>

## Introducción

Este proyecto es una aplicación web para obtener información sobre diferentes personajes de Marvel. Está desarrollada utilizando React Hooks, TypeScript, SASS, ContextAPI, Vitest y Vite, y es compatible con Node.js versión 20.16.0.

## Estructura del Proyecto

La aplicación cuenta con dos vistas principales:

1. Vista Principal

   - Muestra un listado de 50 personajes o el resultado de los personajes introducidos en el buscador.
   - Incluye un icono para mostrar los personajes favoritos almacenados.

2. Detalle de Personaje

   - Proporciona información detallada sobre el personaje y los cómics en los que aparece.

El diseño es responsive y sigue los diseños proporcionados en Figma.

No se han utilizado ninguna librería de componentes externa como antd, reactstrap, materialui, etc. Todos los componentes estan construidos desde cero.

Se uso linters y formatters para mantener la calidad del código.

## Arquitectura

- public: Archivos estáticos como el favicon e imagen de portada.
- src: Contiene todo el código fuente de la aplicación.

  - pages: Vistas principales de la aplicación.
  - components: Componentes reutilizables.
  - context: Contextos para la gestión del estado.
  - styles: Estilos globales y específicos.
  - tests: Pruebas unitarias y de integración usando Vitest.
  - assets: Iconos utilizados en el diseño.
  - public: Archivos estáticos para el despliegue.

## Instalación y Configuración

### 1. Clona el Repositorio

```bash
git clone https://github.com/IgnaLog/zarawebchallenge.git
cd zarawebchallenge
```

### 2. Instala las Dependencias

Asegúrate de tener Node.js 20.16.0 instalado. Luego, ejecuta:

```bash
npm install
```

### 3. Configuración del Entorno

Crea un archivo .env en la raíz del proyecto y añade tus claves de API de Marvel:

```bash
VITE_MARVEL_PUBLIC_KEY=tu_clave_publica_de_api
VITE_MARVEL_PRIVATE_KEY=tu_clave_privada_de_api
VITE_BASE_URL=https://gateway.marvel.com/v1/public/characters
```

### 4. Ejecutar la Aplicación

#### Modo Desarrollo

Para iniciar el entorno de desarrollo, ejecuta:

```bash
npm run dev
```

Esto iniciará un servidor de desarrollo en http://localhost:5173/, donde podrás ver la aplicación en modo no minimizado.

#### Modo Producción

Para crear una versión de producción de la aplicación, ejecuta:

```bash
npm run build
```

Luego, puedes servir los archivos generados con un servidor estático como serve:

```bash
npm install -g serve
serve -s dist
```

Esto servirá los archivos en modo producción, con los assets concatenados y minimizados.

En la carpeta _dist_ se encuentran los assets concatenados y minimizados.

## Testing

Para ejecutar las pruebas, usa:

```bash
npm run test
```

Esto ejecutará Vitest para comprobar que todas las pruebas pasen correctamente.

## Despliegue

La aplicación está desplegada en Vercel y se puede acceder a través del siguiente enlace:

https://zarawebchallenge.vercel.app/
