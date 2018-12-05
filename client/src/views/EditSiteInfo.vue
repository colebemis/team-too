<template>
 <div>
   <PageHeader> Edit Home </PageHeader>
   <div v-if="$apollo.loading" class="my-20 text-center"><Loader /></div>
   <div class="w-4/5 mx-auto py-8 px-6" v-else>
     <EditSiteInfoForm :submitFunction="updateSiteInfo" :siteInfo="siteInfo"></EditSiteInfoForm> 
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
   updateSiteInfo(): any {
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
              line1: this.siteInfo.address.line1,
              line2: this.siteInfo.address.line2,
              city: this.siteInfo.address.city,
              state: this.siteInfo.address.state,
              zip: this.siteInfo.address.zip,
            }
           },
           phone: this.siteInfo.phone,
           email: this.siteInfo.email,
           about: this.siteInfo.about,
           hours: {
             update: this.createHoursList()
           },
           services: {
             set: this.siteInfo.services
           }
         },
         id: this.siteInfo.id
       },
     })
   },
   createHoursList(): any {
    let i = 0;
    const hoursList = new Array();
    this.siteInfo.hours.forEach(hourLog => {
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
    })
    return hoursList;
   }
 },
});
</script>