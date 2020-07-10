const CQHttp = require('cqhttp');
const bot = new CQHttp({
    apiRoot: 'http://127.0.0.1:5701/',
    accessToken: 'robot',
    secret: '123'
});
function start() {
    bot.listen(8086, '127.0.0.1');
}
function send_group_msg(group_id,message,auto_escape=false){
    let message_id=0;
    bot('send_group_msg', {
        group_id:group_id,
        message:message,
        auto_escape:auto_escape,
    }).then(context=>{
        message_id=context.message_id;
    });
}

function send_private_msg(user_id,message,auto_escape=false) {
    bot('send_private_msg', {
        user_id:user_id,
        message:message,
        auto_escape:auto_escape,
    });
}
function send_discuss_msg(discuss_id,message,auto_escape=false){
    bot('send_discuss_msg', {
        discuss_id:discuss_id,
        message:message,
        auto_escape:auto_escape,
    });
}
function delete_msg(message_id){
    bot('delete_msg', {
        message_id:message_id,
    });
}
function send_msg(message_type,id,message,auto_escape=false){
    bot('send_msg', {
        message_type:message_type,
        user_id:id,
        group_id:id,
        discuss_id:id,
        message:message,
        auto_escape:auto_escape,
    });
}
module.exports = {
    send_group_msg,
    send_private_msg,
    send_discuss_msg,
    delete_msg,
    send_msg,
    start,
    bot,
};