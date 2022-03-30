using qpe.cloud from '../db/schema';

service BookDesk {
    @readonly entity Office as projection on cloud.Office;
    @readonly entity Desk as projection on cloud.Desk;
    entity Booking as projection on cloud.Booking order by date asc;
}

annotate BookDesk.Desk with @(
    UI: {
        HeaderInfo: {
            TypeName: 'Desk',
            TypeNamePlural: 'Desks',
            Title: {Value: name},
            Description: {Value: office.name}
        },
        SelectionFields: [ ID, name, office.name],
        LineItem: [
            { Value: ID },
            { Value: name }
        ],
        Facets: [
            {
                $Type: 'UI.CollectionFacet',
                Label: 'Desk Info',
                Facets: [
                    {
                        $Type: 'UI.ReferenceFacet', 
                        Target: '@UI.FieldGroup#Main', 
                        Label: 'Main Facet'}

                ]
            }
        ],
        FieldGroup#Main: {
            Data: [
                { Value: ID },
                { Value: name }           
            ]
        }

    }

);
