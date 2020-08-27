import React from 'react';
import SettingsContext from '../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import { try_eval } from '../../serviceF';
import AllLogsPage from '../../pages/Logs/AllLogsPage';
import BanksLogsTable from '../LogsTables/BanksLogsTable';

class ShowInjectHTMLModal extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }

    UpdateLogsModal() {
        this.forceUpdate();
    }

    componentWillReceiveProps() {
        this.forceUpdate();
    }

    CloseModal() {
        try_eval('$("#ShowInjectModal").modal("hide");');
    }
    

    render () {
        let TitleMODAL = 'Inject ' + SettingsContext.InjectSelectedAPPName;
        return (
            //<!-- Modal -->
            <div class="modal fade" id="ShowInjectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document" style={({maxWidth:'50%'})}>
                <div class="modal-content" style={({minHeight:"80vh"})}>
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{TitleMODAL}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.CloseModal.bind(this)}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <iframe src={'data:text/html;base64,' + SettingsContext.HTMLShowContentBase64} width="100%" height="100%"/>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ShowInjectHTMLModal;