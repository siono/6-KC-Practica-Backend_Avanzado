const request = require('supertest');

// Inicializamos mockgoose
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fix');

const app = require('../app');

describe('Check API Nodepop',function(){

    let agent;

    before(async function(){
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://example.com/TestingDB', {
          useMongoClient: true
        });
        // limpiamos las definiciones de modelos y esquemas de mongoose
        mongoose.models = {};
        mongoose.modelSchemas = {};
        await mongodbFixtures.initBBDD();
        
        agent = request.agent(app);
        
        //Antes de ejecutar los test ejecutamos el login
        loginUser(agent);
        
    });

    
    it('Show ads, should return 200 and format json',function(done){
        agent
        .get('/apiv1/anuncios/')
        .expect('Content-Type', /json/)
        .field('sucess',true)
        .expect(200,done)
    })

    it('Search ads, should return 200 and format json',function(done){
        agent
        .get('/apiv1/anuncios?precio=50-&tag=mobile&venta=true&skip=1&limit=2')
        .expect('Content-Type', /json/)
        .field('sucess',true)
        .expect(200,done)
    })

    it('Create ad, should return 200 and format json',function(done){
        agent
        .post('/apiv1/anuncios')
        .send({"nombre": "Product Test","venta1": true,"precio": 230.15,"foto": "test.jpg","tags": ["motor"]})
        .expect('Content-Type', /json/)
        .field('sucess',true)
        .expect(200,done)
    })

    it('Create ad, show error if send a number',function(done){
        agent
        .post('/apiv1/anuncios')
        .send(2)
        .expect('Content-Type', /json/)
        .field('sucess',true)
        .expect(200,done)
    })

    function loginUser(agent) {
        return 
            agent
                .post('/apiv1/authenticate')
                .send({"email": 'example@example.com', "password": "1234"})
                .expect('Content-Type', /json/)
                .expect(200)
                .end();
    
        
    };


});


