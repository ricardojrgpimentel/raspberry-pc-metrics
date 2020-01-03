import React, { Fragment } from 'react';
import Background from './components/background/Background'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import './App.sass'
import Sidebar from "react-sidebar"
import SidebarContent from './components/sidebar/SidebarContent'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      sidebarOpen: false
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Fragment>
        <Sidebar
          sidebar={<SidebarContent closeSidebar={() => this.onSetSidebarOpen(false)} />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "#fff", minWidth: "20%" }, }}
          pullRight={true}
        >
          <button className='sidebar-trigger' onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>
        <Background>
          <div className="columns is-mobile">
            <CircularProgressbar className='column graph' value={66} text={`CPU ${66}%`} />
            <CircularProgressbar className='column graph' value={66} text={`RAM ${20}%`} />
            <CircularProgressbar className='column graph' value={66} text={`GPU ${60}%`} />
            <CircularProgressbar className='column graph' value={66} text={`SSD ${3}%`} />
          </div>

        </Background>
      </Fragment>
    )
  }
}

export default App
