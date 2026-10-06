(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`704a59a85b8144f735f3afe95807714b807988db`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`09234025-4ce6-4885-90bd-2319f0c420d9`,e._sentryDebugIdIdentifier=`sentry-dbid-09234025-4ce6-4885-90bd-2319f0c420d9`)}catch{}})();var e=[{id:`email-001`,org_id:`org-mock-001`,sender:`Klaus Bergmann`,email:`buchhaltung@rheinmuehle.de`,organization:`Rheinmühle GmbH`,subject:`Invoice RM-2026-4521 for PO #FB-4500123456`,body:`Dear Accounts Payable,

Please find attached our invoice RM-2026-4521 for the flour delivery against your Purchase Order #FB-4500123456.

Invoice Amount: € 18,750.00
Lot Number: RM-L-20260301
Best Before: 15-Sep-2026
Allergen Declaration: Contains WHEAT (gluten)
Payment Terms: Net 30
Due Date: 08-Apr-2026

Delivery was completed on 08-Mar-2026, goods receipt #GR-2026-1847.`,date:`2026-03-09T10:30:00Z`,message_id:`<msg-001@rheinmuehle.de>`,to:`ap@docbits.com`,cc:null,reply_to:null,in_reply_to:null,references:null,classification:`Invoice`,read:!1,mission_id:null,orchestration_status:`in_progress`,created_on:`2026-03-09T10:30:00Z`,last_modified_on:`2026-03-09T10:35:00Z`},{id:`email-002`,org_id:`org-mock-001`,sender:`Erik Lindqvist`,email:`logistics@nordicpack.se`,organization:`Nordic Packaging Solutions`,subject:`Delivery Confirmation — Labels Order #NP-8834`,body:`Dear Procurement Team,

We confirm delivery of your label order #NP-8834.

Items delivered:
- 50,000x Product labels (4-color, 80×120mm)
- 10,000x Allergen warning stickers (EN/DE/FR)

Print specs: CMYK, food-safe ink, EU 1935/2004 compliant
Expected arrival: 11-Mar-2026

Please acknowledge receipt.`,date:`2026-03-09T09:15:00Z`,message_id:`<msg-002@nordicpack.se>`,to:`procurement@docbits.com`,cc:null,reply_to:null,in_reply_to:null,references:null,classification:`POConfirm`,read:!0,mission_id:null,orchestration_status:`done`,created_on:`2026-03-09T09:15:00Z`,last_modified_on:`2026-03-09T09:20:00Z`},{id:`email-003`,org_id:`org-mock-001`,sender:`Carlos Mendoza`,email:`quality@cacaotropicale.ec`,organization:`Cacao Tropicale S.A.`,subject:`CoA — Organic Cocoa Powder Batch #CT-88712`,body:`Dear Quality Team,

Please find attached the Certificate of Analysis for Organic Cocoa Powder, Batch #CT-88712.

Test results:
- Fat content: 10.8% (spec: 10-12%)
- Moisture: 4.2% (spec: max 5%)
- Heavy metals: All below limits
- Microbiological: Passed
- Organic certification: USDA Organic + EU Organic

Batch ready for release. Allergens: May contain MILK traces (shared facility).`,date:`2026-03-08T16:00:00Z`,message_id:`<msg-003@cacaotropicale.ec>`,to:`quality@docbits.com`,cc:null,reply_to:null,in_reply_to:null,references:null,classification:`CoA`,read:!0,mission_id:null,orchestration_status:`done`,created_on:`2026-03-08T16:00:00Z`,last_modified_on:null}];export{e as mockEmails};