import React, { Fragment } from 'react';
import Background from './components/background/Background'
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import './App.sass'
import Sidebar from "react-sidebar"
import SidebarContent from './components/sidebar/SidebarContent'
import { connect } from 'react-redux'
import Parser from 'fast-xml-parser'
import Timer from './components/timer/Timer'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      sidebarOpen: false,
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.attemptMSIProperties !== this.props.attemptMSIProperties) {
      let infoObj = this.handleData(this.props)
      if (infoObj) {
        this.setState({
          ...this.state,
          ...infoObj
        })
      }
    }
  }

  handleData(props) {
    let objEntries = {}
    if (props.contentMSIProperties && Parser.validate(props.contentMSIProperties)) {
      let jsonObj = Parser.parse(props.contentMSIProperties)
      if (jsonObj.HardwareMonitor && jsonObj.HardwareMonitor.HardwareMonitorEntries && jsonObj.HardwareMonitor.HardwareMonitorEntries.HardwareMonitorEntry) {
        for (let entry in jsonObj.HardwareMonitor.HardwareMonitorEntries.HardwareMonitorEntry) {
          objEntries = {
            ...objEntries,
            [jsonObj.HardwareMonitor.HardwareMonitorEntries.HardwareMonitorEntry[entry].srcName]: jsonObj.HardwareMonitor.HardwareMonitorEntries.HardwareMonitorEntry[entry]
          }
        }
        return objEntries
      }
    }
    return false
  }

  renderCircles() {
    let circleJSX = []
    for (let circle in this.props.optionsObj) {
      if (this.state[circle]) {
        circleJSX = [
          ...circleJSX,
          <div key={circle} className="column is-half">
            <div className="columns">
              <div className="column is-2">
                <p className='info-text'>{circle}</p>
              </div>
              <div className="column">
                <CircularProgressbar
                  className='graph'
                  value={this.state[circle].data}
                  text={`${parseFloat(this.state[circle].data).toFixed(1)}${circle.includes("temperature") ? '°C' : '%'}`}
                />
              </div>
            </div>
          </div>
        ]
      }
    }

    return (
      <Fragment>
        <div className="columns is-multiline">
          {circleJSX}
        </div>
        {/* <div className="columns">
          <div className="column is-half">
            <div className="columns">
              <div className="column is-2">
                <p className='info-text'>GPU Temperature</p>
              </div>
              <div className="column">
                {this.state['GPU temperature'] &&
                  <CircularProgressbar
                    className='graph'
                    value={this.state['GPU temperature'].data}
                    text={`${parseFloat(this.state['GPU temperature'].data).toFixed(1)}°C`}
                  />}
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="columns">
              <div className="column is-2">
                <p className='info-text'>Fan Speed</p>
              </div>
              <div className="column">
                {this.state['Fan speed'] &&
                  <CircularProgressbar
                    className='graph'
                    circleRatio={0.75}
                    value={this.state['Fan speed'].data}
                    text={`${parseInt(this.state['Fan speed'].data, 10)}%`}
                    styles={buildStyles({
                      rotation: 1 / 2 + 1 / 8,
                      strokeLinecap: "butt",
                      trailColor: "#eee"
                    })}
                  />}
              </div>
            </div>
          </div>
        </div> */}
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        <Sidebar
          sidebar={<SidebarContent appState={this.state} closeSidebar={() => this.onSetSidebarOpen(false)} />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "#fff", minWidth: "20%" }, }}
          pullRight={true}
        >
          <div className="sidebar-trigger-area">
            <button className='sidebar-trigger' onClick={() => this.onSetSidebarOpen(true)}>
              Open sidebar
          </button>
            <Timer />
          </div>
        </Sidebar>
        <Background>
          {this.renderCircles()}
        </Background>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    loadingMSIProperties: state.propertiesReducer.loadingMSIProperties,
    errorMSIProperties: state.propertiesReducer.errorMSIProperties,
    contentMSIProperties: state.propertiesReducer.contentMSIProperties,
    attemptMSIProperties: state.propertiesReducer.attemptMSIProperties,

    optionsObj: state.optionReducer
  }
}

export default connect(mapStateToProps)(App)
