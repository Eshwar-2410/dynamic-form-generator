import React, { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import FormGenerator from "./components/FormGenerator";

const App: React.FC = () => {
  const [schema, setSchema] = useState({
    title: "User Information",
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "age", label: "Age", type: "number", required: true },
      { name: "newsletter", label: "Subscribe to Newsletter", type: "checkbox", required: false },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
      },
    ],
  });

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section: JSON Editor */}
      <div className="w-full md:w-1/2 p-4 bg-gray-100 border-b md:border-r overflow-auto">
        <JsonEditor onSchemaChange={setSchema} />
      </div>

      {/* Right Section: Form Generator */}
      <div className="w-full md:w-1/2 p-4 bg-white overflow-auto">
        <FormGenerator schema={schema} />
      </div>
    </div>
  );
};

export default App;
