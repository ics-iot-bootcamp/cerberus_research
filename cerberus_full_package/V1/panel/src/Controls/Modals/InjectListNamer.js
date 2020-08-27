import React from 'react';
import { isNullOrUndefined } from 'util';

class InjectListNamer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            active: props.active,
            linkURLS: null,
            newLink: ''
        };
    }

    componentWillMount() {
    }

    SendResult() {
        this.props.callback(this.state.active, this.props.name);
        this.forceUpdate();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            status: newProps.status,
            active: newProps.active,
            arrayUrl: ''
        });
    }

    EnableOrDisableThis(link) {
        let linksA = [];
        try {
            linksA = this.state.active.split(':');
        }
        catch (err) {}
        
        if(this.IsEnabledLink(link)) {
            let lnktmp = linksA;
            linksA = [];
            for(let i = 0; i < lnktmp.length; i++) {
                if(link != lnktmp[i]) {
                    linksA.push(lnktmp[i]);
                }
            }
        }
        else {
            linksA.push(link);
        }
        let finalstr = '';
        linksA.forEach(function(lnk) {
            finalstr+=lnk+':';
        }.bind(this));
        this.state.active = finalstr.slice(0, -1);
        this.SendResult();
    }

    IsEnabledLink(link) {
        let linksA = [];
        let returnstate = false;
        try {
            linksA = this.state.active.split(':');
        }
        catch (err) {}
        linksA.forEach(function(lnk) {
            if(lnk==link) {
                returnstate = true;
            }
        }.bind(this));
        return returnstate;
    }

    render() {
        let links = [];
        try {
            links = this.state.status.split(':');
        }
        catch (err) {}
        let linksHtml = [];
        links.forEach(function(lnk) {
            if(lnk.length > 0) {
                linksHtml.push(<li class="list-group-item graycolor">
                {lnk}
                <div class="check-bot" style={({float:'right', lineHeight: '0px'})}>
                    <i onClick={() => this.EnableOrDisableThis(lnk)} class={this.IsEnabledLink(lnk) == true ? "far fa-check-circle fa-green" : "far fa-circle fa-yellow"} ></i>
                </div>
                </li>);
            }
        }.bind(this));
        return(
            <React.Fragment>
                <ul class="list-group list-group-flush">
                {linksHtml}
                </ul>
            </React.Fragment>
        );
    }
}

export default InjectListNamer;