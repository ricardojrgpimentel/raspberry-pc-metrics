import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as propertiesActions from '../../store/actions/propertiesActions'
import repeat from "repeat"

class Timer extends React.Component {

  callApi() {
    if (!this.props.loadingMSIProperties)
      this.props.actions.fetchMSIProperties(this.props.attemptMSIProperties + 1)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.intervalTime === '0') {
      repeat().cancel()
    }
    else if (prevProps.intervalTime !== this.props.intervalTime) {
      repeat()
        .do(() => this.callApi())
        .every(this.props.intervalTime * 1000)
    }
  }

  render() {
    return (
      <div>Timer {this.props.intervalTime}</div>
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
    intervalTime: state.propertiesReducer.intervalTime,
    loadingMSIProperties: state.propertiesReducer.loadingMSIProperties,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)