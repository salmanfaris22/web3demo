#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Get the component name from the command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

// Get the directory from which the command was run
const currentDir = process.cwd();
const componentDir = path.join(currentDir, componentName);

if (fs.existsSync(componentDir)) {
  console.error(`Component ${componentName} already exists in ${componentDir}.`);
  process.exit(1);
}

// Create the component directory
fs.mkdirSync(componentDir);

// Create the .tsx file with boilerplate code
const tsxContent = `import React from 'react';
import styles from './${componentName}.module.scss';

const ${componentName} = () => {
  return (
    <div className={styles.container}>
      {/* Your component code here */}
    </div>
  );
};

export default ${componentName};
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), tsxContent);

// Create the .scss file with boilerplate code
const scssContent = `.container {
  /* Your styles here */
}
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), scssContent);

console.log(`${componentName} component has been created successfully in ${componentDir}.`);
