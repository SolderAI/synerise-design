import * as React from 'react';
import random from 'lodash/random';
import { boolean, text, select, number, array } from '@storybook/addon-knobs';

import FileUploader from '@synerise/ds-file-uploader';
import AvatarUploader from '@synerise/ds-file-uploader/dist/AvatarUploader/AvatarUploader';

const getDefaultProps = () => ({
  label: text('Label', 'Label'),
  description: text('Description', 'Description'),
  tooltip: text('Informational tooltip text', 'Test Tooltip'),
  removeTooltip: text('Remove tooltip', 'Clear'),
  retryTooltip: text('Retry tooltip', 'Retry'),
  retry: boolean ('Set retry button', false),
  retryLabel: 'Retry',
  buttonLabel: text('Button label', 'Upload a new file or drop one here'),
  buttonDescription: text('Button description', 'Drag and drop your files here, or browses'),
  size: text('Preview size label', 'Size:'),
  okText: 'Yes',
  cancelText: 'No',
  removeConfirmTitle: 'Are you sure to remove this file ?',
  fileWeight: '1.3MB/2.3MB',
  percent: '60',
  disabled: boolean('Disabled', false),
  mode: select(
    'Mode',
    {
      single: 'single',
      'multi-medium': 'multi-medium',
      'multi-large': 'multi-large',
    },
    'single'
  ),
  filesAmount: number('Uploading files amount', 1),
  removable: boolean('Allow to remove uploaded files', true),
  error: text('Error message', undefined),
  accept: array('Accepted mime types (comma separated)', ['image/png, image/svg+xml, text/plain, image/jpeg, text/html,video/quicktime, application/pdf, application/zip, audio/mpeg, application/vnd.ms-excel']),
  testFileError: boolean('Display preview error example', false),
  testFileDisable: boolean('Display disabled preview example', false),
  testFileProgress: boolean('Display upload progress bar example', false),
  testFileSuccess: boolean('Display upload success example', false),
});

const getAvatarUploaderProps = () => ({
  description: text('Description', 'Maximum file size is 1MB, resolution 512x512px, \n' +
    'acceptable format png, jpg, gif.'),
  removeTooltip: text('Remove tooltip', 'Clear'),
  retryTooltip: text('Retry tooltip', 'Retry'),
  disabled: boolean('Disabled', false),
  mode: 'single',
  filesAmount: 1,
  removable: boolean('Allow to remove uploaded files', true),
  accept: array('Accepted mime types (comma separated)', ['image/png, image/svg+xml, text/plain, image/jpeg']),
  testFileError: boolean('Display preview error example', false),
  testFileDisable: boolean('Display disabled preview example', false),
  testFileUploading: boolean('Display upload progress bar example', false),
});

const stories = {
  Uploader: () => {
    const [files, setFiles] = React.useState([]);
    const {
      testFileError,
      testFileProgress,
      testFileDisable,
      testFileSuccess,
      okText,
      cancelText,
      removeConfirmTitle,
      fileWeight,
      percent,
      buttonLabel,
      retryLabel,
      buttonDescription,
      size,
      removeTooltip,
      ...rest
    } = getDefaultProps();

    const texts = {
      buttonLabel,
      buttonDescription,
      size,
      okText,
      cancelText,
      fileWeight,
      percent,
      removeConfirmTitle,
      removeTooltip,
      retryLabel,
    };

    const getFiles = () => {
      if (testFileError) {
        return files.map(f => ({ ...f, error: 'Error notification' }));
      }

      if (testFileDisable) {
        return files.map(f => ({ ...f, disabled: true }));
      }

      if (testFileProgress) {
        return files.map(f => ({ ...f, progress: random(0, 100) }));
      }
      if (testFileSuccess) {
        return files.map(f => ({ ...f, success: true }));
      }
      return files;
    };

    return (
      <div style={{ margin: 24, width: 540, padding: 24, backgroundColor: 'white' }}>
        <FileUploader
          {...rest}
          files={getFiles()}
          texts={texts}
          onUpload={newFiles => {
            setFiles([...files, ...newFiles.map((file, index) => ({ file }))]);
          }}
          onRemove={(rf, rfi) => setFiles(files.filter((f, i) => i !== rfi))}
        />
      </div>
    );
  },
  AvatarUploader: () => {
    const [files, setFiles] = React.useState([]);
    const {
      testFileError,
      testFileUploading,
      testFileDisable,
      removeTooltip,
      retryTooltip,
      ...rest
    } = getAvatarUploaderProps();

    const texts1 = {
      removeTooltip,
      retryTooltip,
    };

    const getFiles = () => {
      if (testFileError) {
        return files.map(f => ({ ...f, error: 'Error notification' }));
      }

      if (testFileDisable) {
        return files.map(f => ({ ...f, disabled: true }));
      }

      if (testFileUploading) {
        return files.map(f => ({ ...f, progress: random(0, 100) }));
      }
      return files;
    };

    return (
      <div style={{ margin: 24, width: 450, padding: 24, backgroundColor: 'white' }}>
        <AvatarUploader
          {...rest}
          files={getFiles()}
          texts={texts1}
          onUpload={newFiles => {
            setFiles([...files, ...newFiles.map((file, index) => ({ file }))]);
          }}
          onRemove={(rf, rfi) => setFiles(files.filter((f, i) => i !== rfi))}
        />
      </div>
    );
  },
};

export default {
  name: 'Components/Uploader',
  stories,
  Component: FileUploader,
};
