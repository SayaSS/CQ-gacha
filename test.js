const jstat = require('jstat');
let weight = [0.7, 3.4, 18, 77, 0.9]; // fes池子:up的fes角色(公主优衣)/其他3星/2星/1星/其他fes角色(nnk,克总,511，公主佩可，公主可可萝)（%）
let wtp=[];let p=[];
function sum(arr) {let s = 0;for (let i=0; i<arr.length; i++) {s += arr[i];}return s;}
for (let i in weight){wtp.push(1. * weight[i] / sum(weight))}
for (let i in wtp){p.push(jstat.normal.sample(1. /wtp[i], 1. /wtp[i]/3 ))}
let result=[];let c1=0,c2=0,c3=0,c4=0,c5=0;
for (let i=0;i<300;i++){
    let minp = 1.e9;
    let minj = -1;
    for (let j in p){
        if (p[j] < minp){
            minp = p[j];
            minj = parseInt(j);
        }
    }
    if (minj === 0){
        result.push('up的fes');c1++;
    } else if (minj === 1) {
        result.push('其他3星');c2++;
    } else if (minj === 2) {
        result.push('2星');c3++
    } else if (minj === 3) {
        result.push('1星');c4++
    } else if (minj === 4) {
        result.push('其他fes');c5++
    }
    for (let j in p){
        p[j] -= minp;
    }
    p[minj] = jstat.normal.sample(1. / wtp[minj], 1. / wtp[minj] / 3.)
}
let first = result.indexOf('up的fes');
console.log(`300连天井~\n`+
    `——————————\n`+
    `up的fes个数为 ${c1} 个,首次出现为第 ${first} 次\n`+
    `其他fes个数为 ${c5} 个\n`+
    `其他3星个数为 ${c2} 个\n`+
    `2星个数为 ${c3} 个\n`+
    `1星个数为 ${c4} 个`)
console.log(JSON.stringify(result));
