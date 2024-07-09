import React from "react";
import {
  Card,
  Button,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import UploadManyTwo from "@/components/common/UploadManyTwo";
import CustomerTable from "@/components/customer/CustomerTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import CustomerServices from "@/services/CustomerServices";
import VendorServices from "@/services/VendorServices";
import VendorTable from "@/components/vendor/VendorTable";

function Vendors() {
  const { data, loading, error } = useAsync(VendorServices.getAllVendors);

  // console.log('customer',data)

  const {
    userRef,
    dataTable,
    serviceData,
    filename,
    isDisabled,
    setSearchUser,
    totalResults,
    resultsPerPage,
    handleSubmitUser,
    handleSelectFile,
    handleChangePage,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const { t } = useTranslation();
  const handleResetField = () => {
    setSearchUser("");
    userRef.current.value = "";
  };

  const categoryItems = [
    {
      name: "All",
      value: "",
    },
    {
      name: "Bakery",
      value: "",
    },
    {
      name: "Butchery",
      value: "",
    },
    {
      name: "Liqour and Drinks",
      value: "",
    },
    {
      name: "Supermarket",
      value: "",
    },
    {
      name: "Fruits and Vegetables",
      value: "",
    },
    {
      name: "Cosmetics",
      value: "",
    },
  ];
console.log(dataTable)
  return (
    <>
      <PageTitle>{t("VendorsPage")}</PageTitle>
      <div className="flex flex-col md:flex-row gap-y-3 items-center w-full p-2 md:p-0">
        <label className="input input-bordered flex items-center gap-2 rounded-full bg-gray-200 dark:bg-transparent w-full md:w-auto">
          <input
            type="text"
            ref={userRef}
            className="grow"
            placeholder="Search"
         
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button
          className="btn bg-emerald-700  
        hover:bg-emerald-600 text-gray-200 border-none 
        rounded-full md:w-[10rem] md:ml-4 w-full "
        >
          Add Store
        </button>
      </div>
      <div className="w-full flex flex-wrap gap-4 pt-10 items-center justify-center md:justify-normal">
        {categoryItems.map((e) => (
          <button
            className="btn btn-sm rounded-full 
         bg-emerald-700 hover:bg-emerald-600 border-none text-gray-200"
          >
            {e.name}
          </button>
        ))}
      </div>
      <label className="text-[1.5rem] pt-5">Nigeria: All Stores</label>
      <TableContainer className="mb-8 mt-4">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>STORE NAME</TableCell>
              <TableCell>STORE TYPE</TableCell>
              <TableCell>RATINGS</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell>TOTAL ORDERS</TableCell>
              <TableCell className="text-right">
               ACTIONS
              </TableCell>
            </tr>
          </TableHeader>
          <VendorTable customers={dataTable} />
        </Table>

        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Vendors;
