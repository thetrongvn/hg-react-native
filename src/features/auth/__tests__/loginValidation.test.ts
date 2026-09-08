import {loginValidationSchema} from '../loginSchema';

describe('loginValidationSchema', () => {
  it('rejects an invalid email', async () => {
    await expect(
      loginValidationSchema.validate({
        email: 'not-an-email',
        password: '123456',
      }),
    ).rejects.toThrow();
  });

  it('rejects a short password', async () => {
    await expect(
      loginValidationSchema.validate({
        email: 'user@example.com',
        password: '12',
      }),
    ).rejects.toThrow();
  });

  it('accepts a valid payload', async () => {
    await expect(
      loginValidationSchema.validate({
        email: 'user@example.com',
        password: '123',
      }),
    ).resolves.toEqual({
      email: 'user@example.com',
      password: '123',
    });
  });
});
