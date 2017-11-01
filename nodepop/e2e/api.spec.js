const request = require('supertest');
const express = require('express');

const app = require('../app');



describe('Check API Nodepop',function(){

    let agent;

    before(function(){
        agent = request(app);
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
});


