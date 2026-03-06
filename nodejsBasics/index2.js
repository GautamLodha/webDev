const { Command } = require('commander');
const fs = require('fs')
const program = new Command();

program
  .name('count')
  .description('CLI to count words in the File')
  .version('0.8.0');

program.command('addTodo')
  .description('Add the Todo to the DB')
  .argument('<todos...>', 'string/todo to add')
  .action((todos) => {
    fs.writeFile('data.json',JSON.stringify(todos),(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("File written successfully");
        }
    })
  });

program.parse();