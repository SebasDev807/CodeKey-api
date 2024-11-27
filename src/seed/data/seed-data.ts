import { Course } from "src/course/entities/course.entity";
import { ChallengeOptions } from '../../challenge/entities/challenge-option.entity';
import { ChallengeCode } from "src/challenge/entities/challenge-code";


type ValidRoles = 'ADMIN' | 'USER' | 'GUEST';
type challengeTypes = 'SELECT';
type ChallengeChars = 'a' | 'b' | 'c' | 'd';

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

interface seedChallengeCode {
  id: number;
  code: string;
  expectedOutput: string;
  lesson: number;
  title: string;
  description: string;
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
  order: number;
}

interface SeedData {
  users: SeedUser[];
  courses: SeedCourse[];
  units: SeedUnit[];
  lessons: SeedLesson[];
  challenges: SeedChallenges[];
  challengeOptions: SeedChallengeOptions[];
  challengeCodes: seedChallengeCode[];
}

interface SeedChallenges {
  id: number,
  challengeType: string,
  question: string,
  order: number,
  lesson: number
}

interface SeedChallengeOptions {
  text: string;
  challenge: number;
  charOrder: ChallengeChars;
  correct: boolean;
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
    // Unit 1
    {
      id: 1,
      title: "Configurando tu Entorno",
      code: `// Código de ejemplo para configurar un proyecto básico de JavaScript\n\nconsole.log('¡Hola, Mundo!');`,
      text: "Este código muestra cómo se configura un proyecto básico de JavaScript. La instrucción `console.log('¡Hola, Mundo!')` se utiliza para mostrar el mensaje '¡Hola, Mundo!' en la consola del navegador o terminal.",
      order: 1,
      unit: 1,
    },
    {
      id: 2,
      title: "Variables y Tipos de Datos",
      code: `let nombre = 'Juan';\nlet edad = 30;`,
      text: "Aquí se definen variables de tipo cadena y número usando `let`. Las cadenas se encierran entre comillas y los números se escriben sin comillas.",
      order: 2,
      unit: 1,
    },
    {
      id: 3,
      title: "Operadores Aritméticos",
      code: `let suma = 5 + 3;\nconsole.log(suma); // Imprime 8`,
      text: "Se usa el operador `+` para sumar dos números. Este ejemplo muestra cómo realizar operaciones aritméticas básicas en JavaScript.",
      order: 3,
      unit: 1,
    },
    {
      id: 4,
      title: "Cadenas de Texto",
      code: `let saludo = "Hola " + "Mundo";\nconsole.log(saludo);`,
      text: "En este ejemplo, las cadenas se concatenan usando el operador `+`. Se imprime 'Hola Mundo' en la consola.",
      order: 4,
      unit: 1,
    },
    {
      id: 5,
      title: "Comentarios en el Código",
      code: `// Esto es un comentario de una línea\n/* Esto es un comentario\n   de varias líneas */`,
      text: "Los comentarios son útiles para documentar el código. Se pueden usar `//` para comentarios de una línea y `/* */` para varios.",
      order: 5,
      unit: 1,
    },

    // Unit 2
    {
      id: 6,
      title: "Sentencias If",
      code: `if (edad >= 18) {\n  console.log('Eres mayor de edad');\n}`,
      text: "La sentencia `if` se usa para ejecutar código condicionalmente. En este ejemplo, se verifica si la variable `edad` es mayor o igual a 18.",
      order: 6,
      unit: 2,
    },
    {
      id: 7,
      title: "Sentencias Else",
      code: `if (x > 10) {\n  console.log('x es mayor que 10');\n} else {\n  console.log('x no es mayor que 10');\n}`,
      text: "`else` se usa para ejecutar un bloque de código cuando la condición `if` no se cumple.",
      order: 7,
      unit: 2,
    },
    {
      id: 8,
      title: "Bucles For",
      code: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
      text: "El bucle `for` repite un bloque de código un número específico de veces. Aquí se imprime del 0 al 4 en la consola.",
      order: 8,
      unit: 2,
    },
    {
      id: 9,
      title: "Bucles While",
      code: `let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}`,
      text: "`while` repite un bloque de código mientras una condición sea verdadera. Este ejemplo imprime números del 0 al 4.",
      order: 9,
      unit: 2,
    },
    {
      id: 10,
      title: "Switch Case",
      code: `let dia = 3;\nswitch (dia) {\n  case 1: console.log('Lunes'); break;\n  case 2: console.log('Martes'); break;\n  case 3: console.log('Miércoles'); break;\n  default: console.log('Otro día');\n}`,
      text: "El `switch` evalúa la variable `dia` y ejecuta el bloque de código correspondiente al caso.",
      order: 10,
      unit: 2,
    },

    // Unit 3
    {
      id: 11,
      title: "Declarando Funciones",
      code: `function saludar() {\n  console.log('Hola!');\n}\nsaludar();`,
      text: "Una función se declara con `function` seguido del nombre. Se llama a la función usando `saludar()`, lo que imprime 'Hola!' en la consola.",
      order: 11,
      unit: 3,
    },
    {
      id: 12,
      title: "Parámetros de Función",
      code: `function multiplicar(a, b) {\n  return a * b;\n}\nconsole.log(multiplicar(2, 3));`,
      text: "Se define una función con parámetros `a` y `b` que devuelve su producto. El resultado de `multiplicar(2, 3)` es 6.",
      order: 12,
      unit: 3,
    },
    {
      id: 13,
      title: "Ámbito de Variables",
      code: `let global = 'Estoy fuera';\nfunction mostrar() {\n  let local = 'Estoy dentro';\n  console.log(global);\n}\nmostrar();`,
      text: "Las variables definidas fuera de las funciones son globales, mientras que las definidas dentro son locales al ámbito de la función.",
      order: 13,
      unit: 3,
    },
    {
      id: 14,
      title: "Funciones Flecha",
      code: `const sumar = (a, b) => a + b;\nconsole.log(sumar(4, 5));`,
      text: "Las funciones flecha son una forma concisa de definir funciones. Aquí se suma 4 y 5, lo que da 9.",
      order: 14,
      unit: 3,
    },
    {
      id: 15,
      title: "Funciones como Valores",
      code: `const mensaje = function() {\n  return 'Hola desde una función';\n};\nconsole.log(mensaje());`,
      text: "Una función se puede asignar a una variable como un valor. Aquí se define y llama a `mensaje` para imprimir un texto.",
      order: 15,
      unit: 3,
    },

    // Unit 4
    {
      id: 16,
      title: "Creando Arrays",
      code: `let numeros = [1, 2, 3, 4, 5];\nconsole.log(numeros);`,
      text: "Un array se crea usando corchetes `[]`. Este ejemplo define un array `numeros` con cinco elementos.",
      order: 16,
      unit: 4,
    },
    {
      id: 17,
      title: "Métodos de Array - Push",
      code: `let frutas = ['manzana', 'banana'];\nfrutas.push('naranja');\nconsole.log(frutas);`,
      text: "`push` agrega un elemento al final del array. Aquí se añade 'naranja' a `frutas`.",
      order: 17,
      unit: 4,
    },
    {
      id: 18,
      title: "Métodos de Array - Pop",
      code: `let colores = ['rojo', 'azul', 'verde'];\ncolores.pop();\nconsole.log(colores);`,
      text: "`pop` elimina el último elemento del array. 'verde' se elimina de `colores`.",
      order: 18,
      unit: 4,
    },
    {
      id: 19,
      title: "Iterar Arrays con ForEach",
      code: `let nombres = ['Ana', 'Luis', 'Juan'];\nnombres.forEach(nombre => console.log(nombre));`,
      text: "`forEach` itera sobre cada elemento del array `nombres`, imprimiendo cada nombre en la consola.",
      order: 19,
      unit: 4,
    },
    {
      id: 20,
      title: "Filtrando Arrays",
      code: `let numeros = [1, 2, 3, 4, 5];\nlet pares = numeros.filter(num => num % 2 === 0);\nconsole.log(pares);`,
      text: "`filter` crea un nuevo array con los elementos que cumplen la condición. Aquí, `pares` contiene solo números pares.",
      order: 20,
      unit: 4,
    },

    // Unit 5
    {
      id: 21,
      title: "Creando Objetos",
      code: `let libro = {\n  titulo: 'JavaScript Básico',\n  autor: 'Juan Pérez'\n};\nconsole.log(libro);`,
      text: "Se crea un objeto `libro` con dos propiedades: `titulo` y `autor`. Los objetos se definen con llaves `{}`.",
      order: 21,
      unit: 5,
    },
    {
      id: 22,
      title: "Accediendo a Propiedades",
      code: `let coche = {\n  marca: 'Toyota',\n  modelo: 'Corolla'\n};\nconsole.log(coche.marca);`,
      text: "Para acceder a las propiedades de un objeto se usa la notación de punto. Aquí se imprime 'Toyota'.",
      order: 22,
      unit: 5,
    },
    {
      id: 23,
      title: "Métodos de Objetos",
      code: `let calculadora = {\n  sumar: (a, b) => a + b\n};\nconsole.log(calculadora.sumar(2, 3));`,
      text: "Un método es una función dentro de un objeto. `calculadora.sumar` suma dos números, resultando en 5.",
      order: 23,
      unit: 5,
    },
    {
      id: 24,
      title: "Objetos Anidados",
      code: `let empresa = {\n  nombre: 'Tech Corp',\n  direccion: {\n    calle: 'Principal',\n    ciudad: 'Metropolis'\n  }\n};\nconsole.log(empresa.direccion.ciudad);`,
      text: "Los objetos pueden contener otros objetos. Aquí, `empresa.direccion.ciudad` imprime 'Metropolis'.",
      order: 24,
      unit: 5,
    },
    {
      id: 25,
      title: "El Objeto This",
      code: `let persona = {\n  nombre: 'Laura',\n  presentar: function() {\n    console.log('Hola, soy ' + this.nombre);\n  }\n};\npersona.presentar();`,
      text: "`this` se refiere al objeto actual. `persona.presentar()` imprime 'Hola, soy Laura'.",
      order: 25,
      unit: 5,
    },
  ],
  challenges: [
    // Challenges for Unit 1
    {
      id: 1,
      challengeType: "SELECT",
      question: "¿Qué tipo de dato es '42' en JavaScript?",
      order: 1,
      lesson: 2
    },
    {
      id: 2,
      challengeType: "SELECT",
      question: "¿Qué operador se utiliza para concatenar cadenas en JavaScript?",
      order: 2,
      lesson: 4
    },
    {
      id: 3,
      challengeType: "SELECT",
      question: "¿Qué método se usa para agregar un comentario en varias líneas?",
      order: 3,
      lesson: 5
    },
    {
      id: 4,
      challengeType: "SELECT",
      question: "¿Cuál es el valor de la variable `suma` en el siguiente código: `let suma = 3 + 5;`?",
      order: 4,
      lesson: 3
    },
    {
      id: 5,
      challengeType: "SELECT",
      question: "¿Cómo se puede mostrar un mensaje en la consola?",
      order: 5,
      lesson: 1
    },
    // Challenges for Unit 2
    {
      id: 6,
      challengeType: "SELECT",
      question: "¿Qué palabra clave se usa para crear una condición en JavaScript?",
      order: 6,
      lesson: 6
    },
    {
      id: 7,
      challengeType: "SELECT",
      question: "¿Cómo se utiliza un `else` en una sentencia `if`?",
      order: 7,
      lesson: 7
    },
    {
      id: 8,
      challengeType: "SELECT",
      question: "¿Cuál de los siguientes bucles se ejecuta al menos una vez?",
      order: 8,
      lesson: 8
    },
    {
      id: 9,
      challengeType: "SELECT",
      question: "¿Cómo puedes hacer un bucle que se ejecute mientras una condición sea verdadera?",
      order: 9,
      lesson: 9
    },
    {
      id: 10,
      challengeType: "SELECT",
      question: "¿Cuál es el valor impreso en consola si `dia = 3`?",
      order: 10,
      lesson: 10
    },

    // Challenges for Unit 3
    {
      id: 11,
      challengeType: "SELECT",
      question: "¿Cómo se declaran funciones en JavaScript?",
      order: 11,
      lesson: 11
    },
    {
      id: 12,
      challengeType: "SELECT",
      question: "¿Cuál es el resultado de la función `multiplicar(3, 4)`?",
      order: 12,
      lesson: 12
    },
    {
      id: 13,
      challengeType: "SELECT",
      question: "¿Qué tipo de ámbito tiene una variable definida dentro de una función?",
      order: 13,
      lesson: 13
    },
    {
      id: 14,
      challengeType: "SELECT",
      question: "¿Cómo se puede escribir una función con sintaxis más corta?",
      order: 14,
      lesson: 14
    },
    {
      id: 15,
      challengeType: "SELECT",
      question: "¿Qué hace una función cuando es asignada a una variable?",
      order: 15,
      lesson: 15
    },

    // Challenges for Unit 4
    {
      id: 16,
      challengeType: "SELECT",
      question: "¿Qué método de array se usa para agregar elementos al final de un array?",
      order: 16,
      lesson: 16
    },
    {
      id: 17,
      challengeType: "SELECT",
      question: "¿Cuál es el valor del array `frutas` después de ejecutar `frutas.push('naranja')`?",
      order: 17,
      lesson: 17
    },
    {
      id: 18,
      challengeType: "SELECT",
      question: "¿Qué valor se imprimirá si usamos `colores.pop()` en el array `['rojo', 'azul', 'verde']`?",
      order: 18,
      lesson: 18
    },
    {
      id: 19,
      challengeType: "SELECT",
      question: "¿Qué método se usa para recorrer todos los elementos de un array?",
      order: 19,
      lesson: 19
    },
    {
      id: 20,
      challengeType: "SELECT",
      question: "¿Cómo filtrarías los números pares de un array?",
      order: 20,
      lesson: 20
    },

    // Challenges for Unit 5
    {
      id: 21,
      challengeType: "SELECT",
      question: "¿Cómo se accede a las propiedades de un objeto?",
      order: 21,
      lesson: 21
    },
    {
      id: 22,
      challengeType: "SELECT",
      question: "¿Qué valor se imprimirá si usamos `console.log(coche.marca)`?",
      order: 22,
      lesson: 22
    },
    {
      id: 23,
      challengeType: "SELECT",
      question: "¿Cómo se define un método dentro de un objeto?",
      order: 23,
      lesson: 23
    },
    {
      id: 24,
      challengeType: "SELECT",
      question: "¿Cómo accederías a una propiedad de un objeto anidado?",
      order: 24,
      lesson: 24
    },
    {
      id: 25,
      challengeType: "SELECT",
      question: "¿Qué imprime el siguiente código: `persona.presentar()` donde `persona` es un objeto con un método `presentar`?",
      order: 25,
      lesson: 25
    },
  ],
  challengeOptions: [
    //Desafío 1
    {
      text: 'Número',
      challenge: 1,
      charOrder: 'a',
      correct: false,
    },
    {
      text: 'Cadena',
      challenge: 1,
      charOrder: 'b',
      correct: true,
    },
    {
      text: 'Booleano',
      challenge: 1,
      charOrder: 'c',
      correct: false,
    },
    {
      text: 'Objeto',
      challenge: 1,
      charOrder: 'd',
      correct: false,
    },


    //Desafio 2
    {
      text: 'El operador +',
      challenge: 2,
      charOrder: 'a',
      correct: true,
    },
    {
      text: 'El operador *',
      challenge: 2,
      charOrder: 'b',
      correct: false,
    },
    {
      text: 'El operador &',
      challenge: 2,
      charOrder: 'c',
      correct: false,
    },
    {
      text: 'El operador -',
      challenge: 2,
      charOrder: 'd',
      correct: false,
    },


    //Desafío 3
    {
      text: '/* comentario */',
      challenge: 3,
      charOrder: 'a',
      correct: true,
    },
    {
      text: '// comentario',
      challenge: 3,
      charOrder: 'b',
      correct: false,
    },
    {
      text: '/* comentario',
      challenge: 3,
      charOrder: 'c',
      correct: false,
    },
    {
      text: '/** comentario **/',
      challenge: 3,
      charOrder: 'd',
      correct: false,
    },


    //Desafío 4
    {
      text: '8',
      challenge: 4,
      charOrder: 'a',
      correct: false,
    },
    {
      text: '5',
      challenge: 4,
      charOrder: 'b',
      correct: false,
    },
    {
      text: '3',
      challenge: 4,
      charOrder: 'c',
      correct: true,
    },
    {
      text: '10',
      challenge: 4,
      charOrder: 'd',
      correct: false,
    },


    //Desafío 5
    {
      text: 'console.log()',
      challenge: 5,
      charOrder: 'a',
      correct: true,
    },
    {
      text: 'alert()',
      challenge: 5,
      charOrder: 'b',
      correct: false,
    },
    {
      text: 'document.write()',
      challenge: 5,
      charOrder: 'c',
      correct: false,
    },
    {
      text: 'console.alert()',
      challenge: 5,
      charOrder: 'd',
      correct: false,
    },
  ],
  challengeCodes: [

    {
      id: 3,
      code: "let name = ''; let age = ; console.log(name, age);",
      expectedOutput: "Juan 30",
      title: "Variables básicas",
      description: "Crea dos variables, una para el nombre y otra para la edad, y muestra ambos valores en la consola.",
      lesson: 2
    },
    {
      id: 4,
      code: "let isStudent = ; console.log(isStudent);",
      expectedOutput: "true",
      title: "Booleano",
      description: "Crea una variable booleana que indique si eres estudiante o no, y muestra el valor en la consola.",
      lesson: 2
    },
    {
      id: 5,
      code: "let price = ; let tax = ; let total = ; console.log();",
      expectedOutput: "24.1789",
      title: "Cálculos con números decimales",
      description: "Crea una variable para un precio y otra para el impuesto. Calcula el precio total incluyendo el impuesto y muéstralo en la consola.",
      lesson: 2
    },
    {
      id: 6,
      code: "let fruits = ['manzana','pera','banana','mora']; console.log(fruits);",
      expectedOutput: "banana",
      title: "Arreglo de strings",
      description: "Crea un arreglo con tres frutas y muestra el segundo elemento en la consola.",
      lesson: 2
    },
    {
      id: 7,
      code: "let user = {name:'Carlos'}; console.log();",
      expectedOutput: "Carlos",
      title: "Objeto",
      description: "Crea un objeto con las propiedades 'name' y 'age', y muestra el valor de la propiedad 'name'.",
      lesson: 2
    },
    {
      id: 8,
      code: "let a = 15; let b = 4; let result = ; console.log(result);",
      expectedOutput: "19",
      title: "Suma de dos números",
      description: "Usa el operador de suma (+) para sumar dos números y muestra el resultado en la consola.",
      lesson: 3
    },

    //Operadores
    {
      id: 9,
      code: "let a = 20; let b = 5; let result = ; console.log(result);",
      expectedOutput: "15",
      title: "Resta de dos números",
      description: "Usa el operador de resta (-) para restar dos números y muestra el resultado en la consola.",
      lesson: 3
    },

    {
      id: 10,
      code: "let a = 6; let b = 3; let result = ; console.log(result);",
      expectedOutput: "18",
      title: "Multiplicación de dos números",
      description: "Usa el operador de multiplicación (*) para multiplicar dos números y muestra el resultado en la consola.",
      lesson: 3
    },
    {
      id: 11,
      code: "let a = 20; let b = 4; let result = ; console.log(result);",
      expectedOutput: "5",
      title: "División de dos números",
      description: "Usa el operador de división (/) para dividir dos números y muestra el resultado en la consola.",
      lesson: 3
    },
    {
      id: 12,
      code: "let a = 10; let b = 3; let result = ; console.log(result);",
      expectedOutput: "1",
      title: "Módulo de dos números",
      description: "Usa el operador de módulo (%) para obtener el residuo de la división de dos números y muestra el resultado en la consola.",
      lesson: 3
    },

    //Sentencias de control
    {
      id: 6,
      code: "let temperature = 25; let message = ''; if () { message = 'Hace calor'; } else { message = 'Hace frío'; } console.log(message);",
      expectedOutput: "Hace frío",
      title: "Condicional IF - Temperatura",
      description: "Usa una sentencia `if` para verificar si la temperatura es mayor o igual a 30 y asigna el mensaje 'Hace calor'. Si no, asigna 'Hace frío'. Muestra el mensaje en la consola.",
      lesson: 6
    },
    {
      id: 7,
      code: "let age = 18; let access = ''; if () { access = 'Acceso permitido'; } else { access = 'Acceso denegado'; } console.log(access);",
      expectedOutput: "Acceso permitido",
      title: "Condicional IF - Edad",
      description: "Usa una sentencia `if` para verificar si la edad es mayor o igual a 18 y asigna 'Acceso permitido'. Si no, asigna 'Acceso denegado'. Muestra el mensaje en la consola.",
      lesson: 6
    },
    {
      id: 8,
      code: "let number = 7; let result = ''; if () { result = 'Número positivo'; } else { result = 'Número negativo'; } console.log(result);",
      expectedOutput: "Número positivo",
      title: "Condicional IF - Número",
      description: "Usa una sentencia `if` para verificar si el número es mayor que cero y asigna 'Número positivo'. Si no, asigna 'Número negativo'. Muestra el resultado en la consola.",
      lesson: 6
    },
    {
      id: 9,
      code: "let score = 85; let grade = ''; if () { grade = 'A'; } else if () { grade = 'B'; } else { grade = 'C'; } console.log(grade);",
      expectedOutput: "B",
      title: "Condicional IF - Calificación",
      description: "Usa sentencias `if` y `else if` para asignar una calificación basada en la puntuación. Asigna 'A' si la puntuación es 90 o más, 'B' si es mayor o igual a 80, y 'C' en los demás casos. Muestra la calificación en la consola.",
      lesson: 6
    },
    {
      id: 10,
      code: "let num1 = 10; let num2 = 20; let message = ''; if () { message = 'Num1 es mayor que Num2'; } else { message = 'Num1 no es mayor que Num2'; } console.log(message);",
      expectedOutput: "Num1 no es mayor que Num2",
      title: "Condicional IF - Comparación de números",
      description: "Usa una sentencia `if` para comparar dos números y asigna un mensaje dependiendo de si el primer número es mayor que el segundo. Muestra el mensaje en la consola.",
      lesson: 6
    },


    {
      id: 11,
      code: "let sum = 0; for (let i = 1; i <= 5; i++) { sum += i; } console.log(sum);",
      expectedOutput: "15",
      title: "Bucle FOR - Suma de los primeros 5 números",
      description: "Usa un bucle `for` para sumar los primeros 5 números (1 + 2 + 3 + 4 + 5) y muestra el resultado en la consola.",
      lesson: 8
    },
    {
      id: 12,
      code: "let evenNumbers = ''; for (let i = 2; i <= 20; i += 2) { evenNumbers += i + ' '; } console.log(evenNumbers);",
      expectedOutput: "2468101214161820 ",
      title: "Bucle FOR - Números pares",
      description: "Usa un bucle `for` para concatenar los números pares entre 2 y 20 en una variable `evenNumbers` y luego muestra el resultado.",
      lesson: 8
    },
    {
      id: 13,
      code: "let factorial = 1; for (let i = 1; i <= 5; i++) { factorial *= i; } console.log(factorial);",
      expectedOutput: "120",
      title: "Bucle FOR - Cálculo del factorial",
      description: "Usa un bucle `for` para calcular el factorial de 5 (5 * 4 * 3 * 2 * 1) y muestra el resultado en la consola.",
      lesson: 8
    },
    {
      id: 14,
      code: "let reversed = ''; for (let i = 5; i >= 1; i--) { reversed += i + ' '; } console.log(reversed);",
      expectedOutput: "54321",
      title: "Bucle FOR - Contando hacia atrás",
      description: "Usa un bucle `for` para contar hacia atrás desde 5 hasta 1 y concatenar los números en una variable `reversed`. Muestra el resultado en la consola.",
      lesson: 8
    },
    {
      id: 15,
      code: "let squares = ''; for (let i = 1; i <= 10; i++) { squares += (i * i) + ' '; } console.log(squares);",
      expectedOutput: "149162536496481100",
      title: "Bucle FOR - Cuadrados de los primeros 10 números",
      description: "Usa un bucle `for` para calcular y concatenar los cuadrados de los primeros 10 números (1^2, 2^2, 3^2...) en una variable `squares`. Luego muestra el resultado en la consola.",
      lesson: 8
    }
  ]
};




