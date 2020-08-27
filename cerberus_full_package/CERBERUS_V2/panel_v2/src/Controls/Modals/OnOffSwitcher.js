import React from 'react';

class OnOffSwitcher extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            status: props.status
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            status: newProps.status
        })
    }

    ClickBTN() {
        if(this.state.status == '1') {
            this.state.status = '0';
        }
        else {
            this.state.status = '1';
        }
        this.props.callback(this.state.status, this.props.name);
        this.forceUpdate();
    }

    render() {
        return(
            <React.Fragment>
                <button type="button" style={({lineHeight:'10px', float:'right', width: '56px'})} onClick={this.ClickBTN.bind(this)} class={"btn " + (this.state.status == "1" ? "btn-success" : "btn-outline-danger")}>{(this.state.status == "1" ? "ON" : "OFF")}</button>
            </React.Fragment>
        );
    }
}

export default OnOffSwitcher;