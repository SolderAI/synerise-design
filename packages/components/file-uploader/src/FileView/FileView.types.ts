import * as React from 'react';
import { ExtendedFile } from '../FileUploader.types';

export interface FileViewTexts {
  size: string | React.ReactNode;
  cancelText: string | React.ReactNode;
  removeTooltip?: string | React.ReactNode;
  okText: string | React.ReactNode;
  removeConfirmTitle: string | React.ReactNode;
  fileWeight: string | React.ReactNode;
  percent: number;
}

export interface FileViewProps {
  data: ExtendedFile;
  texts: FileViewTexts;
  removable?: boolean;
  onRemove?: () => void;
}