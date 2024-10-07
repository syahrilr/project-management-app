"use client"
import Header from "@/components/globals/header"; 
import React, { useState } from "react";
import { User, Mail, Users, Briefcase, Edit2, Save, X } from "lucide-react";

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  });

  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    teamName: false,
    roleName: false,
  });

  const handleEdit = (field: keyof typeof userSettings) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field: keyof typeof userSettings) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    // Here you would typically save the changes to your backend
  };

  const handleCancel = (field: keyof typeof userSettings) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    // Reset the field to its original value if needed
  };

  const handleChange = (field: keyof typeof userSettings, value: string) => {
    setUserSettings((prev) => ({ ...prev, [field]: value }));
  };

  const renderField = (
    field: keyof typeof userSettings,
    icon: React.ReactNode,
    label: string,
  ) => {
    return (
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
        <div className="mb-2 flex items-center justify-between">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {icon}
            <span className="ml-2">{label}</span>
          </label>
          {!editMode[field] && (
            <button
              onClick={() => handleEdit(field)}
              className="rounded-full p-1 text-gray-400 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
        {editMode[field] ? (
          <div className="flex items-center">
            <input
              type="text"
              value={userSettings[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="mr-2 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => handleSave(field)}
              className="mr-1 rounded-full p-1 text-green-500 transition-colors duration-300 hover:bg-green-100 dark:hover:bg-green-900"
            >
              <Save size={16} />
            </button>
            <button
              onClick={() => handleCancel(field)}
              className="rounded-full p-1 text-red-500 transition-colors duration-300 hover:bg-red-100 dark:hover:bg-red-900"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="text-lg font-medium text-gray-900 dark:text-white">
            {userSettings[field]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 p dark:bg-gray-900 sm:p-6 lg:p-8">
      <div className="max-w-3xl">
        <Header name="Settings" />
        <div className="mt-8 space-y-6">
          {renderField(
            "username",
            <User className="h-5 w-5 text-gray-500" />,
            "Username",
          )}
          {renderField(
            "email",
            <Mail className="h-5 w-5 text-gray-500" />,
            "Email",
          )}
          {renderField(
            "teamName",
            <Users className="h-5 w-5 text-gray-500" />,
            "Team",
          )}
          {renderField(
            "roleName",
            <Briefcase className="h-5 w-5 text-gray-500" />,
            "Role",
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
