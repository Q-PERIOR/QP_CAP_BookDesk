namespace qpe.cloud;
using { cuid, managed }from '@sap/cds/common';

    entity Offices {
        Key ID : Integer;
        name : String;
        street : String;
        town : String;
        country : String;
        desks : Association to many Desks on desks.office = $self;
    }

    entity Desks {
        Key ID : Integer;
        office : Association to Offices;
        name : String;
    }

    entity Booking : managed, cuid {
        office : Association to Offices;
        workplace : Association to Desks;
        user : String;
        date: Date;
    }