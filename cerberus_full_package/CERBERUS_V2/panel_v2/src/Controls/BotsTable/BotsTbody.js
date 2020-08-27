import React from 'react';
import BotsRow from './BotsRow';
import { try_eval } from '../../serviceF';

class BotsTbody extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        try_eval('UpdateToolTips()');
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        try_eval('UpdateToolTips()');
    }

    render () {
        return (
            <React.Fragment>
            <tbody>
                {this.props.botList.map(item => (
                    <BotsRow
                        BotListForceUpdate={
                        this.props.BotListForceUpdate}
                        WaitCommand={item.commands}
                        botIp={item.ip}
                        botId={item.id}
                        botAndroidVersion={item.version}
                        botTagsList={item.tag}
                        botCountry={item.country}
                        botBanks={item.banks}
                        statProtect={item.statProtect}
                        statScreen={item.statScreen}
                        statAccessibility={item.statAccessibility}
                        statBanks={item.statBanks}
                        statModule={item.statModule}
                        comment={new Buffer(item.comment == null ? '' : item.comment, 'base64').toString('utf-8')}
                        statAdmin={item.statAdmin}
                        botLastActivity={item.lastConnect}
                        botAddDate={item.dateInfection}
                    />
                ))}
            </tbody>
            </React.Fragment>
        );
    }
}

export default BotsTbody;