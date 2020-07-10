const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const api=require('./api');
const bot=api.bot;
const jstat = require('jstat');
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');

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
let __resource='C:\\Users\\pc\\Desktop\\test\\gacha';//资源文件夹路径
/*配置部分，请按自己需求配置*/

let wtp=[];let p=[];
let __pcr=`${__resource}\\pcr`;
function sum(arr) {let s = 0;for (let i=0; i<arr.length; i++) {s += arr[i];}return s;}
function choice(arr) {return arr[Math.floor((Math.random()*arr.length))]}
for (let i in weight){wtp.push(1. * weight[i] / sum(weight))}
for (let i in wtp){p.push(jstat.normal.sample(1. /wtp[i], 1. /wtp[i]/3 ))}

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
            let gacha=rolls(10);
            let name=context.user_id+'_'+new Date().getTime();
            const out = fs.createWriteStream(`${__resource}\\result\\${name}.png`);
            const bg = await loadImage(`${__resource}\\bg.jpg`);
            const card1= await loadImage(`${__pcr}\\${gacha[0]}.png`);
            const card2= await loadImage(`${__pcr}\\${gacha[1]}.png`);
            const card3= await loadImage(`${__pcr}\\${gacha[2]}.png`);
            const card4= await loadImage(`${__pcr}\\${gacha[3]}.png`);
            const card5= await loadImage(`${__pcr}\\${gacha[4]}.png`);
            const card6= await loadImage(`${__pcr}\\${gacha[5]}.png`);
            const card7= await loadImage(`${__pcr}\\${gacha[6]}.png`);
            const card8= await loadImage(`${__pcr}\\${gacha[7]}.png`);
            const card9= await loadImage(`${__pcr}\\${gacha[8]}.png`);
            const card10= await loadImage(`${__pcr}\\${gacha[9]}.png`);
            const star1= await loadImage(`${__resource}\\star1.png`);
            const star2= await loadImage(`${__resource}\\star2.png`);
            const star3= await loadImage(`${__resource}\\star3.png`);
            ctx.drawImage(bg, 0, 0);
            ctx.drawImage(card1,365,229);ctx.drawImage(card2,622,229);
            ctx.drawImage(card3,871,229);ctx.drawImage(card4,1120,229);
            ctx.drawImage(card5,1376,229);ctx.drawImage(card6,365,499);
            ctx.drawImage(card7,622,499);ctx.drawImage(card8,871,499);
            ctx.drawImage(card9,1120,499);ctx.drawImage(card10,1376,499);
            let starTmp=star1;
            let dx=365,dy=229;
            let dxMap = new Map([[0, 365], [1, 622], [2, 871], [3, 1120], [4, 1376]]);
            for (let i=0;i<2;i++){
                for (let j=0;j<5;j++){
                    let tmp=gacha[i*5+j].split('-');
                    if (tmp[0]==='1') {
                        starTmp=star1;
                        console.log(1);
                    }else if (tmp[0]==='2') {
                        starTmp=star2;
                        console.log(2);
                    }else if (tmp[0]==='3') {
                        starTmp=star3;
                        console.log(3);
                    }
                    dx=dxMap.get(j);
                    ctx.drawImage(starTmp,dx,dy);
                }
                dy+=270;
            }
            const stream = canvas.createPNGStream();
            stream.pipe(out);
            out.on('finish', () =>  {
                let message=`[CQ:at,qq=${context.user_id}][CQ:image,file=file:///${__resource}\\result\\${name}.png]`;
                api.send_msg(context.message_type,context.group_id||context.user_id||context.discuss_id,message);
            })
        }
    })
}

module.exports={
    main,
    rolls
}