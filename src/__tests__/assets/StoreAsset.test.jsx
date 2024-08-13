import React from 'react';
import { render } from '@testing-library/react';
import { CollapseIcon, SearchIcon, Home, Marketplace, Activity, Wallet, RightIcon, LogoutIcon, WalletIcon,
     BackIcon, LinkIcon, BTCIcon, UploadIcon, InfoIcon, 
     InfoRedIcon, SmallBtc, Bitcoin, BitcoinIcon, Ethereum,
      Tether, TetherIcon, Binance, BinanceIcon, Solana, SolanaIcon, TRON, Avalanche, AvalancheIcon, Toncoin, ToncoinIcon, YesIcon, NoIcon, Facebook, Twitter, Telegram, Watsapp, DownArrow, CopyIcon, NetPosition, Volumetraded, Eventstraded, Qustion, Successful, EditIcon, Camera, Diversity, GroupUser, AutoTransmision, BatchPrediction, MinusBlack, PlusWhite, CrossIcon } from '../../assets/StoreAsset/StoreAsset';

describe('CollapseIcon component', () => {
    test('renders CollapseIcon component', () => {
        const { container } = render(<CollapseIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<CollapseIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<CollapseIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('SearchIcon component', () => {
    test('renders SearchIcon component', () => {
        const { container } = render(<SearchIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<SearchIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<SearchIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Home component', () => {
    test('renders Home component', () => {
        const { container } = render(<Home />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Home />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Home />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Marketplace component', () => {
    test('renders Marketplace component', () => {
        const { container } = render(<Marketplace />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Marketplace />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Marketplace />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Activity component', () => {
    test('renders Activity component', () => {
        const { container } = render(<Activity />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Activity />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Activity />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Wallet component', () => {
    test('renders Wallet component', () => {
        const { container } = render(<Wallet />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Wallet />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Wallet />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('RightIcon component', () => {
    test('renders RightIcon component', () => {
        const { container } = render(<RightIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<RightIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<RightIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('LogoutIcon component', () => {
    test('renders LogoutIcon component', () => {
        const { container } = render(<LogoutIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<LogoutIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<LogoutIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('WalletIcon component', () => {
    test('renders WalletIcon component', () => {
        const { container } = render(<WalletIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<WalletIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<WalletIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
}) 
describe('BackIcon component', () => {
    test('renders BackIcon component', () => {
        const { container } = render(<BackIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<BackIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<BackIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('LinkIcon component', () => {
    test('renders LinkIcon component', () => {
        const { container } = render(<LinkIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<LinkIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<LinkIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('BTCIcon component', () => {
    test('renders BTCIcon component', () => {
        const { container } = render(<BTCIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<BTCIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<BTCIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('UploadIcon component', () => {
    test('renders UploadIcon component', () => {
        const { container } = render(<UploadIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<UploadIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<UploadIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('InfoIcon component', () => {
    test('renders InfoIcon component', () => {
        const { container } = render(<InfoIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<InfoIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<InfoIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('InfoRedIcon component', () => {
    test('renders InfoRedIcon component', () => {
        const { container } = render(<InfoRedIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<InfoRedIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<InfoRedIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('SmallBtc component', () => {
    test('renders SmallBtc component', () => {
        const { container } = render(<SmallBtc />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<SmallBtc />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<SmallBtc />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Bitcoin component', () => {
    test('renders Bitcoin component', () => {
        const { container } = render(<Bitcoin />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Bitcoin />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Bitcoin />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('BitcoinIcon component', () => {
    test('renders BitcoinIcon component', () => {
        const { container } = render(<BitcoinIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<BitcoinIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<BitcoinIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Ethereum component', () => {
    test('renders Ethereum component', () => {
        const { container } = render(<Ethereum />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Ethereum />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Ethereum />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Tether component', () => {
    test('renders Tether component', () => {
        const { container } = render(<Tether />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Tether />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Tether />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('TetherIcon component', () => {
    test('renders TetherIcon component', () => {
        const { container } = render(<TetherIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<TetherIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<TetherIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Binance component', () => {
    test('renders Binance component', () => {
        const { container } = render(<Binance />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Binance />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Binance />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('BinanceIcon component', () => {
    test('renders BinanceIcon component', () => {
        const { container } = render(<BinanceIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<BinanceIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<BinanceIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Solana component', () => {
    test('renders Solana component', () => {
        const { container } = render(<Solana />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Solana />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Solana />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('SolanaIcon component', () => {
    test('renders SolanaIcon component', () => {
        const { container } = render(<SolanaIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<SolanaIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<SolanaIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})

describe('TRON component', () => {
    test('renders TRON component', () => {
        const { container } = render(<TRON />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<TRON />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<TRON />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})

describe('Avalanche component', () => {
    test('renders Avalanche component', () => {
        const { container } = render(<Avalanche />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Avalanche />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Avalanche />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('AvalancheIcon component', () => {
    test('renders AvalancheIcon component', () => {
        const { container } = render(<AvalancheIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<AvalancheIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<AvalancheIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})

describe('Toncoin component', () => {
    test('renders Toncoin component', () => {
        const { container } = render(<Toncoin />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Toncoin />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Toncoin />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})

describe('ToncoinIcon component', () => {
    test('renders ToncoinIcon component', () => {
        const { container } = render(<ToncoinIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<ToncoinIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<ToncoinIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})

describe('YesIcon component', () => {
    test('renders YesIcon component', () => {
        const { container } = render(<YesIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<YesIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<YesIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('NoIcon component', () => {
    test('renders NoIcon component', () => {
        const { container } = render(<NoIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<NoIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<NoIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})

describe('Twitter component', () => {
    test('renders Twitter component', () => {
        const { container } = render(<Twitter />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Twitter />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Twitter />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Telegram component', () => {
    test('renders Telegram component', () => {
        const { container } = render(<Telegram />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Telegram />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Telegram />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Watsapp component', () => {
    test('renders Watsapp component', () => {
        const { container } = render(<Watsapp />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Watsapp />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Watsapp />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('DownArrow component', () => {
    test('renders DownArrow component', () => {
        const { container } = render(<DownArrow/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<DownArrow />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<DownArrow />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('CopyIcon component', () => {
    test('renders CopyIcon component', () => {
        const { container } = render(<CopyIcon/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<CopyIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<CopyIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('NetPosition component', () => {
    test('renders NetPosition component', () => {
        const { container } = render(<NetPosition/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<NetPosition />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<NetPosition />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Volumetraded component', () => {
    test('renders Volumetraded component', () => {
        const { container } = render(<Volumetraded/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Volumetraded />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Volumetraded />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Eventstraded component', () => {
    test('renders Eventstraded component', () => {
        const { container } = render(<Eventstraded/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Eventstraded />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Eventstraded />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Successful component', () => {
    test('renders Successful component', () => {
        const { container } = render(<Successful/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Successful />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Successful />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('EditIcon component', () => {
    test('renders EditIcon component', () => {
        const { container } = render(<EditIcon/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<EditIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<EditIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Camera component', () => {
    test('renders Camera component', () => {
        const { container } = render(<Camera/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Camera />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Camera />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('Diversity component', () => {
    test('renders Diversity component', () => {
        const { container } = render(<Diversity/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<Diversity />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<Diversity />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('GroupUser component', () => {
    test('renders GroupUser component', () => {
        const { container } = render(<GroupUser/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<GroupUser />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<GroupUser />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('AutoTransmision component', () => {
    test('renders AutoTransmision component', () => {
        const { container } = render(<AutoTransmision/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<AutoTransmision />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<AutoTransmision />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('BatchPrediction component', () => {
    test('renders BatchPrediction component', () => {
        const { container } = render(<BatchPrediction/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<BatchPrediction />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<BatchPrediction />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('MinusBlack component', () => {
    test('renders MinusBlack component', () => {
        const { container } = render(<MinusBlack/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<MinusBlack />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<MinusBlack />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('PlusWhite component', () => {
    test('renders PlusWhite component', () => {
        const { container } = render(<PlusWhite/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<PlusWhite />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<PlusWhite />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
describe('CrossIcon component', () => {
    test('renders CrossIcon component', () => {
        const { container } = render(<CrossIcon/>);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    test('renders svg with correct width and height attributes', () => {
        const { container } = render(<CrossIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toHaveAttribute('width');
        expect(svgElement).toHaveAttribute('height');
    });

    test('renders path element within svg', () => {
        const { container } = render(<CrossIcon />);
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
})
