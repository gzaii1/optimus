import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal;

export function showConfirm(fileName, onOk) {
  confirm({
    title: <span>Do you Want to delete the file named <b>{ fileName }</b></span>,
    icon:  <ExclamationCircleOutlined />,
    content: 'Note that this operation is irreversible',
    onOk,
    onCancel() {
      console.log('Cancel');
    },
  });
}

export function showPromiseConfirm(icon) {
  confirm({
    title: 'Do you want to delete these items?',
    icon,
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

export function  showDeleteConfirm(icon) {
  confirm({
    title: 'Are you sure delete this task?',
    icon,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export function  showPropsConfirm(icon) {
  confirm({
    title: 'Are you sure delete this task?',
    icon,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true,
    },
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
