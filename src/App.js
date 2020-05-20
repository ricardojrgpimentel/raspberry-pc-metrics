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
import Timer from './components/timer/Timer'
import { toast } from 'react-toastify'
import Helpers from './components/helpers/helpers'
import _ from 'lodash'

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
    if (props.contentMSIProperties) {
      let jsonArr = JSON.parse(props.contentMSIProperties)
      for (let entry in jsonArr.Children[0].Children) {
        objEntries = {
          ...objEntries,
          [jsonArr.Children[0].Children[entry].Text]: jsonArr.Children[0].Children[entry]
        }
      }
      return objEntries
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
    return (
      <CircularProgressbar
        className='graph'
        value={parseFloat(circle)}
        text={circle}
        styles={buildStyles({
          pathColor: this.hsl_col_perc(parseFloat(circle), 100, 0)
        })}
      />
    )
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
    let topLevelProperties = []
    for (let topProperty in this.props.optionsObj) {
      if (!Helpers.oneOfTypes(topProperty)) {
        topLevelProperties = [...topLevelProperties, topProperty]
        let valuesObj = _.get(this.state[this.props.optionsObj[topProperty].parentProperty[0]], this.props.optionsObj[topProperty].path)
        if (valuesObj) {
          circleJSX = [
            ...circleJSX,
            <div key={valuesObj.Value} className="columns is-mobile">
              <div className="column is-2 is-flex text-column">
                <p className='info-text'>{valuesObj.Value}</p>
              </div>
              <div className="column">
                {this.renderProperGraph(valuesObj.Value)}
              </div>
            </div>]
        }
      }
    }

    let renderProperty = []
    for (let property of topLevelProperties) {
      renderProperty = [
        ...renderProperty,
        <div key={property} className='column is-half'>
          <p className='info-text'>{property}</p>
          {circleJSX}
        </div>
      ]
    }

    return (
      <Fragment>
        <div className="columns is-multiline is-mobile is-vcentered">
          {renderProperty}
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
