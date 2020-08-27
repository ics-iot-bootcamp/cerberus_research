import React from 'react';
import CCsLogsTable from '../../Controls/LogsTables/CCLogsTable';
import { isNullOrUndefined } from 'util';

class ccLogsBot extends React.Component {

    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select">{'Current bot - ' + this.props.match.params.botid.toString()}</h1>
            <CCsLogsTable botID={this.props.match.params.botid.toString()} />
        </div>);
    }
}

export default ccLogsBot;