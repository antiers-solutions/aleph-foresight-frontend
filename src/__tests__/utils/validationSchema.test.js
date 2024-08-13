import {
  profile,
  raiseDisput,
  bet,
  creatMarket,
} from "../../utils/validationSchema";
import * as Yup from 'yup';

describe('profile validation schema', () => {
  it('should validate a valid profile', async () => {
    const validProfile = {
      userName: 'JOHNDOE',
      img: 'http://example.com/image.jpg',
      chainId: '1234',
    };
    
    await expect(profile.validationSchema.validate(validProfile)).resolves.toBe(validProfile);
  });

  it('should fail validation for invalid username', async () => {
    const invalidProfile = {
      userName: 'Jo',
      img: 'http://example.com/image.jpg',
      chainId: '1234',
    };
    
    await expect(profile.validationSchema.validate(invalidProfile)).rejects.toThrowError(Yup.ValidationError);
  });

  it('should transform username to uppercase', async () => {
    const profileData = {
      userName: 'JohnDoe',
      img: 'http://example.com/image.jpg',
      chainId: '1234',
    };

    const validatedProfile = await profile.validationSchema.validate(profileData);
    expect(validatedProfile.userName).toBe('JOHNDOE');
  });
});
 
describe('createMarket validation schema', () => {
  it('should validate a valid market creation', async () => {
    const validMarket = {
      coin: 'BTC',
      priceLevel: 0.5,
      targetDate: new Date(),
      eventDurationDays: 30,
      eventDurationHours: 6,
      closureTime: new Date(),
    };
    
    await expect(creatMarket.validationSchema().validate(validMarket)).resolves.toBe(validMarket);
  });

  it('should fail validation for missing required fields', async () => {
    const invalidMarket = {
      coin: '',
      priceLevel: 0.05,
      targetDate: '',
      eventDurationDays: 400,
      eventDurationHours: 25,
      closureTime: '',
    };
    
    await expect(creatMarket.validationSchema().validate(invalidMarket)).rejects.toThrowError(Yup.ValidationError);
  });
}); 

describe('raiseDisput validation schema', () => {
  it('should validate a valid dispute', async () => {
    const validDispute = {
      email: 'test@example.com',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      img: ['image1.jpg'],
      category: 'category1',
      event: 'event1',
    };
    
    await expect(raiseDisput.validationSchema.validate(validDispute)).resolves.toBe(validDispute);
  });

  it('should fail validation for invalid email', async () => {
    const invalidDispute = {
      email: 'invalid-email',
      description: 'Short',
      img: [],
      category: '',
      event: '',
    };
    
    await expect(raiseDisput.validationSchema.validate(invalidDispute)).rejects.toThrowError(Yup.ValidationError);
  });
}); 

describe('bet validation schema', () => {
  it('should validate a valid bet', async () => {
    const validBet = {
      amount: 10,
      betOn: 'Yes',
    };
    
    const walletBalance = 50;
    await expect(bet.validationSchema(walletBalance).validate(validBet)).resolves.toBe(validBet);
  });

  it('should fail validation for insufficient balance', async () => {
    const invalidBet = {
      amount: 60,
      betOn: 'No',
    };
    
    const walletBalance = 50;
    await expect(bet.validationSchema(walletBalance).validate(invalidBet)).rejects.toThrowError(Yup.ValidationError);
  });
});
