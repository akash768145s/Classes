const fs=require('fs');
const path=require('path');
const os=require('os');

console.log('Current file:',path.basename(__filename));
console.log('Home dir:',os.homedir());
fs.writeFileSync('sample.txt','Hellow world from node.js');
console.log('File written');