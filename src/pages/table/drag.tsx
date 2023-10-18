import React, { useState } from 'react';
import { Table } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table';
import { $splice } from 'immot';

const DragHandle = SortableHandle(() => {
  return <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />;
});
const SortableItem = SortableElement((props: React.AllHTMLAttributes<HTMLElement>) => (
  <tr {...props} />
));
const SortableContainers = SortableContainer((props: React.AllHTMLAttributes<HTMLElement>) => {
  return <tbody {...props} />;
});

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
  index: number;
}

const columns: ColumnsType<DataItem> = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => {
      return <DragHandle />;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

export function Component() {
  const [dataSource, setDataSource] = useState<DataItem[]>(data);
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (oldIndex !== newIndex) {
      setDataSource($splice($splice(dataSource, oldIndex, 1), newIndex, 0, dataSource[oldIndex]));
    }
  };

  const DraggableContainer = (props: React.AllHTMLAttributes<any>) => {
    return (
      <SortableContainers
        useDragHandle
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    );
  };

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
}
