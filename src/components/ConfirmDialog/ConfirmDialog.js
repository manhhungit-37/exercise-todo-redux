import React from 'react';
import { Modal } from 'antd';

const ConfirmDialog = ({ children, isModalVisible, handleOk, handleCancel }) => {

  return (
    <Modal title="Confirm?" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {children || 'Selected user will be permanently deleted.'}
      <br /><br />
      <strong>Caution:</strong> This cannot be undone.
    </Modal>
  );
};

export default ConfirmDialog;