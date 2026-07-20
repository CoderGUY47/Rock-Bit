"use client";

import React from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCheck, FiInfo, FiAlertTriangle, FiX } from "react-icons/fi";

interface CustomToastProps {
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  closeToast?: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  title,
  message,
  type,
  closeToast,
}) => {
  const isSuccess = type === "success";
  const isWarning = type === "warning" || type === "info";
  const isError = type === "error";

  return (
    <div className="relative w-full overflow-hidden rounded-md border border-white/10 dark:border-black/10 bg-black/75 dark:bg-white/75 text-white dark:text-gray-900 backdrop-blur-md shadow-2xl p-4 flex flex-col justify-between select-none transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        {/* Left Icon Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              isSuccess
                ? "bg-green-500 text-white dark:bg-green-500/15 dark:text-green-600"
                : isWarning
                ? "bg-yellow-500 text-white dark:bg-yellow-500/15 dark:text-yellow-600"
                : "bg-red-500 text-white dark:bg-red-500/15 dark:text-red-600"
            }`}
          >
            {isSuccess && <FiCheck className="w-5 h-5 stroke-[2.5]" />}
            {isWarning && <FiInfo className="w-5 h-5 stroke-[2.5]" />}
            {isError && <FiAlertTriangle className="w-5 h-5 stroke-[2.5]" />}
          </div>

          {/* Title and Message */}
          <div>
            <h4 className="text-sm font-bold text-white dark:text-gray-900 tracking-tight leading-none mb-1">
              {title}
            </h4>
            <p className="text-xs font-medium text-gray-300 dark:text-gray-600 leading-snug">
              {message}
            </p>
          </div>
        </div>

        {/* Close Button */}
        {closeToast && (
          <button
            onClick={closeToast}
            className="text-gray-400 hover:text-white dark:text-gray-200 dark:hover:text-gray-200 transition-colors cursor-pointer rounded-md"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Color Bar matching the 2nd reference image */}
      <div
        className={`h-1.5 w-full rounded-full mt-2 ${
          isSuccess
            ? "bg-emerald-500"
            : isWarning
            ? "bg-amber-500"
            : "bg-rose-500"
        }`}
      />
    </div>
  );
};

// Helper trigger functions
export const notifySuccess = (title: string, message: string, options?: ToastOptions) => {
  toast(
    ({ closeToast }) => (
      <CustomToast title={title} message={message} type="success" closeToast={closeToast} />
    ),
    {
      style: { background: "transparent", boxShadow: "none", padding: 0 },
      ...options,
    }
  );
};

export const notifyWarning = (title: string, message: string, options?: ToastOptions) => {
  toast(
    ({ closeToast }) => (
      <CustomToast title={title} message={message} type="warning" closeToast={closeToast} />
    ),
    {
      style: { background: "transparent", boxShadow: "none", padding: 0 },
      ...options,
    }
  );
};

export const notifyError = (title: string, message: string, options?: ToastOptions) => {
  toast(
    ({ closeToast }) => (
      <CustomToast title={title} message={message} type="error" closeToast={closeToast} />
    ),
    {
      style: { background: "transparent", boxShadow: "none", padding: 0 },
      ...options,
    }
  );
};

export const AppToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ zIndex: 999999 }}
      toastClassName={() =>
        "relative flex p-0 mb-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-none"
      }
    />
  );
};
