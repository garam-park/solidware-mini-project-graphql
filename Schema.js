import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

let Schema = (db) => {
  let UserType = new GraphQLObjectType({
      name :'User',
      fields : () => ({
        _id : { type : GraphQLString },
        email : { type : GraphQLString },
        name : { type : GraphQLString },
        password : { type : GraphQLString }
      })
  })

  let ChangeUserType = new GraphQLObjectType({
      name :'User',
      fields : () => ({
        email : { type : GraphQLString },
        password : { type : GraphQLString }
      })
  })

  let schema = new GraphQLSchema ({

    query : new GraphQLObjectType({
      name : 'Query',
      fields : () => ({
        users : {
          type : new GraphQLList(UserType),
          resolve : () => db.collection("users").find({}).toArray() //
        }
      })//end of fields
    }),//end of query
    mutation: new GraphQLObjectType({
      name : 'Mutation',
      fields : () => ({
        updateUser: {
          type: UserType,
          args: {
            email: {
              name: 'email',
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              name: 'password',
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (obj, {email, password}) =>
            db.collection("users")
            .updateOne({email:email}, {$set:{password:password}})
            .then(data => {
              if(data.matchedCount === 0 ){
                let error = new Error("Email doesn't exit");
                throw error;
              }
              if(data.modifiedCount === 0 )
                throw new Error("Password was not changed.")
              return db.collection("users").findOne({email:email});
            })
        }//end of updateUser
      })//end of fields
    })//end of mutation
  })
  return schema;
}


export default Schema;
