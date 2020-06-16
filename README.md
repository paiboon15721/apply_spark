# Spark streaming demo.

This project is dedicated for demo spark streaming realtime analytic to classify hate speech using logistic regression algorithm.

## Getting start

This project required spark and nodejs

## Install nodejs

1. curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
2. sudo apt install nodejs -y

## Start server

1. run `npm install`
2. edit *start_server.sh* script to adjust params that appropriate to your system.
3. start webserver using `npm start`
![npm start](https://raw.githubusercontent.com/paiboon15721/apply_spark/master/screenshot/npm_start.png)
4. start spark server `./start_server.sh`
5. open webbrowser on http://localhost:3000

You can read more about spark streaming [here](https://www.analyticsvidhya.com/blog/2019/12/streaming-data-pyspark-machine-learning-model/)
