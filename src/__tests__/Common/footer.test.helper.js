import { footerMenu,socialLink } from "../../Common/Footer/footer.helper";
import Path from "../../Routing/Constant/RoutePaths";
import { Facebook, Telegram, Twitter, Watsapp } from "../../assets/StoreAsset/StoreAsset";

describe('footer.helper', () => {
  test('socialLink contains the correct social media icons', () => {
    expect(socialLink).toEqual([
      { label: <Facebook /> },
      { label: <Twitter /> },
      { label: <Telegram /> },
      { label: <Watsapp /> }
    ]);
  });

  test('footerMenu contains the correct menu items', () => {
    expect(footerMenu).toEqual([
      { label: 'About Us', to: Path.ABOUT },
      // { label: "Contact Us", to: Path?.CONTACTUS },
    ]);
  });

  test('footerMenu has correct label and route path', () => {
    expect(footerMenu).toHaveLength(1); // Adjust based on the actual length of the menu
    expect(footerMenu[0]).toEqual({
      label: 'About Us',
      to: Path.ABOUT
    });
  });
});
