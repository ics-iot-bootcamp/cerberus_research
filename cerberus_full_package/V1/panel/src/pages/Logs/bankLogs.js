import React from 'react';
import BanksLogsTable from '../../Controls/LogsTables/BanksLogsTable';

class bankLogs extends React.Component {

    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select">BANK Logs (and etc)</h1>
            <BanksLogsTable />
        </div>);
    }
}

export default bankLogs;