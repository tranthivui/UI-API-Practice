# 1. SIGNUP
- email: lưu trong .env
- password: lưu trong .env
- display name: lưu trong .env
# 2. Login
- Sau khi login hiển thị: Logged in as autoplaywright
- Đăng nhập fail hiển thị thông báo lỗi: Your email or password is incorrect!

# 3. API list
## 3.1 API 7: POST To Verify Login with valid details
- Method: POST
- URL: https://automationexercise.com/api/verifyLogin
- Param：email, password
- Form: x-www-form-urlencoded
- HTTP status: 200
- Response
{"responseCode": 200, "message": "User exists!"}

## 3.2 API 8: POST To Verify Login without email parameter
- Method: POST
- URL: https://automationexercise.com/api/verifyLogin
- Param：password
- Form: x-www-form-urlencoded
- HTTP status: 200
- Response
{"responseCode": 400, "message": "Bad request, email or password parameter is missing in POST request."}

## 3.3 API 9: DELETE To Verify Login
- Method: DELETE
- URL: https://automationexercise.com/api/verifyLogin
- Param：Không gửi body
- HTTP status: 200
- Response
{"responseCode": 405, "message": "This request method is not supported."}

## 3.4 API 10: POST To Verify Login with invalid details
- Method: POST
- URL: https://automationexercise.com/api/verifyLogin
- Param：email, password(invalid)
- Form: x-www-form-urlencoded
- HTTP status: 200
- Response
{"responseCode": 404, "message": "User not found!"}

## 3.5 API 11: POST To Create/Register User Account
- Method: POST
- URL: https://automationexercise.com/api/createAccount
- Param：name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
- Form: x-www-form-urlencoded
### 3.5.1 Create success
- HTTP status: 200
- Response
{"responseCode": 201, "message": "User created!"}
### 3.5.2 Create duplicate email
- HTTP status: 200
- Response
{"responseCode": 400, "message": "Email already exists!"}
### 3.5.3 Create missing required param
- HTTP status: 200
- Response
{"responseCode": 400, "message": "Bad request, name parameter is missing in POST request."}

## 3.6 API 14: GET user account detail by email
- Method: GET
- URL: https://automationexercise.com/api/getUserDetailByEmail
- Param：email
### 3.6.1 Get success
- HTTP status: 200
- Response
{"responseCode": 200, "user": {"id": 3109026, "name": "AutoOne", "email": "autoone@gmail.com", "title": "Mr",
"birth_day": "20", "birth_month": "10", "birth_year": "2000", "first_name": "Auto", "last_name": "One", "company":
"CCOM", "address1": "HN", "address2": "MD", "country": "JP", "state": "ST", "city": "CT", "zipcode": "100000"}}
### 3.6.2 Email not exsist
- HTTP status: 200
- Response
{"responseCode": 404, "message": "Account not found with this email, try another email!"}

## 3.7 API 13: PUT METHOD To Update User Account
- Method: PUT
- URL: https://automationexercise.com/api/updateAccount
- Param：name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
- Form: x-www-form-urlencoded
- HTTP status: 200
- Response
{"responseCode": 200, "message": "User updated!"}

-> After update call API14 -> Data updated

## 3.8 API 12: DELETE METHOD To Delete User Account
- Method: DELETE
- URL: https://automationexercise.com/api/deleteAccount
- Param：email,password
### 3.8.1 Delete success
- HTTP status: 200
- Response
{"responseCode": 200, "message": "Account deleted!"}
### 3.8.2 Delete again
- HTTP status: 200
- Response
{"responseCode": 404, "message": "Account not found!"}

# 4. Domain quảng cáo
- googlesyndication.com
- cloudflareinsights.com
- doubleclick.net
- adtrafficquality.google
- 2mdn.net
- smartadserver.com
- fundingchoicesmessages.google.com
_NOTE_ 
- Domain giữ lại: fonts.googleapis.com, fonts.gstatic.com -> Tải font chữ

# 5: UI
# 5.1 Register
# 5.1.1 Register new email
https://automationexercise.com/login -> New User Signup(name, email) -> https://automationexercise.com/signup (Title: Mr/Mrs(Radio button), Name, Email, Password, Date of birth: Day-Month-Year(Selection), Sign up for our neewsletter!(Checkbook), Receive special offers from our partners(Checkbox), First name, Last name, Company, Address, Address 2, Country(Selection), State, City, Zipcode, Mobile Number, Create account(button)) -> https://automationexercise.com/account_created (Account Created!(text), Continue(button))
# 5.1.2 Register exsits email
Email Address already exist!

# 5.2 Delete
Click Delete -> Show (Account Deleted!, Continue(button))