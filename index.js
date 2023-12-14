#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Insert component name: ', (folderName) => {
  if (!folderName) {
    console.error('Please, insert component name (example: ModuleName):');
    rl.close();
    process.exit(1);
  }

  rl.question('Insert destination folder (Atoms, Molecules, Organisms): ', (destinationFolder) => {
    if (!destinationFolder || (destinationFolder != "Atoms" && destinationFolder != "Molecules" && destinationFolder != "Organisms" ) {
      console.error('Please, insert destination folder (Only one the next three options: Atoms, Molecules, Organisms):');
      rl.close();
      process.exit(1);
    }

    const folderPath = path.join(process.cwd(),"components", destinationFolder, folderName);

    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error when trying to create the component: ${err.message}`);
        rl.close();
        process.exit(1);
      }

      console.log(`Component "${folderName}" successfully created in "${destinationFolder}" folder.`);

      const filesToCreate = ['index.ts', 'types.ts', `${folderName}.tsx`, `${folderName}.scss`, `${folderName}.spec.tsx`, `${folderName}.test.tsx`];

      filesToCreate.forEach((fileName) => {
        const filePath = path.join(folderPath, fileName);

        fs.writeFile(filePath, '', (err) => {
          if (err) {
            console.error(`Error writing the file ${fileName}: ${err.message}`);
          } else {
            console.log(` - File "${fileName}" has been created.`);
          }
        });
      });

      rl.close();
    });
  });
});