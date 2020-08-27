import React from 'react';
import SettingsContext from '../../Settings';

class EditTimesSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            timeInject: SettingsContext.timeInject,
            timeCC: SettingsContext.timeCC,
            timeMail: SettingsContext.timeMail
        };
    }

    componentWillReceiveProps() {
        this.setState({
            timeInject: SettingsContext.timeInject,
            timeCC: SettingsContext.timeCC,
            timeMail: SettingsContext.timeMail
        });
    }

    changeInject(event){
        SettingsContext.timeInject = event.target.value;
        this.saveAllSettings();
    }

    changeCC(event){
        SettingsContext.timeCC = event.target.value;
        this.saveAllSettings();
    }

    changeMail(event){
        SettingsContext.timeMail = event.target.value;
        this.saveAllSettings();
    }

    saveAllSettings() {
        this.setState({
            timeInject: SettingsContext.timeInject,
            timeCC: SettingsContext.timeCC,
            timeMail: SettingsContext.timeMail
        });
        SettingsContext.SaveSettingsServer();
    }

    returnDelay() {
        return(
            <React.Fragment>
                <option value="10">10 sec</option>
                <option value="15">15 sec</option>
                <option value="20">20 sec</option>
                <option value="30">30 sec</option>
                <option value="45">45 sec</option>
                <option value="60">1 min</option>
                <option value="120">2 min</option>
                <option value="180">3 min</option>
                <option value="240">4 min</option>
                <option value="300">5 min</option>
                <option value="360">6 min</option>
                <option value="480">8 min</option>
                <option value="600">10 min</option>
                <option value="900">15 min</option>
                <option value="1800">30 min</option>
                <option value="2700">45 min</option>
                <option value="3600">1 hour</option>
                <option value="7200">2 hour</option>
                <option value="14400">4 hour</option>
                <option value="28800">8 hour</option>
                <option value="36000">10 hour</option>
                <option value="86400">24 hour</option>
                <option value="9999999">OFF</option>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
            <div class="form-group" style={({marginBottom:'0px'})}>
                <label for="timeInjectDelay">Time inject delay</label>
                <select class="form-control" id="timeCCDelay" onChange={this.changeInject.bind(this)} value={this.state.timeInject}>
                    {this.returnDelay()}
                </select>
                <p></p>
            </div>
            </React.Fragment>
        );
    }
}

export default EditTimesSettings;