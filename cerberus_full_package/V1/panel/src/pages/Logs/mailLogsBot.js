import React from 'react';
import { isNullOrUndefined } from 'util';
import MailsLogsTable from '../../Controls/LogsTables/MailLogsTable';

class MailLogsBot extends React.Component {

    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select">{'Current bot - ' + this.props.match.params.botid.toString()}</h1>
            <MailsLogsTable botID={this.props.match.params.botid.toString()} />
        </div>);
    }
}

export default MailLogsBot;