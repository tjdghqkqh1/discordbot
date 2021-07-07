const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.commands = new Discord.Collection()

const cooldonws = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.username} 라고온 FC 봇 준비완료!`)
});

client.on('guildMemberAdd',member=>{
    client.channels.cache.get('861865050310443010').send(`<@${member.user.id}> 님, 라고온 FC 디스코드 서버에 오신것을 환영합니다!`)
})

client.on('guildMemberRemove',member=>{
    client.channels.cache.get('861865050310443010').send(`<@${member.user.id}> 님, 응 잘가`)
})

client.on('message', msg => {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if(!command) return 
    if(!cooldonws.has(command.name)){
        cooldonws.set(command.name,new Discord.Collection())
    }
    const now = Date.now()
    const timestamps = cooldonws.get(command.name)
    const cooldonwAmount = (command.cooldonw || 3)*1000
    if(timestamps.has(msg.author.id)){
        const expirationTime = timestamps.get(msg.author.id) + cooldonwAmount
        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000
            return msg.reply(`${command.name} 라고온:해당 명령어를 사용하기 위해서는 ${timeLeft.toFixed(1)}초를 더 기다리셔야 합니다.`)
        }
    }
    timestamps.set(msg.author.id,now)
    setTimeout(()=> timestamps.delete(msg.author.id),cooldonwAmount)
    try{
        command.execute(msg, args)
    }catch(error) {
        console.log(error)
    }
})

var SERVER_NAME = 'LIFE GOES ON FC';
var SERVER_LOGO_URL = 'https://cdn.discordapp.com/attachments/807885273702334514/849227543772790784/cc512071874ccf80.png';

client.on("ready", () => {
    console.log(`라고온FC 욕감지 시스템`);
    console.log(`라고온FC : ${client.user.tag}로 로그인 하였습니다!`);

});

client.on('message', async message => {
    if(message.author.bot) return;

    let blacklisted = ["시발","개새끼","시볼","시불","시바아",,"시바","씨볼","씨발","개개끼","느금","느금마","머더뻐커","보지","자지","봉지","잣","좆","창녀","창년","자바곱바","자 바 곱 바","련아","년아","병신","염병","지랄","천병","뻐킹","뻐커","버킹","마더뻐","바보","개새기","멍청이","ㅅㅂ","ㅄ","씨"," :dog: 새끼","tlqkf","tlqhf"];

    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
        {
            message.delete()
            foundInText = true
        }
    }

    if (foundInText) {
        const user = message.author.username;
        const embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`라고온FC : ${user}님 부적절한 단어 감지`)
        .setDescription(' 부적절한 단어가 감지되어 자동으로 삭제되었습니다 ')
        .setTimestamp()
        .setFooter(`${SERVER_NAME}서버 욕감지`, `${SERVER_LOGO_URL}`);
        message.channel.send(embed)
}
}
);


client.login(token)