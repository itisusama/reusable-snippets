To install after npm init -y

```node
npm install express express-graphql graphql mongoose nodemon
```

make app.js in root

```js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const connectDB = require("./configs/db");

connectDB();

const app = express();

app.use("/graphql", graphqlHTTP({schema, graphiql: true,}));

module.exports = app;
```

make index.js in root
```js
const app = require("./app");
const PORT = 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
```

make schema/index.js (like we call functions in routes)
```js
const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {getAllEmployees, createEmployee, updateEmployee, deleteEmployee,} = require("../resolvers/employeeResolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employees: getAllEmployees,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEmployee,
    updateEmployee,
    deleteEmployee,
  },
});

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation,});
```

make schema/employee.js
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

// Employee Type Definition
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    position: { type: GraphQLString }
  })
});

module.exports = EmployeeType;

... go to the link for further instructions [Graph QL Mongo DB](https://d2ymvn.medium.com/building-a-graphql-api-with-node-js-express-and-mongodb-a-step-by-step-guide-8377638df0fd)
