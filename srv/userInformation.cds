using qpe.cloud from '../db/schema';

service UserInformation {
    function readUserBookings (date:Date) returns array of String;
}