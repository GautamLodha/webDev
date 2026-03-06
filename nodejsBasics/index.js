const { Command } = require('commander');
const fs = require('fs')
const program = new Command();
program
  .name('count')
  .description('CLI to count words in the File')
  .version('0.8.0');

program.command('count')
  .description('Count the number of words in the given file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file,'utf-8',function(err,data){
        if(err){
            console.log(err);
        }else{
            const words = data.split(' ').length;
            console.log(`There are ${words} words in the ${file} file`)
        }
    })
  });

program.parse();