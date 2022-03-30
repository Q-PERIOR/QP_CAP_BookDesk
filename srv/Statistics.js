module.exports = srv => {
    console.log('Service name:', srv.name)
    
    if (srv.name === 'Statistics') {
        
        srv.after ('READ', 'BookingInfo', xs => {
            let newOrders = [];
            xs.forEach(x => {
                if( x.user == 'Jimmy' ) 
                {
                    x.user = x.user + ' - SAP'
                    newOrders.push(x)
                }
            })
            
            return newOrders
        })
    }
}