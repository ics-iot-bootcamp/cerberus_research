import React from 'react';
import CCsLogsTable from '../../Controls/LogsTables/CCLogsTable';

class ccLogs extends React.Component {

    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select">CC Logs page</h1>
            <CCsLogsTable />
        </div>);
    }
}

export default ccLogs;