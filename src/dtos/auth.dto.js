const { IsEmail, IsString, MinLength, IsNotEmpty, Matches } = require('class-validator');

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password;

  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  phoneNumber;
}

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  password;
}

class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken;
}

class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  newPassword;
}

class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  newPassword;
}

class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email;
}

class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  token;
}

module.exports = {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  ResetPasswordDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  VerifyEmailDto,
};
