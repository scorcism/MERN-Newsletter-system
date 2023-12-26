import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const utilApi = createApi({
  reducerPath: "utilAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/api/root`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${Cookies.get("AUTH_TOKEN")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Create Audience Type
    createAudienceType: builder.mutation({
      query: (cred) => ({
        url: "/audience-type/create-type",
        method: "post",
        body: JSON.stringify({ type: cred }),
      }),
    }),

    // Get Audience Type
    getAudienceType: builder.query({
      query: () => "/audience-type/types",
    }),

    // Create Audience
    createAudience: builder.mutation({
      query: (cred) => ({
        url: "/audience/create-audience",
        method: "post",
        body: cred,
      }),
    }),

    // Get Audiences
    getAudience: builder.query({
      query: () => "/audience/audiences",
    }),

    // Create Api Key
    createApi: builder.mutation({
      query: (cred) => ({
        url: "/audience-api/create",
        method: "post",
        body: cred,
      }),
    }),

    // Create Send Mail
    createSendMail: builder.mutation({
      query: (cred) => ({
        url: "/utils/send-mail",
        method: "post",
        body: cred,
      }),
    }),

    // Delete Audience Type
    deleteAudienceType: builder.mutation({
      query: (cred) => ({
        url: "/audience-type/delete-type",
        method: "post",
        body: cred,
      }),
    }),

    // Delete Audience
    deleteAudience: builder.mutation({
      query: (cred) => ({
        url: "/audience/delete-audience",
        method: "post",
        body: cred,
      }),
    }),
  }),
});

export const {
  useCreateAudienceTypeMutation,
  useGetAudienceTypeQuery,
  useCreateAudienceMutation,
  useGetAudienceQuery,
  useCreateApiMutation,
  useCreateSendMailMutation,
  useDeleteAudienceTypeMutation,
  useDeleteAudienceMutation
} = utilApi;
