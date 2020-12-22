var WebSocketServer = new require('ws');

var port = 8081
var server = new WebSocketServer.Server({ port: 8081 })
var cnt = 0;

var clients = {}
var alive = []
var num_of_name = {}
var messages = {}
var names = {}

var register_code = 13;
var get_code = 228;
var send_code = 1337;

var gson = (obj) => {
    return JSON.stringify(obj);
}

var notify = () => {
    alive.forEach((name) => {
        var id = num_of_name[name]
        clients[id].send(gson({
            code: register_code,
            info: 3,
            users: alive
        }))
    })
}

server.on('connection', function (ws) {
    console.log("Привет!!!");
    var num = cnt++
    clients[num] = ws;
    messages[num] = []
    names[num] = null;

    ws.on('message', function (message) {
        var msg = JSON.parse(message);
        var code = msg['code']

        if (code === register_code) {
            if (msg.name in num_of_name) {
                ws.send(gson({
                    code: register_code,
                    info: 0
                }));
                console.log(`${msg.name} уже занято....`)
            } else {
                names[num] = msg.name;
                num_of_name[names[num]] = num;
                alive.push(names[num])
                notify();
                ws.send(gson({
                    code: register_code,
                    info: 1,
                    name: names[num],
                }))
                console.log(`${msg.name} зарегистрировался....`)
            }
        }

        if (code === get_code) {
            if (names[num]) {
                console.log("Попросили инфу, засылаю...")
                ws.send(gson({
                    code: get_code,
                    messages: messages[num],
                    users: alive,
                }));
            }
        }

        if (code === send_code) {
            console.log(names);
            if (names[num]) {
                console.log(`${names[num]} Прислал сообщение ${msg.to}`)
                var to = msg.to;
                var from = names[num];
                var message = {
                    code: send_code,
                    from: from,
                    text: msg.text
                };
                messages[num_of_name[from]].push(message);
                clients[num_of_name[from]].send(gson(message));
                if (to != from) {
                    messages[num_of_name[to]].push(message);
                    clients[num_of_name[to]].send(gson(message));
                }
            }
        }

    })

    ws.on('close', function () {
        console.log("пока...");
        delete clients[num];
        if (names[num]) {
            console.log(`${names[num]} отвалился...`);
            delete num_of_name[names[num]];
            alive.splice(alive.findIndex(_ => _ === names[num]), 1);
            notify();
        }
    })
})

// var http = require('http');
// var Static = require('node-static');
// var WebSocketServer = new require('ws');

// // подключенные клиенты
// var clients = {};

// // WebSocket-сервер на порту 8081
// var webSocketServer = new WebSocketServer.Server({ port: 8081 });
// webSocketServer.on('connection', function (ws) {

//     var id = Math.random();
//     clients[id] = ws;
//     console.log("новое соединение " + id);

//     ws.on('message', function (message) {
//         console.log('получено сообщение ' + message);

//         for (var key in clients) {
//             clients[key].send(message);
//         }
//     });

//     ws.on('close', function () {
//         console.log('соединение закрыто ' + id);
//         delete clients[id];
//     });

// });


// // обычный сервер (статика) на порту 8080
// var fileServer = new Static.Server('.');
// http.createServer(function (req, res) {

//     fileServer.serve(req, res);

// }).listen(8080);

// console.log("Сервер запущен на портах 8080, 8081");
