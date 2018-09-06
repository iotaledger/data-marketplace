## Install packages
If you have Yarn, run:
`yarn`

If you have NPM, run:
`npm install`


## Run script
`node index.js`


## Modify payload
Payload​ represents a single data package in ​JSON​ format, it’s keys should match field IDs of the sensor.

Open `index.js` file from the root folder.
You'll find two usage examples
- First example shows how to read sensor data from a static file or database. For this example we
provided a `​data.json​` file with sample data.
- Second example shows how to read sensor data from remote server using API. For this example we utilize a server which serves sample data. To modify the server URL, please update the serverUrl​ field from the ​`config.json`​ file in same folder.

To modify the sensor ID and it’s secret key, please update the ​`config.json`.​

#### Debug your code
By default the script runs in `​debug mode` which enables you to verify the data before publishing it to the Data Marketplace.

As long as debug flag set to `​true​`, no data is published.
To modify the ​debug​ flag please update the ​debug​ field from the ​`config.json`​ file.


## Publish to the Data Marketplace

To publish data stream to the Data Marketplace, set the `debug` variable to `false` in `config.json` file
