import requests from "./httpService";

const VendorServices = {
  getAllVendors: async ({ searchText = "" }) => {
    return requests.get(`/vendors?searchText=${searchText}`);
  },

  // user create
  registerVendor: async (body) => {
    return requests.post(`/vendors/create`, body);
  },

  filterVendor: async (email) => {
    return requests.post(`/vendors/filter/${email}`);
  },
};

export default VendorServices;
