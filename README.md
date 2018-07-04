## IOTA Items Tracking DEMO App

https://window-transport-rack-tracking.firebaseapp.com

## Solution

Centralize digital paperwork and item status management into one system, but store data in an immutable secure decentralized ledger.

Provide visibility at all times about item information, inventory, cargo status, owner, route, all digital documents and certificates, GPS location, refer temperature.
All information is accessible on any device at any time.

Develop an access and rights management system to control who can have read and write access to which parts of the stored data.

Ensure documents integrity and authenticity by calculating document checksum on the fly and compare with stored information.

#### For item owners:

* simplifies paperwork, enables easy way to provide documents and certificates, even when item is already on the way to the destination
* enables item position and status monitoring

#### For customs authorities:

* simplifies access to item inventory/load information and all related documents and certificates
* provides access to owner information and simplifies direct contact if required

#### For port authorities and freight forwarders:

* simplifies access to item route information
* provides access to temperature sensor information with optional alerting functionality in case of temperature value rise or power outages

### How it works

The Demo software is based on an open-sourced IOTA library written in JavaScript.
Documentation and usage guide are provided.
https://github.com/iotaledger/mam.client.js
It is running on a IOTA testnet.

This library exposes functions for creating a new MAM channel, submitting a new event to the existing channel and retrieving data from the channel.

#### Object identity

Items are represented by data sets where item ID is a key to retrieve the data.
Once a new item is announced, an MAM stream is created in the background and initial item information is saved in the first event and becomes immutable.
Users with specific access rights can append new events to the item MAM stream, such as status or location updates. New documents can be added, its metadata is also appended to the stream as a new event.
Users with read-only access can retrieve data saved in the stream. Our back-office access management software can determine whether a user is allowed to retrieve all events or just a defined subset of events.

All events saved in the item MAM stream are immutable and encrypted with a strong private key.
Despite the fact that transactions are stored in a public Tangle, all data is encrypted, and only users who has the stream root address and encryption key can retrieve the saved events and decrypt payload.

#### Document handling

We implemented a document integrity validation functionality. Every time a document is saved in the document storage, its metadata like size, last changed date and calculated hash checksum are stored in IOTA distributed ledger. This data is immutable.

While document itself can be modified or overwritten in Google Drive, we retrieve it and calculate its hash checksum in real time. In case there is a difference with the stored values, we'll alarm users and indicate that documents’ content is no longer authentic.

#### Access privileges

Since there is no user management functionality built-in into IOTA protocol, we developed an application (written in React) and a supporting back-office to manage user roles and access rights (Firebase). Different users (organisations) are provided with the relevant "private keys" to unlock different parts of the stored documents pending their authorization level.

The document storage is connected to the same system and currently based on Google Drive.

#### Sensor data

Sensor data from temperature sensors and GPS tracker can be feeded into the same channel and use IOTA library in combination with Firebase Cloud functions to append events to existing item streams.
