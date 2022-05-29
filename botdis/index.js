const Discord = require("discord.js");
 const client = new Discord.Client({ disableMentions: 'everyone' });
const userSchema = require('./schemas/user-schema')
const accountsSchema = require('./schemas/accounts-schema')
const itemsSchema = require('./schemas/items-schema')
client.config = require("./botConfig");
const axios = require('axios')

const mongoose = require('mongoose');

const mongo = require('./mongo');

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
      try {
        console.log('Connected to mongodb!')
  
       /* const user = {
          email: 'test@email.com',
          username: 'Joe',
          password: 'Password1!',
        }
  
          await new userSchema(user).save()*/
          /*let username = "6"
          const accounts = {
            _id: "13",
            username: username,
            playerId: '30',
            
          }
          await new accountsSchema(accounts).save()*/
        
          

      } finally {
        mongoose.connection.close()
      }
    })
  }
  
//connectToMongoDB()

mongoose
  .connect("mongodb://localhost:27017/grasscutter?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then((m) => {
    console.log("Connected To Database");
  })
  

  client.on('message', function(message) {
    if (message.content === "!per") { 
      if (!client.config.admins.includes(message.author.id)) return;
      client.channels.cache.get("969415610612211733")
        .send("Định dạng tin nhắn gửi permission. Tên TK đăng nhập không phải tên INGAME!!!\n```!permission add [Tên Tài Khoản Đăng Nhập] *```\n\nVí dụ:\n```!permission add paimon *```")
      var interval = setInterval (function () {
          client.channels.cache.get("969415610612211733")
              .send("Định dạng tin nhắn gửi permission. Tên TK đăng nhập không phải tên INGAME!!!\n```!permission add [Tên Tài Khoản Đăng Nhập] *```\n\nVí dụ:\n```!permission add paimon *```")
              .catch(console.error);
          
      }, 600 * 1000); 
    }
});




const fs = require("fs");


/*client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}*/


/*client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command ==='ping'){
      client.commands.get('ping').execute(message, args);
    }
    if(command === 'account'){
      client.commands.get('account').execute(message,args);
    }
});*/

const config = require('./botconfig');
const { debug, count } = require("console");
const GM = require("./GM");


  client.on("message", async message => {
    if (message.content.startsWith(config.prefix)) {
          
      let args = message.content.slice(config.prefix.length).split(' ');
          
      let command = args.shift().toLowerCase();
          
      switch (command) {
          
      case 'account':
      if((!args[0]) || (!args[1])){
        message.reply("Vui lòng nhập đúng cú pháp\n\n ```!account [Username] [UID]```")
      }
      else{
        await mongo().then(async (mongoose) => {
          try{
            const accounts = {
              _id: args[1],
              username: args[0],
              playerId: args[1],
			  permissions: ["*"],
			  locale: "vi-VN",
            }
            const result1 = await accountsSchema.findOne({
              _id: args[1],
            })
            const result2 = await accountsSchema.findOne({
              username: args[0],
            })
            
            
            if((!result1) && (!result2)){
              await new accountsSchema(accounts).save()
              message.reply("Tạo account thành công")
            }else if(!result1 ){
              message.reply("Username đã có người sử dụng")
            }else if (!result2){
              message.reply("UID đã có người sử dụng")
            }else{
              message.reply("UID và Username đã có người sử dụng")
            }
            
          }catch(err){
            console.error(err)
          }
        })
          
                    
        }
        break;

       /* case 'permission':
          if(!args[0]){
            message.reply("Bạn đã nhập sai cú pháp\n ```!permission [Username]```")
          }else{
            const per = '*'
            await mongo().then(async (mongoose) => {
              try{
                /*await accountsSchema.findOneAndUpdate({
                  username: args[0],
                },
                {
                  $push: {
                    permissions: per,
                  },
                }
                )
                const result = await accountsSchema.findOne({
                  username: args[0],
                })
                if(!result){
                  message.reply("Không tìm thấy người chơi!")
                }else{
                  await accountsSchema.findOneAndUpdate({
                    username: args[0],
                  },
                  {
                    $push: {
                      permissions: per, 
                    },
                  }
                  )
                  message.reply("Đã add quyền quản trị")
                }
              }catch(err){
                console.error(err)
              }
            })
          }
          break;*/

          case 'tdv':
            if((message.channel.id != client.config.tdvchannel) && (message.channel.id != client.config.tdvchannel2)) return;
            if((!args)|| (!args[1]) || (!args[2]) || (!args[3]) || (!args[4]) || (!args[5]) || (!args[6]) || (!args[7]) || (!args[8]) || (!args[9]) || (!args[10]) || (!args[11]) || (!args[12])){
              message.reply("Bạn nhập sai cú pháp\n ```!tdv [UID] [Type] [Tên TDV] [Main Stats] [SubStat1] [SubStat2] [SubStat3] [SubStat4] [Stat+4] [Stat+8] [Stat+12] [Stat+16] [Stat+20]```\n\n Ví dụ:\n ```!tdv 409 Circlet 75330 critrate critdmg ER ATK% ATK critdmg critdmg critdmg critdmg critdmg```")
              
            }else{
              await mongo().then(async (mongoose) => {
                try {
                  let IDtdv="";
                  hoa = require("./tdv/hoa.json");
                  dongho = require("./tdv/dongho.json");
                  long = require("./tdv/long.json");
                  ly = require("./tdv/ly.json");
                  mu = require("./tdv/mu.json");
                  //let country = chars.find(el => el.name === name);
                  let mainstat;
                  if (args[1]==="hoa"){
                    let country = hoa.find(el => el.name === args[2]);
                    if(!country){
                      message.reply("Không tìm thấy TDV");
                      return;
                    }else {
                      IDtdv = country["ID"]
                    }
                    if(args[3] === "hp"){
                      mainstat = 14001;
                    }else{
                      message.reply("Hoa chỉ có thể chỉnh Hp không thể chỉnh khác!!\n```atk```");
                      return;
                    }
                  }else if(args[1]==="long"){
                    let country = long.find(el => el.name === args[2]);
                    if(!country){
                      message.reply("Không tìm thấy Thánh Di vật");
                      return;
                    }else {
                      IDtdv = country["ID"]
                    }
                    if(args[3] === "atk"){
                      mainstat = 12001;
                      
                    }else {
                      message.reply("Lông chỉ có thể chỉnh ATK không thể chỉnh thứ khác!!\n ```atk```")
                      return;
                    }
                  }else if(args[1]==="dongho"){
                    let country = dongho.find(el => el.name === args[2]);
                    if(!country){
                      message.reply("Không tìm thấy TDV");
                      return;
                    }else {
                      IDtdv = country["ID"]
                    }
                    if(args[3] === "em"){
                      mainstat = 10950;
                    }else if(args[3] === "er"){
                      mainstat = 10960;
                    }else if(args[3] === "def%"){
                      mainstat = 10970;
                    }else if(args[3] === "atk%"){
                      mainstat = 10990;
                    }else if(args[3] === "hp%"){
                      mainstat = 10980;
                    }else{
                      message.reply("Đồng hồ chỉ có thể chỉnh các dòng chính sau\n ```em: Tinh thông nguyên tố\ner: Hiệu quả nạp\ndef%: Phần trăm phòng ngự\natk%: Phần trăm tấn công\nhp%: Phần trăm HP```");
                      return;
                    }
                  }else if(args[1] === "ly"){
                    let country = ly.find(el => el.name === args[2]);
                    if(!country){
                      message.reply("Không tìm thấy TDV");
                      return;
                    }else {
                      IDtdv = country["ID"]
                    }
                    if(args[3] === "em"){
                      mainstat = 50880;
                    }else if(args[3] === "dmgvatli"){
                      mainstat = 50890;
                    }else if(args[3] === "dmgnham"){
                      mainstat = 50910;
                    }else if(args[3] === "dmgphong"){
                      mainstat = 50920;
                    }else if(args[3] === "dmgthuy"){
                      mainstat = 50930;
                    }else if(args[3] === "dmgbang"){
                      mainstat = 50940;
                    }else if(args[3] === "dmgloi"){
                      mainstat = 50950;
                    }else if(args[3] === "dmghoa"){
                      mainstat = 50960;
                    }else if(args[3] === "def%"){
                      mainstat = 50970;
                    }else if(args[3] === "hp%"){
                      mainstat = 50980;
                    }else if(args[3] === "atk%"){
                      mainstat = 50990;
                    }else{
                      message.reply("Ly chỉ có thể chỉnh các dòng chính sau\n```em: Tinh thông nguyên tố\ndmgvatli: Tăng sát thương vật lí\ndmgnham: Tăng sát thương nguyên tố Nham\ndmgphong: Tăng sát thương nguyên tố Phong\ndmgthuy: Tăng sát thương nguyên tố Thủy\ndmgbang: Tăng sát thương nguyên tố Băng\ndmgloi: Tăng sát thương nguyên tố điện\ndmghoa: Tăng sát thương nguyên tố hỏa\ndef%: Phần trăm phòng ngự\nhp%: Phần trăm Hp\natk%: Phần trăm tấn công```");
                      return;
                    }
                  }else if(args[1] === "mu"){
                    let country = mu.find(el => el.name === args[2]);
                    if(!country){
                      message.reply("Không tìm thấy TDV");
                      return;
                    }else {
                      IDtdv = country["ID"]
                    }
                    if(args[3] === "em"){
                      mainstat = 30930;
                    }else if(args[3] === "heal%"){
                      mainstat = 30940;
                    }else if(args[3] === "critdmg"){
                      mainstat = 30950;
                    }else if(args[3] === "critrate"){
                      mainstat = 30960;
                    }else if(args[3] === "def%"){
                      mainstat = 30970;
                    }else if(args[3] === "hp%"){
                      mainstat = 30980;
                    }else if(args[3] === "atk%"){
                      mainstat = 30990;
                    }else{
                      message.reply("Nón chỉ có thể chỉnh các dòng chính sau:\n ```em: Sát thương nguyên tố\nheal%: Tăng % Hồi máu\ncritdmg: Tăng sát thương bạo kích\ncritrate: Tăng tỉ lệ bạo kích\ndef%: Tăng % phòng ngự\nhp%: Tăng phần trăm HP\natk%: Tăng phần trăm tấn công```")
                      return;
                    }
                  }else{
                    message.reply("Không tìm thấy TDV. Các loại ID TDV:\n```hoa: Hoa\nlong: Lông\ndongho: Đồng hồ\nly: Ly\nmu: Mũ```")
                    return;
                  }
                  let substat= {};
                  for (let i = 4; i<=12 ; i++){
                    
                      if(args[i]=== "hp"){
                        substat[i] = 501024;
                      }else if(args[i] === "def"){
                        substat[i] = 501084;
                      }else if(args[i] === "atk"){
                        substat[i] = 501054;
                      }else if(args[i] === "em"){
                        substat[i] = 501244;
                      }else if(args[i] === "hp%"){
                        substat[i] = 501034;
                      }else if(args[i] === "def%"){
                        substat[i] = 501094;
                      }else if(args[i] === "atk%"){
                        substat[i] = "501064";
                      }else if(args[i] === "er"){
                        substat[i] = 501234;
                      }else if(args[i] === "critrate"){
                        substat[i] = 501204;
                      }else if(args[i] === "critdmg"){
                        substat[i] = 501224;
                      }else {
                        message.reply("Sai Substats. Các ID Substats khả dụng:\n```hp: HP\ndef: Phòng ngự\natk: Tấn công\nem: Sát thương nguyên tố\nhp%: Phần trăm HP\ndef%: Phần trăm phòng ngự\natk%: Phần trăm tấn công\ner: Hiệu quả nạp nguyên tố\ncritrate: Tỉ lệ bạo kích\ncritdmg: Sát thương bạo kích```")
                        return;
                      }
                    
                      
                    if(substat[i] === undefined){
                      substat[i] = {}
                    }
                  }
                  /*else {
                    
                  }*/
                  message.channel.send(IDtdv)
                  const tdv ={
                    ownerId: args[0],
                    itemId: IDtdv,
                    count: "1",
                    level: "21",
                    exp: "0",
                    totalExp: "270475",
                    promoteLevel: "0",
                    locked: false,
                    refinement: "0",
                    mainPropId: mainstat,
                    
                    appendPropIdList: [ substat[4],substat[5], substat[6], substat[7],substat[8],substat[9],substat[10],substat[11],substat[12], ],
                    
                    equipCharacter: "0",
                  }
                  message.channel.send("Đã add TDVthành công với UID: " + args[0]),
                  await new itemsSchema(tdv).save()
                  
                  /*await itemsSchema.findOneAndUpdate({tdv},
                  {
                    $addToSet: {
                      appedPropIdList: substat[4],
                    },
                    $addToSet: {
                      appedPropIdList: substat[5],
                    },
                    $addToSet: {
                      appedPropIdList: substat[6],
                    },

                  }
                  )*/
                }catch(err){
                  console.error(err)
                }
              })
            }
            break;

            /*case "gm":
              
              /*fs.readFile('./GM.json', 'utf-8', (err, jsonString) => {
                try{
                  const data = JSON.parse(jsonString);
                  console.log(data.Char.args[0])
                  message.channel.send(data.Char.args[0])
                } catch(err){
                  console.error(err)
                }
              })*/
              /*for (args[0] in gm) {
                if (gm.hasOwnProperty(args[0])) {
                    console.log(args[0] + " = " + gm[args[0]]);
                    
                    if(gm[args[0]] ===""){
                      
                    }else{
                      message.channel.send(gm[args[0]])
                    }
                    
                    
                }
            } */ 
            
           /*
            let restOfLetters = message.content.slice(5).toLowerCase();
            let UpfirstLetter = message.content.charAt(4).toUpperCase();
            if(!UpfirstLetter){

            }else{
              message.channel.send(UpfirstLetter + restOfLetters)
            }
            
            const name = UpfirstLetter + restOfLetters;
            if(!name){
              message.reply("Commands:\n```!gm [Tên Char/Item/Monster/vk4s/vk5s]```")
            }else{
              chars = require("./GM/chars.json");
              items = require("./GM/items.json");
              monsters = require("./GM/monsters.json");
              let country = chars.find(el => el.name === name);
            // => {name: "Albania", code: "AL"}
              if(!country){
              //message.channel.send("Không Tìm thấy Item/Char/Monsters có tên vậy!")
                country = items.find(el => el.name === name);
                if(!country){
                  country = monsters.find(el => el.name === name);
                  if(!country){
                    message.channel.send("Không Tìm thấy Item/Char/Monsters có tên **" + name + "** !!!")
                  }else{
                    message.channel.send("```Tên: " + country["name"] +" ID: " + country["ID"] +  "```\n**Commands**: \n```!spawn " + country["ID"] + " [Level]```" )
                  }
                }else{
                  message.channel.send("```Tên: " + country["name"] +" ID: " + country["ID"] +  "```\n**Commands**: \n```!give " + country["ID"] + " [Số lượng]```" )
                }
              }else{
                message.channel.send("```Tên: " + country["name"] +" ID: " + country["ID"] +  "```\n**Commands**: \n```!givechar " + country["ID"] + " 90```")
              }
            }
            
            break;*/

            case "commandtdv":
              
            break;
              
          
      }
    }
  })

client.on("ready", () => {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity("Private GI");
  
    
});

client.login(client.config.token);