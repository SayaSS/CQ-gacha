const fs = require('fs');
const api=require('./api');
const bot=api.bot;
const jstat = require('jstat');
const images = require("images");


/*配置部分，请按自己需求配置*/
let weight = [0.7, 3.4, 18, 77, 0.9]; // fes池子:up的fes角色(公主优衣)/其他3星/2星/1星/其他fes角色(nnk,克总,511，公主佩可，公主可可萝)（%）
let charaUp = ["3-yui (purinsesu)"];//up角色
let charaUpSide = [
    "3-Christina",
    "3-Pekorinu (purinsesu)",
    "3-Neneka",
    "3-Muimi",
    "3-Kokkoro (purinsesu)"
];//其他fes角色,非fes池子不用管
let chara3 = [
    "3-Akino","3-An","3-aNna",
    "3-Aoi (hennyusei)","3-Arisa","3-Gurea",
    "3-hacune","3-Io","3-Iriya (kurisumasu)",
    "3-Iriya","3-Jun","3-Jita",
    "3-Kasumi (majikaru)","3-Kasumi","3-Kaya",
    "3-Kuroe","3-Kuuka (oedo)","3-Kyouka",
    "3-maho","3-Makoto","3-Mimi (halloween)",
    "3-Monika","3-Ninon (oedo)","3-Ninon",
    "3-Nozomi","3-rino","3-Ruka",
    "3-Runa","3-Saren","3-Shizuru",
    "3-Tomo"
];//其他3星
let chara2 = [
    "2-Akari","2-Ayane","2-Chika",
    "2-Eriko","2-Kaori","2-Kuuka",
    "2-Mahiru","2-Matsuri","2-Mifuyu",
    "2-Mimi","2-Misato","2-Mitsuki",
    "2-Miyako","2-Nanaka","2-Rin",
    "2-Shinobu","2-Shiori","2-Suzuna",
    "2-Tamaki","2-Tsumugi","2-Yuki",
];//2星
let chara1 = [
    "1-Aoi", "1-Ayumi", "1-Hiyori",
    "1-Kurumi", "1-Misaki", "1-Misogi",
    "1-Rei", "1-Rima", "1-Suzume",
    "1-Yori", "1-Yukari",
];//1星
let __resource='C:\\Users\\pc\\Desktop\\公主连接模拟抽卡\\gacha';//资源文件夹路径
/*配置部分，请按自己需求配置*/


let wtp=[];let p=[];
let __pcr=`${__resource}\\pcr`;
function sum(arr) {let s = 0;for (let i=0; i<arr.length; i++) {s += arr[i];}return s;}
function choice(arr) {return arr[Math.floor((Math.random()*arr.length))]}
for (let i in weight){wtp.push(1. * weight[i] / sum(weight))}
for (let i in wtp){p.push(jstat.normal.sample(1. /wtp[i], 1. /wtp[i]/3 ))}


let loacation={
    new:[
        [330,190],[587,190],[836,190],[1085,190],[1341,190],
        [330,460],[587,460],[836,460],[1085,460],[1341,460]
    ],
    light:[
        [337,198],[594,198],[843,198],[1092,198],[1348,198],
        [337,468],[594,468],[843,468],[1092,468],[1348,468],
    ]
};

function rolls(times) {
    let result=[];
    for (let i=0;i<times;i++){
        let minp = 1.e9;
        let minj = -1;
        for (let j in p){
            if (p[j] < minp){
                minp = p[j];
                minj = parseInt(j);
            }
        }
        if (minj === 0){
            result.push(choice(charaUp));
        } else if (minj === 1) {
            result.push(choice(chara3));
        } else if (minj === 2) {
            result.push(choice(chara2));
        } else if (minj === 3) {
            result.push(choice(chara1));
        } else if (minj === 4) {
            result.push(choice(charaUpSide));
        }
        for (let j in p){
            p[j] -= minp;
        }
        p[minj] = jstat.normal.sample(1. / wtp[minj], 1. / wtp[minj] / 3.)
    }
    return result
}
function main() {
    bot.on('message', async context => {
        if (context.message.indexOf('#抽卡')>=0){
            let file=fs.readFileSync(__dirname+'\\src\\db.json').toString();
            let database=JSON.parse(file);
            let gacha=rolls(10);
            let name=context.user_id+'_'+new Date().getTime();
            if(gacha[9].split('-')[0]==='1') {
                gacha[9] = choice(chara2);
            }
            let result= images(`${__resource}\\bg.jpg`)
                .draw(images(`${__pcr}\\${gacha[0]}.png`),365,229)
                .draw(images(`${__resource}\\frame.png`),355,216)
                .draw(images(`${__resource}\\star${gacha[0].split('-')[0]}.png`),365,225)

                .draw(images(`${__pcr}\\${gacha[1]}.png`),622,229)
                .draw(images(`${__resource}\\frame.png`),612,216)
                .draw(images(`${__resource}\\star${gacha[1].split('-')[0]}.png`),622,225)

                .draw(images(`${__pcr}\\${gacha[2]}.png`),871,229)
                .draw(images(`${__resource}\\frame.png`),861,216)
                .draw(images(`${__resource}\\star${gacha[2].split('-')[0]}.png`),871,225)

                .draw(images(`${__pcr}\\${gacha[3]}.png`),1120,229)
                .draw(images(`${__resource}\\frame.png`),1110,216)
                .draw(images(`${__resource}\\star${gacha[3].split('-')[0]}.png`),1120,225)

                .draw(images(`${__pcr}\\${gacha[4]}.png`),1376,229)
                .draw(images(`${__resource}\\frame.png`),1366,216)
                .draw(images(`${__resource}\\star${gacha[4].split('-')[0]}.png`),1376,225)

                .draw(images(`${__pcr}\\${gacha[5]}.png`),365,499)
                .draw(images(`${__resource}\\frame.png`),355,486)
                .draw(images(`${__resource}\\star${gacha[5].split('-')[0]}.png`),365,495)

                .draw(images(`${__pcr}\\${gacha[6]}.png`),622,499)
                .draw(images(`${__resource}\\frame.png`),612,486)
                .draw(images(`${__resource}\\star${gacha[6].split('-')[0]}.png`),622,495)

                .draw(images(`${__pcr}\\${gacha[7]}.png`),871,499)
                .draw(images(`${__resource}\\frame.png`),861,486)
                .draw(images(`${__resource}\\star${gacha[7].split('-')[0]}.png`),871,495)

                .draw(images(`${__pcr}\\${gacha[8]}.png`),1120,499)
                .draw(images(`${__resource}\\frame.png`),1108,486)
                .draw(images(`${__resource}\\star${gacha[8].split('-')[0]}.png`),1120,495)

                .draw(images(`${__pcr}\\${gacha[9]}.png`),1376,499)
                .draw(images(`${__resource}\\frame.png`),1366,486)
                .draw(images(`${__resource}\\star${gacha[9].split('-')[0]}.png`),1376,495);
            if (!database[`${context.user_id}`]) {
                database[`${context.user_id}`]={"package": []};
            }
            for (let cnt=0;cnt<gacha.length;cnt++){
                if (gacha[cnt].split('-')[0]==='3') {
                    let x=loacation.light[cnt][0];
                    let y=loacation.light[cnt][1];
                    result
                        .draw(images(`${__resource}\\prime.png`),x,y);
                }
            }
            let package=database[`${context.user_id}`]['package'];
            for (let cnt=0;cnt<gacha.length;cnt++){
                if (!package.includes(gacha[cnt])) {
                    let x=loacation.new[cnt][0];
                    let y=loacation.new[cnt][1];
                    result
                        .draw(images(`${__resource}\\new.png`),x,y);
                    package.push(gacha[cnt]);
                    database[`${context.user_id}`]['package']=package;
                }
            }
            fs.writeFileSync(__dirname+'\\src\\db.json',JSON.stringify(database,"","\t"));
            result
                .resize(1920)
                .save(`${__resource}\\result\\${name}.png`);
            console.log(context.user_id+'->抽卡结果图片生成完毕，正在发送');
            let message=`[CQ:at,qq=${context.user_id}][CQ:image,file=file:///${__resource}\\result\\${name}.png]`;
            bot('send_msg', {
                message_type:context.message_type,
                user_id:context.group_id||context.user_id||context.discuss_id,
                group_id:context.group_id||context.user_id||context.discuss_id,
                discuss_id:context.group_id||context.user_id||context.discuss_id,
                message:message,
            }).then(res=>{
                console.log(context.user_id+'->抽卡结果图片已发送')
            }).catch(res=>{
                console.log(context.user_id+'->抽卡结果图片发送失败:'+res+'，请检查网络环境和HTTP-API插件配置是否正确')
            });
        }
    })
}
function query(){
    bot.on('message', async context => {
        try {
            if (context.message.indexOf('#查询仓库') >= 0) {
                    let message='';
                    let file=fs.readFileSync(__dirname+'\\src\\db.json').toString();
                    let database=JSON.parse(file);
                    let query=database[`${context.user_id}`]['package'];
                    if (query) {
                        if (query.length){
                            let package=database[`${context.user_id}`]['package'].sort().reverse();
                            let height=Math.ceil(package.length/10)*175;
                            let width=175*10;
                            let result=images(width, height);
                            let x=0,y=0,cnt=0;
                            for (let i=0;i<package.length;i++){
                                let img=package[i];
                                result
                                    .draw(images(`${__pcr}\\${img}.png`),x,y);
                                cnt++;
                                if (cnt<10){
                                    x+=175;
                                }else {
                                    x=0;y+=175;cnt=0;
                                }
                            }
                            result
                                .resize(width)
                                .save(`${__resource}\\result\\${context.user_id}_query.png`);
                            console.log(context.user_id+'->查询背包结果图片生成完毕，正在发送');
                            message=`[CQ:at,qq=${context.user_id}][CQ:image,file=file:///${__resource}\\\\result\\\\${context.user_id}_query.png]`;
                        }
                    }else {
                        message=`[CQ:at,qq=${context.user_id}]你怎么一张卡也没有`;
                    }

                    bot('send_msg', {
                        message_type:context.message_type,
                        user_id:context.group_id||context.user_id||context.discuss_id,
                        group_id:context.group_id||context.user_id||context.discuss_id,
                        discuss_id:context.group_id||context.user_id||context.discuss_id,
                        message:message,
                    }).then(res=>{
                        console.log(context.user_id+'->查询背包结果已发送')
                    }).catch(res=>{
                        console.log(context.user_id+'->查询背包结果发送失败:'+JSON.stringify(res)+'，请检查网络环境和HTTP-API插件配置是否正确')
                    });
                }
        }catch (e) {
            console.log(e)
        }

    })
}
module.exports={
    main,
    query,
    rolls
}