
const { createLambdaServer } = require("../dist/server")

const graphQLServer = createLambdaServer();

exports.handler = graphQLServer.createHandler({
  cors: {
    origin: '*'
  }
});

