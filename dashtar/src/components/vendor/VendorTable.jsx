import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import dayjs from "dayjs";
import { t } from "i18next";
import React from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Star1 } from "iconsax-react";

//internal import

import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import Tooltip from "@/components/tooltip/Tooltip";
import CustomerDrawer from "@/components/drawer/CustomerDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";

// internal imports

const VendorTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {" "}
                <span className="text-sm">{user.store_name}</span>
                {/* // {user?._id?.substring(20, 24)} */}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.store_type}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm flex items-center">
                {user.averageRating} <Star1 className="w-[1rem] ml-1" />
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.auth_email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{user.vendor_phone}</span>
            </TableCell>
            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  <Link to={`/vendor-order/:${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewOrder")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>
                <EditDeleteButton
                  title={user.name}
                  id={user._id}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default VendorTable;
