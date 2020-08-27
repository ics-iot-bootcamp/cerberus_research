import React from 'react';
import SettingsContext from '../../Settings';

class LinksAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkURLS: null,
            newLink: ''
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps() {
        this.setState({
            arrayUrl: ''
        });
    }

    RemoveThisLinks =(link) => {
        let links = [];
        try {
            SettingsContext.arrayUrl.split(',').forEach(function(lnk) {
                if(lnk != link) links.push(lnk);
            }.bind(this));
        } catch (err) {}
        let txtlink = ''
        links.forEach(function(lnk) {
            txtlink += lnk + ',';
        }.bind(this));
        txtlink = txtlink.slice(0, -1);
        SettingsContext.arrayUrl = txtlink;
        SettingsContext.SaveSettingsServer();
        this.forceUpdate();
    }

    UpdateAndSaveLinks(){
        
    }

    handleChange(event) {
        this.setState({newLink: event.target.value});
    }

    onKeyUP = (e) => {
        if (e.keyCode == 13) {
            SettingsContext.arrayUrl += ',' + this.state.newLink;
            SettingsContext.SaveSettingsServer();
            this.setState({newLink: ''});
        }
    }

    render() {
        let links = [];
        try {
            links = SettingsContext.arrayUrl.split(',');
        }
        catch (err) {}
        let linksHtml = [];
        links.forEach(function(lnk) {
            linksHtml.push(<li class="list-group-item graycolor">
            {lnk}
            <div class="check-bot" style={({float:'right', lineHeight: '0px'})}>
                <i onClick={() => this.RemoveThisLinks(lnk)} class="fal fa-trash-alt" ></i>
            </div>
            </li>);
        }.bind(this));
        
        return(
            <React.Fragment>
                <ul class="list-group list-group-flush">
                {linksHtml}
                <input placeholder="Write link and press Enter (ex: http://example.com)" style={({marginTop:'15px'})} class="form-control" type="text" value={this.state.newLink} onKeyUp={this.onKeyUP.bind(this)} onChange={this.handleChange.bind(this)} />
                </ul>
            </React.Fragment>
        );
    }
}

export default LinksAddForm;