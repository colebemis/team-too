<template>
 <div>
   <PageHeader> Edit Home </PageHeader>
   <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
   <div class="w-4/5 mx-auto py-8 px-6" v-else>
     <EditSiteInfoForm :siteInfo="siteInfo" :updates="updates" @submit-form="updateSiteInfo"></EditSiteInfoForm> 
   </div>
 </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import Vue from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Button from "@/components/Button.vue";
import EditSiteInfoForm from "@/components/EditSiteInfoForm.vue";
import Loader from "@/components/Loader.vue";
import SITEINFO from "@/graphql/SiteInfo.gql";

export default Vue.extend({
 components: { PageHeader, Button, EditSiteInfoForm, Loader },
 data() {
   return {
     siteInfo: null,
     updates: {
       deleteHours: []
     }
   };
 },
 apollo: {
   siteInfo() {
     return {
       query: SITEINFO,
       }
   },
 },
 methods: {
   updateSiteInfo(siteInfo): any {
     this.$apollo.mutate({
       // Mutation
       mutation: gql`
         mutation($data: SiteInfoUpdateInput!) {
           updateSiteInfo(data: $data) {
             id
             address {
               line1,
               line2,
               city,
               state,
               zip
             }
             phone
             email
             about
             hours {
               id
               index
               day
               open
               close
             }
             services
           }
         }
       `,
       variables: {
         data: {
           address: { 
             update: {
              line1: siteInfo.address.line1,
              line2: siteInfo.address.line2,
              city: siteInfo.address.city,
              state: siteInfo.address.state,
              zip: siteInfo.address.zip,
            }
           },
           phone: siteInfo.phone,
           email: siteInfo.email,
           about: siteInfo.about,
           hours: {
             update: this.updateHoursList(siteInfo),
             create: this.createHoursList(siteInfo),
             delete: this.updates.deleteHours
           },
           services: {
             set: siteInfo.services
           }
         },
         id: siteInfo.id
       },
     })
   },
   updateHoursList(siteInfo): any {
    let i = 0;
    const hoursList = new Array();
    siteInfo.hours.forEach(hourLog => {
      if(hourLog.id != null) {
        const hourObject = {
          where: {
            id: hourLog.id
          },
          data: {
            index: hourLog.index,
            day: hourLog.day,
            open: hourLog.open,
            close: hourLog.close
          }
        } 
        hoursList[i] = hourObject;
        i++;
      }
    })
    return hoursList;
   },
   createHoursList(siteInfo): any {
    let i = 0;
    const hoursList = new Array();
    siteInfo.hours.forEach(hourLog => {
      if(hourLog.id == null) {
        const hourObject = {
            index: hourLog.index,
            day: hourLog.day,
            open: hourLog.open,
            close: hourLog.close
        } 
        hoursList[i] = hourObject;
        i++;
      }
    })
    return hoursList;
   },
 },
});
</script>