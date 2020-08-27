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
            SettingsContext.ShowToast("success", "Send message to kill bots");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">KILL BOTS</h5>
                    <h6 class="card-subtitle mb-2 text-muted">KILL SELECTED BOTS</h6>
                    <button type="button" onClick={this.onClickKILL} class="btn btn-right btn-outline-danger">KILL BOTS</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BOTKILL;