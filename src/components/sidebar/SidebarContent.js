import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as propertiesActions from '../../store/actions/propertiesActions'

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

  handleForm() {
    this.writeStateToLocalStorage()
    this.props.actions.fetchMSIProperties(this.props.attemptMSIProperties + 1)
    this.props.actions.updateTimeInterval(this.state.updateTimeInput)
    this.props.closeSidebar()
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
          <div className="field is-grouped">
            <div className="control">
              <button onClick={() => this.handleForm()} className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button onClick={() => this.props.closeSidebar()} className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...propertiesActions }, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    attemptMSIProperties: state.propertiesReducer.attemptMSIProperties,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent)