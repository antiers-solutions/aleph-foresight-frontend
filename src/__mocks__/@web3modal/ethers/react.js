module.exports = {
  useDisconnect: jest.fn().mockReturnValue({
    disconnect: jest.fn(),
  }),
  useWeb3Modal: jest.fn().mockReturnValue({
    open: jest.fn(),
    close: jest.fn(),
  }),
  useWeb3ModalAccount: jest.fn().mockReturnValue({
    address: "766326573257",
    chainID: "hde736gh657",
    isConnected: false,
  }),
  useWeb3ModalEvents: jest.fn().mockReturnValue({
    data: {
      type: "",
      event: "",
    },
  }),
  useWeb3ModalProvider: jest.fn().mockReturnValue({
    walletProvider: jest.fn(),
  }),
  defaultConfig: jest.fn(),
  createWeb3Modal: jest.fn().mockReturnValue({}),
};
