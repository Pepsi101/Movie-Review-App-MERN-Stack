const expect = require('chai').expect;


describe("", ()=>{
     it(' Test authentication ', (done) =>{
         chai.request(server)
            .post("/api/auth")
             .end((err,response)=>{
                 response.should.have.status(200);
                 done();
             })
     })

          it('Test Login', (done) =>{
         chai.request(server)
            .post("/api/auth/log")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.have.propertry('name').eq("Task 1 Changed");
                 response.body.should.have.property('completed').eq(true);
                 done();
             })
     })

               it('Test Registration test', (done) =>{
         chai.request(server)
            .post("/api/auth/Registration")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('object');
                 response.body.should.have.propertry('name','email','_id')
   
                 done();
             })
     })

        it('test Token Creation ', (done) =>{
         chai.request(server)
            .post("/api/auth/Registration")
             .end((err,response)=>{
                 response.should.have.status(200);
                 response.body.should.a('array');
                 response.body.should.have.propertry('Token').

                 done();
             })
     })
})






