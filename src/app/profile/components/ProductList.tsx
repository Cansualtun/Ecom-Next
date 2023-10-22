import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function ProductList() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => router.push("/profile/addProduct")}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default ProductList;
