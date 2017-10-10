import React from "react"
import styled from "styled-components"
import FB from "../lib/db"

import SensorNav from "../components/sensor-nav"
import Modal from "../components/modal"
import Sidebar from "../components/side-bar"
import DataStream from "../components/data-stream"

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }

  state = { deviceInfo: {}, packets: [] }
  async componentDidMount() {
    var firebase = await FB()
    this.store = firebase.firestore

    var userRef = this.store.collection("users").doc(firebase.user.uid)
    var deviceRef = this.store.collection("devices").doc(this.props.id)

    userRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
      } else {
        console.log("No such document!")
      }
    })

    deviceRef.get().then(doc => {
      if (doc.exists) {
        console.log("Device Info:", doc.data())
        this.setState({ deviceInfo: doc.data() })
      } else {
        console.log("No such document!")
      }
    })
    userRef
      .collection("purchases")
      .doc(this.props.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Data Packets", doc.data())
          this.setState({ packets: doc.data() })
        } else {
          console.log("No such document!")
        }
      })

    // var query = this.store.collection("devices").where("company", "==", "Bosch")
    // query.get().then(function(doc) {
    //   console.log(doc)
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data())
    //   } else {
    //     console.log("No such document!")
    //   }
    // })
  }

  render() {
    var { deviceInfo, packets } = this.state
    return (
      <main>
        <SensorNav {...this.state} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} />
        </Data>
        {/* <Modal /> */}
      </main>
    )
  }
}
const Data = styled.section`
  background-image: linear-gradient(-189deg, #06236c 1%, #1449c6 95%);
  min-height: 90vh;
  position: relative;
  display: flex;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`
