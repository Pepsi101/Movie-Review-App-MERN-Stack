let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");

chai.should();
chai.use(chaiHttp);
const conn = require('../config/db');


describe("", ()=>{
     it("Test Same User Registration ", (done) =>{
         chai.request(server)
            .post("/api/users")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.have.propertry('name','email','userid').
                 response.body.should.have.property('completed').eq(true);
                 done();
             })
     })
})