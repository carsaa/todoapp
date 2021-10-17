process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const request = require('supertest')

const app = require('../routes/todos.js')
const db = require('../db.js')

describe('POST /todos', () => {
    it('Ok, creates a new todo', () => {
        request(app).post('/')
        .send( {listId: "1253", task: "ABC" })
        .then((res) => {
            const body = res.body
            expect(body).to.contain.property('_id')
            expect(body).to.contain.property('listId')
            expect(body).to.contain.property('task')
            expect(body).to.contain.property('completed')
            expect(res).to.have.status(201)
            done()
        })
        .catch((err) => done(err))
    })

    it('Fail, task property is missing', (done) => {
        request(app).post('/')
        .send( {listId: "1253" })
        .then((res) => {
            const body = res.body
            expect(res).to.have.status(400)
            done()
        })
        .catch((err) => done(err))
    })
})

describe('GET /todos', () => {
    it('Ok, no todos are found', (done) => {
        request(app).get('/')
        .then((res) => {
            const body = res.body
            expect(body).length.to.equal(0)
            done()
        })
    })

    it('Ok, gets 1 todo', (done) => {
        request(app).post('/')
        .send( {listid: "abc123", task: "CDE"})
        .then((res) => {
            request(app).get('/'+ res.body.id)
                .then((res) => {
                    const body = res.body
                    expect(body.length).to.equal(1)
                    done()
                })
        })
        .catch((err) => done(err))  
    })
})

describe('PATCH /todos', () => {
    it('Ok, updates todo', (done) => {
        request(app).patch('/')
        .send( {completed: true})
            .then((res) => {
                const body = res.body
                expect.call(body.property.completed).to.equal(true)
                done()
            })
    })

    it('Fail, todo cannot be found', (done) => {
        request(app).patch('/' + "123456")
        .then((res) => {
            const body = res.body
            expect(res).to.have.status(400)
            done()
        })
    })
})

describe('DELETE /todos', () => {
    it('Ok, todo is deleted', (done) => {
        request(app).post('/')
        .send( {id: "1", listid: "123", task: "CDE"})
            .then((res) => {
                request(app).delete('/' + res.body.id)
                    .then((res) => {
                        const body = res.body
                        expect(res).to.have.status(200)
                        done()
                    })
            })
        .catch((err) => done(err))  
    })

    it('Fail, todo cannot be found', (done) => {
        request(app).delete('/' + "111") //Använder random id bara
        .then((res) => {
            const body = res.body
            expect(res).to.have.status(500)
            done()
        })
    })
})