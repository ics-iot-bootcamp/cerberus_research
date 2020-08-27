import React from 'react';
import MailsLogsTable from '../../Controls/LogsTables/MailLogsTable';

class mailLogs extends React.Component {

    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select">Mail logs page</h1>
            <MailsLogsTable />
        </div>);
    }
}

export default mailLogs;