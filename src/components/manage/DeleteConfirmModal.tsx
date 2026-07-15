"use client";

import React, { useState } from "react";

interface DeleteConfirmModalProps {
  itemId: string;
  itemTitle: string;
  onClose: () => void;
  onDeleteSuccess: (id: string) => void;
}

export default function DeleteConfirmModal({
  itemId,
  itemTitle,
  onClose,
  onDeleteSuccess,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage("");

    try {
      // ⚠️ FIX: You must explicitly target port 8000, just like your GET fetch does!
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Handle cases where the server returns an error status code
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete the asset.");
      }

      // If successful, invoke the parent clean-up state function
      onDeleteSuccess(itemId);
    } catch (err: any) {
      console.error("Error executing delete pipeline:", err);
      setErrorMessage(err.message || "An unexpected network error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-neutral-200 animate-scale-up">
        <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-neutral-900">
          Delete Asset?
        </h3>
        <p className="text-neutral-500 text-sm mt-2 font-['Inter'] leading-relaxed">
          Are you sure you want to permanently delete{" "}
          <strong>{itemTitle}</strong>? This action cannot be undone.
        </p>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 h-11 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-5 h-11 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 active:scale-98 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
