import React from 'react';
import SettingsContext from '../../Settings';

class ProtectEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            timeProtect: SettingsContext.timeProtect
        };
    }

    componentWillReceiveProps() {
        this.setState({
            timeProtect: SettingsContext.timeProtect
        });
    }

    ChangeProtect(event){
        SettingsContext.timeProtect = event.target.value;
        this.saveAllSettings();
    }

    saveAllSettings() {
        this.setState({
            timeProtect: SettingsContext.timeProtect
        });
        SettingsContext.SaveSettingsServer();
    }

    returnDelay() {
        return(
            <React.Fragment>
                <option value="-1">DISABLE</option>
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
                <option value="1800">30 min</option>
                <option value="3600">1 hour</option>
                <option value="10800">3 hour</option>
                <option value="21600">6 hour</option>
                <option value="43200">12 hour</option>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
            <div class="form-group" style={({marginBottom:'0px'})}>
                <label for="ProtectTime">PlayProtect time</label>
                <select class="form-control" id="Protect Time" onChange={this.ChangeProtect.bind(this)} value={this.state.timeProtect}>
                    {this.returnDelay()}
                </select>
                <p style={({marginBottom:'0px'})}>The time after which the window will be displayed with a request to disable Play Protect.</p>
            </div>
            </React.Fragment>
        );
    }
}

export default ProtectEdit;