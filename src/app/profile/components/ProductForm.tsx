import { getAntdFieldRequiredRule } from "@/helpers/validations";
import { Button, Form, message, Upload } from "antd";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  setSelectedFiles: any;
  loading: boolean;
  onSave: any;
}

function ProductForm({ setSelectedFiles, loading, onSave }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        onFinish={onSave}
      >
        <div className="col-span-3">
          <Form.Item
            label="Name"
            name="name"
            rules={getAntdFieldRequiredRule("Name is required")}
          >
            <input />
          </Form.Item>
        </div>
        <div className="col-span-3">
          <Form.Item
            label="Description"
            name="description"
            rules={getAntdFieldRequiredRule("Description is required")}
          >
            <textarea />
          </Form.Item>
        </div>
        <Form.Item
          label="Price"
          name="price"
          rules={getAntdFieldRequiredRule("Price is required")}
        >
          <input type="number" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={getAntdFieldRequiredRule("Category is required")}
        >
          <select>
            <option value="">Select Category</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item
          label="Count In Stock"
          name="countInStock"
          rules={getAntdFieldRequiredRule("Stock is required")}
        >
          <input type="number" />
        </Form.Item>
        <div className="col-span-3">
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={(file) => {
              setSelectedFiles((prev: any) => [...prev, file]);
              return false;
            }}
          >
            Upload
          </Upload>
        </div>
        <div className="col-span-3 justify-end flex gap-5">
          <Button loading={loading} onClick={() => router.back()}>
            Back
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductForm;
