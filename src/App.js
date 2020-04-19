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
import { toast } from 'react-toastify'

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
    if (this.props.errorMSIProperties) {
      toast.error("Error Fetching", {
        containerId: 'error'
      })
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

  handleText(circle) {
    let symbolToShow = '%'
    if (circle.includes("temperature")) {
      symbolToShow = '°C'
    } else if (circle.includes("Framerate")) {
      symbolToShow = 'FPS'
    }
    return `${parseFloat(this.state[circle].data).toFixed(1)}${symbolToShow}`
  }

  hsl_col_perc(percent, start, end) {
    var a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // Return a CSS HSL string
    return 'hsl(' + c + ', 100%, 50%)';
  }

  renderProperGraph(circle) {
    if (circle.includes("temperature")) {
      return (
        <CircularProgressbar
          className='graph'
          value={this.state[circle].data}
          text={this.handleText(circle)}
          styles={buildStyles({
            pathColor: this.hsl_col_perc(this.state[circle].data, 100, 0)
          })}
        />
      )
    } else if (circle.includes("Framerate")) {
      return (
        <CircularProgressbar
          circleRatio={0.75}
          maxValue={500}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "butt",
            trailColor: "#eee"
          })}
          className='graph'
          value={this.state[circle].data}
          text={this.handleText(circle)}
        />
      )
    }
    else if (circle.includes("usage")) {
      return (
        <CircularProgressbar
          circleRatio={0.75}
          maxValue={100}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 8,
            strokeLinecap: "butt",
            trailColor: "#eee",
          })}
          className='graph'
          value={this.state[circle].data}
          text={this.handleText(circle)}
        />
      )
    }
    return (
      <CircularProgressbar
        className='graph'
        value={this.state[circle].data}
        text={this.handleText(circle)}
        styles={buildStyles({
          rotation: 0.5 + (1 - this.state[circle].data / 100) / 2,
          pathColor: `rgba(62, 152, 199, ${this.state[circle].data / 100})`
        })}
      />
    )
  }

  renderCircles() {
    let circleJSX = []
    let columnSize = Math.round(12 / (Object.keys(this.props.optionsObj).length / 2))
    for (let circle in this.props.optionsObj) {
      if (this.state[circle]) {
        circleJSX = [
          ...circleJSX,
          <div key={circle} className={`column is-${columnSize}`}>
            <div className="columns is-mobile">
              <div className="column is-2 is-flex text-column">
                <p className='info-text'>{circle}</p>
              </div>
              <div className="column">
                {this.renderProperGraph(circle)}
              </div>
            </div>
          </div>
        ]
      }
    }

    return (
      <Fragment>
        <div className="columns is-multiline is-mobile is-vcentered">
          {circleJSX}
        </div>
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
