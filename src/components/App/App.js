import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ankifyWords from '../../utils/ankifyWords/ankifyWords';

import './App.css';
import importOptions from './images/import-options.png';

const importOptionsAlt = `
  Import options:
  Fiels separated by: '#',
  Ignore lines where first field matches existing note,
  Allow HTML in fields
`;

class App extends React.Component {
  constructor(props) {
    injectTapEventPlugin();
    super(props);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  state = {
    inputValue: '',
    wordData: '',
    showImportOptions: false
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    ankifyWords(this.state.inputValue)
      .then(result => this.setState({
        wordData: result
      }))
      .catch(err => console.log(err));
  }

  handleDownload = () => {
    this.setState({
      showImportOptions: true
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Longman to Anki</h1>
        <p>A web app to help you learn English with Anki</p>

        <form
          onSubmit={this.handleSubmit}
          style={{
            marginBottom: 20
          }}
        >
          <TextField
            hintText="example, bear, mouse"
            floatingLabelText="Type some words, you want to learn"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            fullWidth
          />
          <RaisedButton
            label="Compose cards"
            primary
            type='submit'
          />
        </form>

        <TextField
          hintText="Text for anki cards will appear here"
          multiLine
          fullWidth
          value={this.state.wordData}
          rowsMax={10}
        />

        <RaisedButton
          label="Save as txt"
          primary
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(this.state.wordData)}`}
          download={`longman-to-anki ${this.state.inputValue}`}
          buttonStyle={{
            verticalAlign: 'initial'
          }}
          onClick={this.handleDownload}
          disabled={!this.state.wordData}
        />

        <span
          style={{
            marginLeft: 20,
            display: this.state.showImportOptions ? 'inline' : 'none'
          }}
        >
          Set the import options as on the sample
        </span>

        <img
          style={{
            marginTop: 20,
            display: this.state.showImportOptions ? 'block' : 'none'
          }}
          alt={importOptionsAlt}
          src={importOptions}
        />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
