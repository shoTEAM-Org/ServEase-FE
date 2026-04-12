// src/components/cards/FileUploadCard.tsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { colors, spacing, borderRadius } from '../../theme';

interface FileUploadCardProps {
  title: string;
  onFileSelect: (file: File) => void;
  acceptedFormats?: string;
  maxSize?: number; // in MB
  selectedFile?: File | null;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  onFileSelect,
  acceptedFormats = '.png,.jpg,.jpeg,.pdf',
  maxSize = 5,
  selectedFile,
}) => {
  return (
    <div className="w-full mb-6">
      <label className="block font-semibold mb-4 text-gray-800">{title}</label>
      <div
        className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50"
        style={{
          borderColor: colors.primary,
          borderRadius: borderRadius.lg,
          backgroundColor: '#f9fafb',
        }}
      >
        <label className="flex flex-col items-center justify-center cursor-pointer w-full">
          <Upload size={32} color={colors.primary} className="mb-2" />
          <span className="font-semibold text-gray-800">Click to upload or drag and drop</span>
          <span className="text-sm text-gray-500">PNG, JPG, PDF (Max {maxSize}MB)</span>
          <input
            type="file"
            onChange={(e) => e.target.files && onFileSelect(e.target.files[0])}
            className="hidden"
            accept={acceptedFormats}
          />
        </label>
      </div>
      {selectedFile && (
        <p className="mt-3 text-center text-gray-700 text-sm">
          File: {selectedFile.name}
        </p>
      )}
    </div>
  );
};
