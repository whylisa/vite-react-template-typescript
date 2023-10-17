import React, { useState } from 'react';
import { Table } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
// import { arrayMoveImmutable } from "array-move";
import type { ColumnsType } from 'antd/lib/table';

const DragHandle = SortableHandle(() => {
  return <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />;
});
const SortableItem = SortableElement((props: React.AllHTMLAttributes<any>) => <tr {...props} />);
const SortableContainers = SortableContainer((props: React.AllHTMLAttributes<any>) => {
  return <tbody {...props} />;
});
const columns: ColumnsType<any> = [
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

const TableDrag: React.FC = () => {
  const [dataSource, setDataSource] = useState<any>(data);
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (oldIndex !== newIndex) {
      // const newData = arrayMoveImmutable(
      //   [].concat(dataSource),
      //   oldIndex,
      //   newIndex
      // ).filter((el) => !!el);
      // setDataSource(newData);
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
    const index = dataSource.findIndex((x: any) => x.index === restProps['data-row-key']);
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
};
export default TableDrag;
