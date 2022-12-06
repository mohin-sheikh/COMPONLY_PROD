# API Reference

The API is versioned. This is done via a `.env` file in the repo.

Postman JSON link: <https://api.postman.com/collections/18974135-2f4cc985-6d8e-48b8-a484-17d1f9a66816?access_key=PMAT-01GJ84HX8KRN8XKSWYA5G9WXQA>
The postman collection is available in the contrib folder as well.

Set these env variables in Postman

````
Every response from the API would be valid JSON that would have the structure

```json
{
  "status": 400,
  "message": "A success or error message",
  "response": {}
}
````

The HTTP status code would signify if it's an error or success.

A Postman JSON collection of the routes can be fetched from
[this link](https://api.postman.com/collections/18974135-2f4cc985-6d8e-48b8-a484-17d1f9a66816?access_key=PMAT-01GJ84HX8KRN8XKSWYA5G9WXQA).
It makes use of environment variable. Please set the following before
using the collection.

```
{{baseUrl}} - http://localhost:3000
{{token}} - jwt token
```

API endpoints that need authentication are labelled with [auth]. These require
authorization bearer tokens to be passed. An example is

```
Authorization=Bearer  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjeXB8Y2JmNmRlMDktNDAzNS00MjU1LTgwYjYtOTc0Njg4ZmUzMTg1IiwiYXVkIjoiaHR0cHM6Ly9jeXAtcG9ydGFsLmNvbSIsImlhdCI6MTYzODc3MDYzNiwiZXhwIjoxNjM4ODU3MDM2fQ.pPGY5o-tRxCoMlzE7MRacQKk7-wnbE6e8wyOMcEUnwOYy3AktHrbXaCuLq5fZTTl2Pfv2FmvgexWAopS7g5FwSPaybkns5ep_qt6zzEPO0tm0zSp6BJ_Qa13oAfMC7Lu5UjF1yS3cq3aNVRBhyPHJ2Bu46rCYzSjcINO8HrX0p8wTICQ1lS-RldVw4gzgWace3uzINOJDeMqSE4C8xZNUAeKygnq69ngVfGKktXhPuuqlTc8lbYxDxIDa8Axgi5ZP7hZZUQa20ZZJ0sG2j5ci_8pkJbb7mlelxioyVVlo1-ffCy84GIVxbTVuTz7h9MJK5p4PxABN3onLSpMgXuoBTfinNwK5gqLWDMUV7_bgX-uWuKpzllYIxhUJiaFipaoNDHu2jg1mqeMWTsrkt1mtsQJvTEgN5KnYR6Az4wKDojs6t7KIB0yNY4dW6Lf2e5tAKUZz6JtD2mLO7lOGEVJH3gl9niz70o5ANIPDpMRZ1Qt00kZbqcog1saU72Yc65ixvZF1REa3k_WNQ7nw2MCYawY9GeJoJQvUbnW8tSnzQ3G0_p9rWqjwUd0_t1-KRRUBI8P8Ak-MGSpxOWOQavmbnsFd-pIQ7POqebjRjYHuSZRDiPOtWE4IcN0JqeffdpL4FURHNsmk7Ns2Axpi2V8CuI-KkCw_lh87VfgZm_HYko
```

# _API Index_

- [01. User Register](#01-user-register)
- [02. Login](#02-login)
- [03. Forgot password](#03-forgot-password)
- [04. Verify forgot password](#04-verify-forgot-password)
- [05. User profile [auth]](#05-user-profile-auth)
- [06. Patch user profile [auth]](#06-patch-user-profile-auth)
- [07. Change password [auth]](#07-change-password-auth)

# _API End Point_

**Route**: `http://localhost:3000`

**Swagger Doc**: `http://localhost:3000/api`

# _Postman Collection_

~ _**<https://api.postman.com/collections/18974135-2f4cc985-6d8e-48b8-a484-17d1f9a66816?access_key=PMAT-01GJ84HX8KRN8XKSWYA5G9WXQA>**_

(**Note** : _**Set this Environments Variable to your postman**_)

**url** => `http://localhost:3000`

**token** => `"...Your Token"`

# _API Reference_

## 01. User Register

**Route:**
`/auth/register`

**Method:**
`POST`

**Request payload:**

```json
{
    "first_name": "jagdish",
    "last_name": "jadeja",
    "email": "jagdish@testmail.io",
    "password": "user123",
    "confirmPass": "user123",
    "company_id": "1",
    "invitation_id": "1"
}
```

- All fields are required.
- In `email` valid endpoint for registration is ``'com', 'net', 'in', 'io'``.

⚠️ `email` and `alternate_email` are should not be same, or it will give following response

```json
{
  "status": 400,
  "message": "Alternate email should not be same with email address.",
  "response": {}
}
```

⚠️ `password` and `confirmPass` are should be same otherwise api provide following response

```json
{
  "status": 400,
  "message": "Validation failed - confirmPass must be ref:password",
  "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 201,
    "message": "User Registered Successfully",
    "response": {
        "id": 1,
        "name": "jagdish",
        "email": "jagdish@testmail.io",
    }
}
```

## 02. Login

**Route:**
`/auth/login`

**Method:**
`POST`

**Request payload:**

```json
{
    "email": "jagdish@testmail.io",
    "password": "user123"
}
```

- `identifier` and `password` are all required.
- A user must be active for login.

⚠️ If user not exist with provided email

```json
{
    "status": 404,
    "error": "User Not Found",
    "response": {}
}
```

⚠️ User provided password is wrong

```json
{
    "status": 400,
    "message": "Password not match",
    "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 200,
    "message": "Login successfully.",
    "response": {
        "token": "eyJhbGciOiJIUz....7oStxPazA"
    }
}
```

## 03. Forgot password

This endpoint sends a 4-digit code to an email, which can be
used to reset a user's password.

**Route:**
`/auth/forgot-password`

**Method:**
`PUT`

**Request payload:**

```json
{
    "email" : "jagdish@testmail.io"
}
```

- `email` is required.
- The api would send a verification code to the provided email.

⚠️ If user not exist with provided email

```json
{
    "status": 404,
    "error": "User Not Found",
    "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 200,
    "message": "Instructions to reset password has been sent to jagdish@testmail.io",
    "response": {}
}
```

## 04. Verify forgot password

This endpoint sets the new password after verifying a reset/forgot password request
from the user.

**Route:**
`/auth/forgot-password/verify`

**Method:**
`PUT`

**Request payload:**

```json
{
    "email" : "jagdish@testmail.io",
    "otp": "3616",
    "newPassword" : "jagdish123",
    "confirmPassword" : "jagdish123"
}
```

- `email`, `password` and `code` are all required.

⚠️ If user not exist with provided email

```json
{
    "status": 404,
    "error": "User Not Found",
    "response": {}
}
```

⚠️ When OTP expired

```json
{
    "status": 400,
    "error": "The confirmation code has expired. Please request a new code.",
    "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 200,
    "message": "Password has been successfully reset for jagdish@testmail.io",
    "response": {}
}
```

## 05. User profile [auth]

**Route:**
`/users?id=1`

**Method:**
`GET`

**Request payload:** - `Query`

- id = 1 (required)

⚠️ If user not exist with provided email

```json
{
    "status": 404,
    "error": "User Not Found",
    "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 200,
    "message": "Fetched Successfully",
    "response": {
        "id": 1,
        "name": "jagdish jadeja",
        "email": "jagdish@testmail.io",
        "alternate_email": "test@componly.in",
        "profile": null
    }
}
```

## 06. Patch user profile [auth]

This endpoint is used to get update profile info for a user.

**Route:**
`/users/modify`

**Method:**
`PATCH`

Look in [update.dto.ts](./src/users/dto/update.dto.ts) for the fields that can
be passed in the body payload.

⚠️ `email` and `alternate_email` are should not be same, or it will give following response

```json
{
  "status": 400,
  "message": "Alternate email should not be same with email address.",
  "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 202,
    "message": "Record has been updated Successfully",
    "response": {}
}
```

## 07. Change password [auth]

Updates current password for user. After updating the password, it clears all active sessions.

**Route:**
`/users/reset-password`

**Method:**
`PUT`

**Request payload:**

```json
{
    "currentPass" : "user1234",
    "newPass" : "user123",
    "confirmPass" : "user123"
}
```

⚠️ if password is wrong

```json
{
    "status": 400,
    "message": "Password is wrong.",
    "response": {}
}
```

⚠️ `password` and `confirmPass` are should be same otherwise api provide following response

```json
{
  "status": 400,
  "message": "Validation failed - confirmPass must be ref:password",
  "response": {}
}
```

⚠️ When user try to enter the same password

```json
{
    "status": 400,
    "message": "Password already in use, Please try different Password",
    "response": {}
}
```

**✅ Sample response:**

```json
{
    "status": 200,
    "message": "Password has been successfully updated.",
    "response": {}
}
```
