import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';
import AllLogsPage from '../../pages/Logs/AllLogsPage';
import BanksLogsTable from '../LogsTables/BanksLogsTable';

class BankLogsModal extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            myObjJS: null,
            BotID: SettingsContext.CurrentSetBot,
            CurrentLogType: SettingsContext.CurrentLogType
        };
    }

    UpdateLogsModal() {
        this.forceUpdate();
    }

    componentWillReceiveProps() {
        this.setState({
            CurrentLogType: SettingsContext.CurrentLogType
        })
        this.forceUpdate();
    }

    CloseModal() {
        SettingsContext.CurrentLogType = '';
        try_eval('$("#BanksLogsInfoModal").modal("hide");');
    }
    

    render () {
        let TitleMODAL = 'NONE';
        let LogComponent = null;
        TitleMODAL =  'Bot Logs';
        return (
            //<!-- Modal -->
            <div class="modal fade bd-example-modal-lg" id="BanksLogsInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style={({maxWidth:'90%'})}>
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{TitleMODAL}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal.bind(this)}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <BanksLogsTable botID={SettingsContext.CurrentSetBot} Modal={true}/>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default BankLogsModal;