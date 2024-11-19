import React, { useState, Dispatch, SetStateAction } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-json";

type JsonEditorProps = {
  onSchemaChange: Dispatch<
    SetStateAction<{
      title: string;
      fields: (
        | { name: string; label: string; type: string; required: boolean; options?: undefined }
        | { name: string; label: string; type: string; options: string[]; required: boolean }
      )[];
    }>
  >;
};

const JsonEditor: React.FC<JsonEditorProps> = ({ onSchemaChange }) => {
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
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
      },
      null,
      2
    )
  );
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (code: string) => {
    setJsonInput(code);
    try {
      const parsedSchema = JSON.parse(code);
      setError(null);
      onSchemaChange(parsedSchema);
    } catch (err) {
      setError("Invalid JSON syntax");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
    alert("JSON copied to clipboard!");
  };

  return (
    <div className="w-full h-full">
      <Editor
        value={jsonInput}
        onValueChange={handleInputChange}
        highlight={(code) => highlight(code, languages.json, "json")}
        padding={10}
        className="border rounded-lg shadow-md w-full min-h-[50vh] max-h-[70vh] text-sm font-mono bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <div className="text-red-500 mt-2">
          <strong>Error:</strong> {error}
        </div>
      )}
      <button
        onClick={copyToClipboard}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Copy Form JSON
      </button>
    </div>
  );
};

export default JsonEditor;
