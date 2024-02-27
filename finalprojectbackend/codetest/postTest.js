let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");

chai.should();
chai.use(chaiHttp);
const conn = require('../config/db');


describe("", ()=>{
     it('Test Making post ', (done) =>{
         chai.request(server)
            .post("/api/post")
             .end((err,response)=>{
                 response.should.have.status(200);
                response.body.should.have.propertry('name','text','shows','_id');
                 response.body.should.have.property('completed').eq(true);
                 done();
             })
     })

          it('Test Giving Comment ', (done) =>{
         chai.request(server)
            .put("/api/post/:id")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.have.propertry('name','comment','_id')
                 response.body.should.have.property('completed').eq(true);
                 done();
             })
     })

        it('Test giving Like ', (done) =>{
         chai.request(server)
            .post("/api/post/:id")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.have.propertry('name','email','like')
   
                 done();
             })
     })

        it('Test Removeing Post ', (done) =>{
         chai.request(server)
            .delete("/api/post/:id")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('array');
                 response.body.should.have.propertry('Token').

                 done();
             })
     })
})






