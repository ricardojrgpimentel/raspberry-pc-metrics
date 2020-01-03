import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as propertiesActions from '../../store/actions/propertiesActions'

class SidebarContent extends React.Component {

  constructor() {
    super()
    this.state = {
      backgroundInput: ''
    }

  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleForm() {
    this.props.actions.fetchMSIProperties(this.state.urlInput, { login: "MSIAfterburner", password: 12345 })
  }

  render() {
    console.log("contentMSIProperties", this.props.contentMSIProperties)
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

/* function mapStateToProps(state) {
  return {
    loadingMSIProperties: state.propertiesReducer.loadingMSIProperties,
    errorMSIProperties: state.propertiesReducer.errorMSIProperties,
    contentMSIProperties: state.propertiesReducer.contentMSIProperties,
  }
} */

export default connect(null, mapDispatchToProps)(SidebarContent)