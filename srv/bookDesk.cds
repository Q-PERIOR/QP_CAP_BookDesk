using qpe.cloud from '../db/schema';

service BookDesk {
    entity Offices as projection on cloud.Offices;
    entity Desks as projection on cloud.Desks;
    entity Booking as projection on cloud.Booking;
}