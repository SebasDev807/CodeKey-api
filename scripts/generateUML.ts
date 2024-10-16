import { EOL } from 'os';
import { join } from 'path';
import { Direction, Flags, Format, TypeormUml, Colors } from 'typeorm-uml';

// Especifica la ruta a tu archivo ormconfig.json en la raíz del proyecto
const configPath = join(__dirname, 'ormconfig.json'); // Ajustado para la raíz del proyecto
const flags: Flags = {
  direction: Direction.LR, // LR: de izquierda a derecha
  format: Format.SVG, // Formato de salida
  handwritten: true, // Estilo manuscrito
  // colors: {
  //   'class.ArrowColor': '#ff9900',
  //   'class.BorderColor': '#ff9900',
  //   'class.BackgroundColor': '#efefef',
  //   column: '#ddd',
  //   // Agrega más colores personalizados si es necesario
  // },
};

const typeormUml = new TypeormUml();
typeormUml
  .build(configPath, flags)
  .then((url) => {
    process.stdout.write('Diagram URL: ' + url + EOL);
  })
  .catch((error) => {
    console.error('Error generating UML diagram:', error);
  });
