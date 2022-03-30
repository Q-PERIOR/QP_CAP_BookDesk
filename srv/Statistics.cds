using qpe.cloud from '../db/schema';

service Statistics {
    @readonly entity BookingInfo as projection on cloud.Booking excluding {
        createdAt,
        createdBy,
        modifiedAt,
        modifiedBy,
        ID
    }
}