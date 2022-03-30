const cds = require('@sap/cds')

module.exports = (UserInformation) =>{
    UserInformation.on ('readUserBookings', _readUserBookings)

    async function _readUserBookings (req) {
        const db = await cds.connect.to('db')
        const { Desk, Booking } = db.entities 
        const result = await db.run(SELECT(Desk))

        let array = []
        result.forEach( item => {
            array.push(item.name)
        })
        
        return array
    }
}