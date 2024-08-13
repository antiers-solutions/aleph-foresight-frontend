import { renderHook } from '@testing-library/react-hooks';
import { useTablePagination } from '../../Hooks/useTablePagination';


describe('useTablePagination', () => {
  it('should initialize table params correctly', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useTablePagination(mockFn));

    expect(result.current.tableParams).toEqual({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
  });

  it('should handle table change correctly', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useTablePagination(mockFn));

    const newPagination = { current: 2, pageSize: 20 };
    result.current.handleTableChange(newPagination);

    expect(result.current.tableParams.pagination).toEqual(newPagination);
    expect(mockFn).toHaveBeenCalledWith({ limit: 20, page: 2 });
  });

  it('should set total items correctly', () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useTablePagination(mockFn));

    const totalItems = 100;
    result.current.setParams(totalItems);

    expect(result.current.tableParams.pagination.total).toBe(totalItems);
  });
});
