import React from "react"
import styled from "styled-components"
import FB from "../lib/db"

import SensorNav from "../components/sensor-nav"
import Modal from "../components/modal"
import Sidebar from "../components/side-bar"

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }

  async componentDidMount() {
    console.log(this.props)
    var firebase = await FB()
    this.store = firebase.firestore
    console.log(firebase.user.uid)

    var userRef = this.store.collection("users").doc(firebase.user.uid)
    var deviceRef = this.store.collection("devices").doc(this.props.id)

    // var data = {
    //   name: "Ada",
    //   purchases: 1815
    // }
    // userRef.set(data)

    var query = this.store.collection("devices").where("company", "==", "Bosch")
    query.get().then(function(doc) {
      console.log(doc)
      if (doc.exists) {
        console.log("Document data:", doc.data())
      } else {
        console.log("No such document!")
      }
    })
    deviceRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
      } else {
        console.log("No such document!")
      }
    })

    userRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data())
      } else {
        console.log("No such document!")
      }
    })

    userRef
      .collection("purchases")
      .doc(this.props.id)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data())
        } else {
          console.log("No such document!")
        }
      })
  }

  render() {
    return (
      <main>
        <SensorNav />
        <Data>
          <Sidebar />
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
