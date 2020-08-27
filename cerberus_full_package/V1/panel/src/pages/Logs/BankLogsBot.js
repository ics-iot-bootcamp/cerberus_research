import React from 'react';
import BanksLogsTable from '../../Controls/LogsTables/BanksLogsTable';
import { isNullOrUndefined } from 'util';

class bankLogsBot extends React.Component {
    
    render () {
        return (
        <div>
            <h1 class="pageHeader disable-select">{'Current bot - ' + this.props.match.params.botid.toString()}</h1>
            <BanksLogsTable botID={this.props.match.params.botid.toString()} />
        </div>);
    }
}

export default bankLogsBot;