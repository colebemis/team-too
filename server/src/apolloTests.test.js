const {ApolloServer, gql } = require("apollo-server");
const {importSchema } = require ("graphql-import");
//const {* as path} = require ("path");
//const {prisma, Prisma } = require ("./generated");
const { graphql } = require ('graphql');
const {createLocalVue, shallowMount, mount } = require ('@vue/test-utils');
const Promise = require('promise');
const Vuetify = require('vuetify');
//const request = require('request');
const rp = require('request-promise');
const request = require('supertest');

let postData = {
    query: `query returnUser($id: Int!){
                returnUser(id: $id){
                    id
                    username
                    email
                }
            }`,
    operationName: 'returnUser',
    variables: {
        id: 1
    }
};

test('called users query', () => {

  request('http://localhost:4000/')
      .post('?')
      .send(postData)
      .expect(200) // status code that you expect to be returned
      .end(function(error, response){
          if ( error ) console.log(error);

          // validate your response
      });

 });
