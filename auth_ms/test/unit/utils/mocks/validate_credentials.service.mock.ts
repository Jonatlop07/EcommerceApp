const ValidateCredentialsServiceMock = jest.fn().mockReturnValue({
  execute: jest.fn().mockResolvedValue({
    are_credentials_valid: true
  })
});

export default ValidateCredentialsServiceMock;
