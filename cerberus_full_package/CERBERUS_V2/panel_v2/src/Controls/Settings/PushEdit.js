import React from 'react';
import SettingsContext from '../../Settings';

class PushEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pushTitle: SettingsContext.pushTitle,
            pushText: SettingsContext.pushText
        };
    }

    componentWillReceiveProps() {
        this.setState({
            pushTitle: SettingsContext.pushTitle,
            pushText: SettingsContext.pushText
        });
    }

    handleChangeTitle(event) {
        this.setState({pushTitle: event.target.value});
    }

    handleChangeText(event) {
        this.setState({pushText: event.target.value});
    }

    onKeyUP = (e) => {
        if (e.keyCode == 13) {
            this.SaveSettingsThis();
        }
    }

    SaveSettingsThis() {
        SettingsContext.pushTitle = this.state.pushTitle;
        SettingsContext.pushText = this.state.pushText;
        SettingsContext.SaveSettingsServer();
    }

    render() {
        return(
            <React.Fragment>
                <label for="pushTitle">Push title</label>
                <input id="pushTitle" value={this.state.pushTitle} onChange={this.handleChangeTitle.bind(this)} onKeyUp={this.onKeyUP.bind(this)} placeholder="Enter push title" class="form-control" type="text" style={({marginBottom: '15px'})}/>
                <label for="pushText">Push text</label>
                <input id="pushText" value={this.state.pushText} onChange={this.handleChangeText.bind(this)} onKeyUp={this.onKeyUP.bind(this)} placeholder="Enter push text" class="form-control" type="text" style={({marginBottom: '15px'})}/>
                <button type="button" class="btn btn-outline-primary" style={({float:'right'})} onClick={this.SaveSettingsThis.bind(this)}>Save Push settings</button>
            </React.Fragment>
        );
    }
}

export default PushEdit;