import { Course } from "src/course/entities/course.entity";


type ValidRoles = 'ADMIN' | 'USER' | 'GUEST';


interface SeedUser {
  name: string;
  email: string;
  password: string;
  roles: ValidRoles[];
  confirmed: boolean;
}

interface SeedCourse {
  id: number;
  title: string,
  description: string;
  imageSrc: string;
}

interface SeedUnit {
  id: number;
  title: string;
  description: string;
  order: number;
  course: number;
}

interface SeedLesson {
  id: number;
  title: string;
  code: string;
  text: string;
  unit: number;
  order:number;
}

interface SeedData {
  users: SeedUser[];
  courses: SeedCourse[];
  units: SeedUnit[];
  lessons: SeedLesson[];
}


export const seedData: SeedData = {
  users: [
    {
      name: "User",
      email: "user@unimayor.edu.co",
      password: "Password12345",
      roles: ["ADMIN", "USER"],
      confirmed: true
    },
  ],
  courses: [
    {
      id: 1,
      title: "Fundamentos de JavaScript",
      imageSrc: "https://ejemplo.com/imagenes/js-fundamentos.jpg",
      description: "Aprende los conceptos básicos de JavaScript, incluyendo sintaxis, tipos de datos y estructuras de control.",
    }
  ],
  units: [
    {
      id: 1,
      title: "Introducción a JavaScript",
      description: "Configurando tu entorno y comprendiendo la sintaxis.",
      order: 1,
      course: 1
    },
    {
      id: 2,
      title: "Control de Flujo",
      description: "Entendiendo las estructuras condicionales y los bucles en JavaScript.",
      order: 2,
      course: 1
    },
    {
      id: 3,
      title: "Funciones y Ámbito",
      description: "Aprendiendo a definir y usar funciones, y comprendiendo el ámbito de las variables.",
      order: 3,
      course: 1
    },
    {
      id: 4,
      title: "Manipulación de Arrays",
      description: "Comprendiendo cómo manejar y manipular arrays en JavaScript.",
      order: 4,
      course: 1
    },
    {
      id: 5,
      title: "Objetos en JavaScript",
      description: "Aprendiendo sobre objetos y cómo usarlos para organizar datos.",
      order: 5,
      course: 1
    }
  ],
  lessons: [
    {
      id: 1,
      title: "Configurando tu Entorno",
      code: `// Código de ejemplo para configurar un proyecto básico de JavaScript\n\nconsole.log('¡Hola, Mundo!');`,
      text: "Este código muestra cómo se configura un proyecto básico de JavaScript. La instrucción `console.log('¡Hola, Mundo!')` se utiliza para mostrar el mensaje '¡Hola, Mundo!' en la consola del navegador o terminal, lo que es la primera interacción con el entorno de desarrollo.",
      order:1,
      unit: 1
    },
    {
      id: 2,
      title: "Variables y Tipos de Datos",
      code: `let nombre = 'Juan'; // Ejemplo de una variable de tipo cadena\nlet edad = 30; // Ejemplo de una variable de tipo número`,
      text: "En este ejemplo, se definen dos variables: `nombre` de tipo cadena y `edad` de tipo número. La palabra clave `let` se usa para declarar variables cuyo valor puede cambiar. Las cadenas se encierran entre comillas y los números se escriben sin comillas.",
      order:2,
      unit: 1
    },
    {
      id: 3,
      title: "Sentencias If y Bucles",
      code: `if (x > 10) { \n  console.log('x es mayor que 10');\n}\n\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
      text: "Este código muestra cómo usar una sentencia `if` para evaluar una condición (si `x` es mayor que 10) y cómo usar un bucle `for` para repetir un bloque de código varias veces. En el bucle, la variable `i` comienza en 0 y se incrementa hasta que llega a 5, imprimiendo cada valor en la consola.",
      order:3,
      unit: 2
    },
    {
      id: 4,
      title: "Funciones y Valores de Retorno",
      code: `function sumar(a, b) { \n  return a + b;\n}\n\nconsole.log(sumar(5, 3)); // Imprime 8`,
      text: "Este ejemplo define una función llamada `sumar` que toma dos parámetros (`a` y `b`) y devuelve la suma de ambos. Luego, se llama a la función con los argumentos 5 y 3, lo que imprime 8 en la consola.",
      order:4,
      unit: 3
    },
    {
      id: 5,
      title: "Manipulación de Arrays",
      code: `let frutas = ['manzana', 'banana', 'naranja'];\nfrutas.push('kiwi'); // Agrega 'kiwi' al final del array\nconsole.log(frutas);`,
      text: "Aquí se crea un array llamado `frutas` con tres elementos. Luego, se utiliza el método `push()` para agregar un nuevo elemento ('kiwi') al final del array. Finalmente, se imprime el array actualizado en la consola.",
      order:5,
      unit: 4
    },
    {
      id: 6,
      title: "Objetos en JavaScript",
      code: `let persona = {\n  nombre: 'Carlos',\n  edad: 25,\n  saludo: function() {\n    console.log('Hola, soy ' + this.nombre);\n  }\n};\n\npersona.saludo(); // Imprime "Hola, soy Carlos"`,
      text: "En este código, se crea un objeto `persona` con tres propiedades: `nombre`, `edad`, y un método `saludo` que imprime un mensaje en la consola. Se usa la palabra clave `this` para referirse al propio objeto dentro del método. Al llamar `persona.saludo()`, el mensaje 'Hola, soy Carlos' es mostrado en la consola.",
      order:6,
      unit: 5
    }
  ]
};
