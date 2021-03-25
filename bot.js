require('dotenv').config();
const {sheets} = require('./command');
const {mail} = require('./checkMail');
const input = require('discord-input');
const {Client} = require('discord.js');
const client = new Client();
const pre = "!Join";

client.login('TOKEN');

client.on('message',(message) => {
  console.log(message.content);
  if(message.content === 'hello'){
     
    message.channel.send(`Hello ${message.author.tag}`)

  }
  async function answer(batch_number){
    const matrix = await sheets();

     let hash = new Map();
        
        for(var i=1;i<matrix.length;i++){
           hash.set(matrix[i][0],matrix[i][1]);
        }
        console.log(hash);


        if(!hash.has(batch_number)){
          message.channel.send("No current with this code")
        }
        
          else if(hash.get(batch_number) === 'YES'){
          message.channel.send("Enter you mail")
          
          }
          else{
            message.channel.send("No current batch with this code")
          } 
    
  }

  if(message.content.startsWith(pre)){
      const batch_number =  message.content.substring(pre.length);
      answer(batch_number);      
}

  if(message.content === 'Enter Your mail' && message.user.id === client.user.id){
    flag = false;
    setTimeout(() => {
      message.channel.send('Timeout');
      flag = true;
    }, 15000);
  }

  async function reply(mail1){
    const matrix1 = await mail();
    let hash1 = new Map();
        
        for(var i=1;i<matrix1.length;i++){
           hash1.set(matrix1[i][0],matrix1[i][1]);
        }
        console.log(hash1);
        if(hash1.has(mail1) && hash1.get(mail1) == 'ACTIVE' ){
          message.channel.send('Welcome to Outscal');
        }
        else{
          message.channel.send('You are not authorised for this batch. Please contact support team.Thank you');
        }

  }
   
  if(message.content.search('@') > 0){
    const email = message.content;
    reply(email);
  }
      
      
  })
  
