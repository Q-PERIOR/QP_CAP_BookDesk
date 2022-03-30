const cds = require('@sap/cds')

describe('bookDesk: OData Protocol Level Testing', () => {
    const app = require('express')()
    const request = require('supertest')(app)

    beforeAll(async () => {
        await cds.deploy(__dirname + '/../srv/bookDesk').to('sqlite::memory:')
        await cds.serve('BookDesk').from(__dirname + '/../srv/bookDesk').in(app)
    })

    it('Service $metadata document', async () => {
        const response = await request
            .get('/book-desk/$metadata')
            .expect('Content-Type', /^application\/xml/)
            .expect(200)

            const expectedVersion = '<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">'
            const expectedOfficeEntitySet = '<EntitySet Name="Office" EntityType="BookDesk.Office">'
            expect(response.text.includes(expectedVersion)).toBeTruthy()
            expect(response.text.includes(expectedOfficeEntitySet)).toBeTruthy()
    })

    it('Get Offices with select and expand', async () => {
        const response = await request
        .get('/book-desk/Office?$select=name,country&$expand=desks')
        .expect('Content-Type', /^application\/json/)
        .expect(200)

        expect(response.body.value).toEqual([
            {
                "name": "Munich Office",
                "country": "Germany",
                "ID": 1,
                "desks": [
                  {
                    "ID": 101,
                    "office_ID": 1,
                    "name": "M_1"
                  },
                  {
                    "ID": 102,
                    "office_ID": 1,
                    "name": "M_2"
                  },
                  {
                    "ID": 103,
                    "office_ID": 1,
                    "name": "M_3"
                  },
                  {
                    "ID": 104,
                    "office_ID": 1,
                    "name": "M_4"
                  }
                ]
              },
              {
                "name": "Cluj Office",
                "country": "Romania",
                "ID": 2,
                "desks": [
                  {
                    "ID": 201,
                    "office_ID": 2,
                    "name": "C_1"
                  },
                  {
                    "ID": 202,
                    "office_ID": 2,
                    "name": "C_2"
                  },
                  {
                    "ID": 203,
                    "office_ID": 2,
                    "name": "C_3"
                  }
                ]
              },
              {
                "name": "London Office",
                "country": "United Kingdom",
                "ID": 3,
                "desks": [
                  {
                    "ID": 301,
                    "office_ID": 3,
                    "name": "L_1"
                  },
                  {
                    "ID": 302,
                    "office_ID": 3,
                    "name": "L_2"
                  },
                  {
                    "ID": 303,
                    "office_ID": 3,
                    "name": "L_3"
                  },
                  {
                    "ID": 304,
                    "office_ID": 3,
                    "name": "L_4"
                  }
                ]
              }
        ])

    })
})

describe('bookDesk: CDS Service Level Testing', () => {
    let srv, Office
    
    beforeAll(async () => {
        srv = await cds.serve('BookDesk').from(__dirname + '/../srv/bookDesk')
        Office = srv.entities.Office
        expect(Office).toBeDefined()
    })

    it('GET all Offices', async() => {
        const offices = await srv.read(Office, office => { office.name })

        expect(offices).toMatchObject([
            { "name": "Munich Office" },
            { "name": "Cluj Office" },
            { "name": "London Office" }
        ])
    })
})