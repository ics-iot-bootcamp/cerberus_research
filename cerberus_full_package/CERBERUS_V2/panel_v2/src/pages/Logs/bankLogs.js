import React from 'react';
import BanksLogsTable from '../../Controls/LogsTables/BanksLogsTable';

class bankLogs extends React.Component {

    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select animated fadeIn">Logs</h1>
            <BanksLogsTable />
        </div>);
    }
}

export default bankLogs;