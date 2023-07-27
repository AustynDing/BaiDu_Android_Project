import { Skeleton } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// num:元素个数 columns 计算每一行要展示的Skeleton元素数量
export const SkeletonPage = (props: { num: number, columns: number }) => {
  const { num, columns } = props
  // 创建一个假数据数组，用于在FlatList中展示Skeleton元素
  const data = Array.from({ length: num });

  // 渲染每一行Skeleton元素的函数
  const SkeletonRow = ({ rowItems }: { rowItems: number[] }) => {
    return (
      <View style={styles.skeletonRow}>
        {rowItems.map((value, index) => (
          <View key={`skeleton-${index}` + JSON.stringify(value)} style={styles.skeletonItem}>
            <Skeleton animation="wave" height={60} circle={index % 2 === 0 ? false : true} />
          </View>
        ))}
      </View>
    );
  };

  const rowsData = React.useMemo(() => {
    const rows = Math.ceil(data.length / columns);
    return Array.from({ length: rows }).map((_, rowIndex) =>
      data.slice(rowIndex * columns, (rowIndex + 1) * columns)
    );
  }, [num, columns])
  // 使用 _（下划线）是一种常见的编程惯例，通常用于表示某个参数或变量是一个占位符
  return (
    <View style={styles.container}>
      {rowsData.map((rowItems, rowIndex) => (
        <SkeletonRow key={`skeleton-row-${rowIndex}`} rowItems={rowItems as number[]} />
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  skeletonItem: {
    flex: 1,
    margin: 5,
  },
})

export default SkeletonPage
