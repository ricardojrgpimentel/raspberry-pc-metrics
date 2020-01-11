import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as propertiesActions from '../../store/actions/propertiesActions'
import * as optionActions from '../../store/actions/optionActions'

class SidebarContent extends React.Component {

  constructor() {
    super()
    this.state = {
      backgroundInput: '',
      updateTimeInput: 5,
    }
  }

  componentDidMount() {
    let settings = window.localStorage.getItem('settings')
    if (settings) {
      let settingsObj = JSON.parse(settings)
      this.setState({
        ...settingsObj
      })
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  writeStateToLocalStorage() {
    window.localStorage.setItem('settings', JSON.stringify(this.state))
  }

  handleCheckBox(value) {
    if (this.props.optionsObj[value]) {
      this.props.actions.removeOption(value)
    }
    else {
      this.props.actions.addOption(value)
    }

  }

  handleForm() {
    this.writeStateToLocalStorage()
    this.props.actions.fetchMSIProperties(this.props.attemptMSIProperties + 1)
    this.props.actions.updateTimeInterval(this.state.updateTimeInput)
  }

  renderMetricsOptions() {
    //We use the state from the App component so we dont need to iterate a second time
    let boxOptions = []
    for (let property in this.props.appState) {
      if (property !== "sidebarOpen") {
        boxOptions = [
          ...boxOptions,
          <div key={property} className="field">
            <label className="checkbox">
              <input checked={this.props.optionsObj[property] ? true : false} onChange={() => this.handleCheckBox(property)} type="checkbox" /> {property}
            </label>
          </div>
        ]
      }
    }

    return boxOptions
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="field">
            <label className="label">Background</label>
            <div className="control">
              <input name='backgroundInput' onChange={(e) => this.handleInput(e)} value={this.state.backgroundInput} className="input" type="text" placeholder="url" />
            </div>
            <p className="help">No background will fall to the default one</p>
          </div>
          <div className="field">
            <label className="label">Update Time</label>
            <div className="control">
              <input name='updateTimeInput' onChange={(e) => this.handleInput(e)} value={this.state.updateTimeInput} className="input" type="text" placeholder="url" />
            </div>
            <p className="help">Time to wait between calls to api, 0 to disable</p>
          </div>
          {this.renderMetricsOptions()}
          <div className="field is-grouped">
            <div className="control">
              <button onClick={() => this.handleForm()} className="button is-link">Fetch</button>
            </div>
            <div className="control">
              <button onClick={() => this.props.closeSidebar()} className="button is-link is-light">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...propertiesActions, ...optionActions }, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    attemptMSIProperties: state.propertiesReducer.attemptMSIProperties,
    optionsObj: state.optionReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent)