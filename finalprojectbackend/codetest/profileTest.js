const expect = require('chai').expect;

describe("", ()=>{
     it('test Profile Creating ', (done) =>{
         chai.request(server)
            .post("/api/profiles/me")
             .end((err,response)=>{
                 response.should.have.status(200);
                response.body.should.have.propertry('name','email','userid')
                 response.body.should.have.property('completed').eq(true);
                 done();
             })
     })

          it('test Watchlist Installation ', (done) =>{
         chai.request(server)
            .post("/api/profiles")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.have.propertry('name','watchlist','watchlist_id');
                 response.body.should.have.property('completed').eq(true);
                 done();
             })
     })

               it('test Removing Watchlist ', (done) =>{
         chai.request(server)
            .post("/api/auth/Registration")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.a('array');
                 response.body.should.have.property('completed').eq(true);
   
                 done();
             })
     })

        it('test Token Creation ', (done) =>{
         chai.request(server)
            .get("/api/profiles")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.have.propertry('Token').
                 response.body.should.have.property('completed').eq(true);

                 done();
             })
     })
})



