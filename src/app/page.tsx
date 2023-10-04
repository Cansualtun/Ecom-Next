import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <div className="flex gap-4">
        <Button type="primary">Antd Primary Button</Button>
        <Button className="default">Antd Default Button</Button>
      </div>
    </div>
  );
}
