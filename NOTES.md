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