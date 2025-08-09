"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Dropdown from "@/components/atoms/Dropdown";
import Table from "@/components/atoms/Table";
import { RequestStatus } from "@/lib/types/request";
import { useState } from "react";
/**
 * Legacy front-end code from Crisis Corner's previous admin page!
 */
export default function ItemRequestsPage() {
  const [item, setItem] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);

  const handleAddItem = (): void => {
    if (item.trim()) {
      setItemList((prevList) => [...prevList, item.trim()]);
      setItem("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 flex flex-col items-center justify-center">
        <Table columns={["Name", "Item Requested", "Created", "Updated", "Status"]}
          tabs={["All", "Pending", "Approved", "Completed", "Rejected"]} title="Item Requests" />
    </div>
  );
}
