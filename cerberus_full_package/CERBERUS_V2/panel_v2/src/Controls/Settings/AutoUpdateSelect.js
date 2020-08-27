import React from 'react';
import SettingsContext from './../../Settings';

class AutoUpdateSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: SettingsContext.autoUpdateEnable ? SettingsContext.autoUpdateDelay / 1000 : 0
        };
    }

    componentWillReceiveProps() {
        this.setState({
            value: SettingsContext.autoUpdateEnable ? SettingsContext.autoUpdateDelay / 1000 : 0
        });
    }

    change(event){
        if(event.target.value == '0') {
            SettingsContext.autoUpdateEnable = false;
            SettingsContext.autoUpdateDelay = 0;
        }
        else {
            SettingsContext.autoUpdateEnable = true;
            SettingsContext.autoUpdateDelay = event.target.value * 1000;
        }
        this.setState({value: event.target.value});
        SettingsContext.SaveSettingsCookies();
        SettingsContext.SaveSettingsServer();
    }

    render () {
        return (
            <div class="form-group" style={({marginBottom:'0px'})}>
                <label for="AutoUpdateDelay">Select auto update delay</label>
                <select class="form-control" id="AutoUpdateDelay" onChange={this.change.bind(this)} value={this.state.value}>
                    <option value="0">OFF</option>
                    <option value="1">1 sec</option>
                    <option value="5">5 sec</option>
                    <option value="10">10 sec</option>
                    <option value="30">30 sec</option>
                </select>
                <p style={({marginBottom:'0px'})}>This is used only to automatically update the bots table.</p>
            </div>
    );
    }
}

export default AutoUpdateSelect;