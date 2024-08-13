// useClearSearchOnHome.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import React from 'react'
import { Context } from "../../Pages/ContextProvider/ContextProvider";
import useClearSearchOnHome from "../../Hooks/useClearSearchOnHome";
import Path from "../../Routing/Constant/RoutePaths";

 
describe('useClearSearchOnHome', () => {
  let setSearch;

  beforeEach(() => {
    setSearch = jest.fn();
  });

  const wrapper = ({ children }) => (
    <Context.Provider value={{ searched: 'test', setSearch }}>
      {children}
    </Context.Provider>
  );

  it('should clear search when pathname is HOME', () => {
    const { result } = renderHook(() => useClearSearchOnHome({ pathname: Path.HOME }), { wrapper });

    // Trigger effect
    act(() => {
      result.current;
    });

    expect(setSearch).toHaveBeenCalledWith('');
  });

  it('should not clear search when pathname is not HOME', () => {
    const { result } = renderHook(() => useClearSearchOnHome({ pathname: '/other' }), { wrapper });

    // Trigger effect
    act(() => {
      result.current;
    });

    expect(setSearch).not.toHaveBeenCalled();
  });

  it('should not clear search if searched is empty', () => {
    const wrapperEmptySearch = ({ children }) => (
      <Context.Provider value={{ searched: '', setSearch }}>
        {children}
      </Context.Provider>
    );

    const { result } = renderHook(() => useClearSearchOnHome({ pathname: Path.HOME }), { wrapper: wrapperEmptySearch });

    // Trigger effect
    act(() => {
      result.current;
    });

    expect(setSearch).not.toHaveBeenCalled();
  });
});
