const SignUpServiceMock = jest.fn().mockReturnValue({
  execute: jest.fn().mockResolvedValue({})
});

export default SignUpServiceMock;
