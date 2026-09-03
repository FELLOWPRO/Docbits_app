(function(){try{var e=typeof window<`u`?window:typeof global<`u`?global:typeof globalThis<`u`?globalThis:typeof self<`u`?self:{};e.SENTRY_RELEASE={id:`2b86aeb1f0ff6769b14abbb1f2b544540b5f47e8`};var t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]=`090c8308-0fe2-445b-91ec-f9c722b096c3`,e._sentryDebugIdIdentifier=`sentry-dbid-090c8308-0fe2-445b-91ec-f9c722b096c3`)}catch{}})();import{Za as e,ka as t,kt as n,ld as r}from"./api-config.LmILnhmw.js";var i=class extends t{async fetchEmails(t){let n=await this.getHeaders(),r=new URLSearchParams({include_content:`false`});t?.read!==void 0&&r.set(`read`,String(t.read)),t?.skip!==void 0&&r.set(`skip`,String(t.skip)),t?.limit!==void 0&&r.set(`limit`,String(t.limit)),t?.search&&r.set(`search`,t.search);let i=await super.get(`${e.docnet_emails}?${r.toString()}`,{headers:n}),a=i;return{items:a.items||i,total:a.total??a.items?.length??0,skip:a.skip??t?.skip??0,limit:a.limit??t?.limit??50,unread_total:a.unread_total??0}}async fetchEmail(t){let n=await this.getHeaders();return await super.get(`${e.docnet_emails}/${t}?include_content=true`,{headers:n})}async patchEmail(t,n){let r=await this.getHeaders();return await super.patch(`${e.docnet_emails}/${t}`,n,{headers:r})}async markRead(t){let n=await this.getHeaders();await super.patch(`${e.docnet_emails}/${t}/read`,{},{headers:n})}async fetchExtractionResults(t){let n=await this.getHeaders();return await super.get(`${e.docnet_emails}/${t}/extraction-results`,{headers:n})}},a=[{id:`email-001`,org_id:`org-mock-001`,sender:`Klaus Bergmann`,email:`buchhaltung@rheinmuehle.de`,organization:`Rheinmühle GmbH`,subject:`Invoice RM-2026-4521 for PO #FB-4500123456`,body:`Dear Accounts Payable,

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

Batch ready for release. Allergens: May contain MILK traces (shared facility).`,date:`2026-03-08T16:00:00Z`,message_id:`<msg-003@cacaotropicale.ec>`,to:`quality@docbits.com`,cc:null,reply_to:null,in_reply_to:null,references:null,classification:`CoA`,read:!0,mission_id:null,orchestration_status:`done`,created_on:`2026-03-08T16:00:00Z`,last_modified_on:null}],o=new i,s=r(`docnet_email`,{state:()=>({emails:[],selectedEmailId:null,loading:!1,page:1,limit:50,total:0,unreadTotal:0,searchFilter:``,_lastFetchParams:void 0,_lastSearchFilter:``}),getters:{unreadCount(e){return e.unreadTotal},emailsByMission:e=>t=>e.emails.filter(e=>e.mission_id===t),emailsByClassification:e=>t=>e.emails.filter(e=>e.classification===t),selectedEmail(e){return e.selectedEmailId?e.emails.find(t=>t.id===e.selectedEmailId)??null:null},totalPages(e){return Math.max(1,Math.ceil(e.total/e.limit))}},actions:{async fetchEmails(e){if(n().useMockData){this.emails=a,this.total=a.length;return}let t=e?.read??(e===void 0?this._lastFetchParams?.read:void 0),r=t===this._lastFetchParams?.read,i=(e?.page??this.page)===this.page,s=!e?.forceReplace&&this.emails.length>0&&r&&i&&this._lastSearchFilter===this.searchFilter;s||(this.loading=!0);try{let n=e?.page??this.page,r=(n-1)*this.limit,i=await o.fetchEmails({read:t,skip:r,limit:this.limit,search:this.searchFilter||void 0});s?this._mergeEmails(i.items):this.emails=i.items,this.total=i.total,this.unreadTotal=i.unread_total,this.page=n,this._lastFetchParams={read:t},this._lastSearchFilter=this.searchFilter}finally{this.loading=!1}},async goToPage(e,t){await this.fetchEmails({...t,page:e})},async setSearchFilter(e,t){let n=e?.trim()??``;n!==this.searchFilter&&(this.searchFilter=n,this.page=1,await this.fetchEmails({...t,page:1}))},async fetchEmailDetail(e){let t=await o.fetchEmail(e),n=this.emails.findIndex(t=>t.id===e);return n!==-1&&(this.emails[n]=t),t},async markAsRead(e){let t=this.emails.find(t=>t.id===e);t&&!t.read&&(t.read=!0,this.unreadTotal>0&&this.unreadTotal--),await o.markRead(e)},async linkToMission(e,t){await o.patchEmail(e,{mission_id:t});let n=this.emails.find(t=>t.id===e);n&&(n.mission_id=t)},async setOrchestrationStatus(e,t){await o.patchEmail(e,{orchestration_status:t});let n=this.emails.find(t=>t.id===e);n&&(n.orchestration_status=t)},resetPagination(){this.page=1,this.total=0,this.emails=[]},_mergeEmails(e){let t=new Map(this.emails.map(e=>[e.id,e]));for(let n of e){let e=t.get(n.id);e&&Object.assign(e,n)}let n=e.filter(e=>!t.has(e.id));n.length>0&&this.emails.unshift(...n)}}});export{i as n,s as t};
//# sourceMappingURL=docnet-email.store.Dntw6ki4.js.map