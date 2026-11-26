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

# 6: NOTE
- Test pass nhưng không chứng minh được API update thật sự hoạt động vì data cũ và data update trùng nhau -> Khi verify 2 data giống nhau sẽ pass, nhưng không có thông tin nào được thay đổi -> Không chứng minh được API update thật sự hoạt động

- Các test cần tạo mới User sẽ bị fail do dùng email đã đăng ký.  -> Cần phải sử dụng UUID để tạo random email -> Đăng ký tài khoản pass -> Các test không bị fail

# NOTE FOR AE03
## 1. Cookie
- cookies đăng nhập: sessionid -> Xóa cookies cần phải đăng nhập lại
- Trang không dùng localStorage
## 2. Giỏ hàng
- Giỏ hàng gắn với tài khoản. Chạy song song mà dùng chung một tài khoản thì dễ gây xung đột. Ví dụ testcase view và testcase delete chạy song song, testcase delete chạy trước thì testcase view sẽ fail

## 3. Sản phẩm
- Cấu trúc một sản phẩm
    - Giá
    - Tên
    - Button: Add to cart
    - Button: View Product
- Sau khi click add to cart: Show dialog
    - Text: Added! Your product has been added to cart.
    - Link: View Cart
    - Button: Continute Shopping(Click -> Đóng dialog cấu trúc sản phẩm không thay đổi)

## 4. View cart
- Cấu trúc một sản phẩm
    - Ảnh
    - Tên
    - Giá
    - Quantity
    - Total
    - Button xóa
- Cart rỗng: Cart is empty! Click here to buy products.

## 5. /product/detail/{id}
- Giá
- Textbox: Số lượng
- Button: Add to cart

## 6. Checkout
- /checkout:
    - Địa chỉ giao hàng
        - Your delivery address
            - Tên (title. firstname lastname)
            - address1
            - address2
            - city state zipcode
            - country
            - mobile phone
        - Your billing address
            - Tên (firstname lastname)
            - address1
            - address2
            - city state zipcode
            - country
            - mobile phone
    - total Amount: Nằm ở dòng cuối cùng của bảng sản phẩm, chung tbody
- / "Place Order" -> /payment
    - Name on Card: data-qa="name-on-card"
    - Cart Number: data-qa="card-number"
    - CVC: data-qa="cvc"
    - Expiration: data-qa="expiry-month"
    - YYYY: data-qa="expiry-year"
- Sau khi thanh toán thành công
    - Url: https://automationexercise.com/payment_done/500
    - Thông báo: Congratulations! Your order has been confirmed!

## 7. GET /api/productsList
- HTTPS status: 200
- responseCode: 200
- products: [{"id": 1, "name": "Blue Top", "price": "Rs. 500", "brand": "Polo", "category":
{"usertype": {"usertype": "Women"}, "category": "Tops"}}, {"id": 2, "name": "Men Tshirt", "price": "Rs. 400", "brand":
"H&M", "category": {"usertype": {"usertype": "Men"}, "category": "Tshirts"}}]
- Cấu trúc một sản phẩm
    - id
    - name
    - price
    - brand
    - category: usertype,category
- price là chuỗi

## 8. AE03-Thiết kế
### 8.2 Tách AuthFixture riêng
-  Chỉ có AE03 cần trạng thái đã login nên cần import. Ae01 và AE02 vẫn chạy trạng thái chưa đăng nhập. Nếu đặt chung cho mọi test thì phải test.use storageState rỗng ở từng file -> Dễ bị quên
### 8.2 Vì sao dọn giỏ hàng trước mỗi test và dọn bằng cách nào
- Vì giỏ hàng gắn với user, nếu không dọn giỏ hàng trước khi test thì khi chạy song song thêm sản phẩm vào giỏ đã có hàng thì test verify sẽ bị fail.
- Dọn bằng cách beforeEach() gọi clearCart()


# NOTE AFTER CLONE CODE
- Chay lenh npm install de cai lai cac module trong node_modules(file nay da config trong file .gitignore khi commit len git thi khong commit file nay)
- Tao file .env de khai bao cac bien privte(file nay cung da config trong .gitignore khong commit len git)
 - Chay lenh npm install dotenv

 # NOTE AE04
 ## 1. API /api/searchProduct
- HTTPS status: 200
- responseCode: 200
- Cấu trúc một sản phẩm
    - id: number
    - name: string
    - price: string
    - brand: string
    - category: {
        usertype:{
            usertype:
        },
        category:
    }
- Có giống API1
### 1.1 query param=jean
- Response:
```
{
  "responseCode": 200,
  "products": [
    {
      "id": 33,
      "name": "Soft Stretch Jeans",
      "price": "Rs. 799",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Jeans"
      }
    },
    {
      "id": 35,
      "name": "Regular Fit Straight Jeans",
      "price": "Rs. 1200",
      "brand": "H&M",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Jeans"
      }
    },
    {
      "id": 37,
      "name": "Grunt Blue Slim Fit Jeans",
      "price": "Rs. 1400",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Jeans"
      }
    }
  ]
}
```

### 1.2 query param=top
- Response:
```
{
  "responseCode": 200,
  "products": [
    {
      "id": 1,
      "name": "Blue Top",
      "price": "Rs. 500",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 5,
      "name": "Winter Top",
      "price": "Rs. 600",
      "brand": "Mast & Harbour",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 6,
      "name": "Summer White Top",
      "price": "Rs. 400",
      "brand": "H&M",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 7,
      "name": "Madame Top For Women",
      "price": "Rs. 1000",
      "brand": "Madame",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 8,
      "name": "Fancy Green Top",
      "price": "Rs. 700",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 11,
      "name": "Sleeves Printed Top - White",
      "price": "Rs. 499",
      "brand": "Babyhug",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 12,
      "name": "Half Sleeves Top Schiffli Detailing - Pink",
      "price": "Rs. 359",
      "brand": "Babyhug",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 13,
      "name": "Frozen Tops For Kids",
      "price": "Rs. 278",
      "brand": "Allen Solly Junior",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 14,
      "name": "Full Sleeves Top Cherry - Pink",
      "price": "Rs. 679",
      "brand": "Kookie Kids",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 15,
      "name": "Printed Off Shoulder Top - White",
      "price": "Rs. 315",
      "brand": "Babyhug",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 16,
      "name": "Sleeves Top and Short - Blue & Pink",
      "price": "Rs. 478",
      "brand": "Babyhug",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Dress"
      }
    },
    {
      "id": 18,
      "name": "Little Girls Mr. Panda Shirt",
      "price": "Rs. 1200",
      "brand": "Kookie Kids",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 24,
      "name": "Colour Blocked Shirt – Sky Blue",
      "price": "Rs. 849",
      "brand": "Allen Solly Junior",
      "category": {
        "usertype": {
          "usertype": "Kids"
        },
        "category": "Tops & Shirts"
      }
    },
    {
      "id": 42,
      "name": "Lace Top For Women",
      "price": "Rs. 1400",
      "brand": "Mast & Harbour",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    }
  ]
}
```
### 1.3 query param=tshirt
- Response:
```
{
  "responseCode": 200,
  "products": [
    {
      "id": 2,
      "name": "Men Tshirt",
      "price": "Rs. 400",
      "brand": "H&M",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    },
    {
      "id": 28,
      "name": "Pure Cotton V-Neck T-Shirt",
      "price": "Rs. 1299",
      "brand": "H&M",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    },
    {
      "id": 29,
      "name": "Green Side Placket Detail T-Shirt",
      "price": "Rs. 1000",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    },
    {
      "id": 30,
      "name": "Premium Polo T-Shirts",
      "price": "Rs. 1500",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    },
    {
      "id": 31,
      "name": "Pure Cotton Neon Green Tshirt",
      "price": "Rs. 850",
      "brand": "H&M",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    },
    {
      "id": 43,
      "name": "GRAPHIC DESIGN MEN T SHIRT - BLUE",
      "price": "Rs. 1389",
      "brand": "Mast & Harbour",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    }
  ]
}
```

## 1.4 Gọi với từ khóa không có dữ liệu=aokhoa
- HTTPS status: 200
- responseCode: 200
- Response
```
{
  "responseCode": 200,
  "products": []
}
```
## 1.5 Tìm kiếm hoa thường
- Tìm kiếm hoa thường cho cùng một kết quả, không phân biệt hoa thường
## 1.6 API tìm theo tên/category
- Ví dụ search với từ khóa=winter -> Trả về sản phẩm tên chứa winter, category và brand đều không chứa winter
- Ví dụ search với từ khóa=top -> Trả về sản phẩm với tên Little Girls Mr. Panda Shirt không chứa top, category=Tops & Shirts
```
{
  "responseCode": 200,
  "products": [
    {
      "id": 5,
      "name": "Winter Top",
      "price": "Rs. 600",
      "brand": "Mast & Harbour",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    }
  ]
}
```

## 2. API 6 /api/searchProduct không truyền param
- HTTPS status: 200
- responseCode: 200
- Response
```
{
  "responseCode": 400,
  "message": "Bad request, search_product parameter is missing in POST request."
}
```
## 3. UI /products
- Locator ô tìm kiếm: getByRole("textbox",{name:"Search Product"})
- Button tìm kiếm: locator("#submit_search")
- Sau khi tìm:
    - URL đổi thành: /products?search=jean
    - Tiêu đề đổi thành: Searched Products
- Tìm kiếm với từ khóa không có kết quả: UI hiển thị tiêu đề Searched Products với list rỗng
- Có thể vào thẳng bằng URL /products?search=jean thay vì gõ vào ô tìm kiếm. Kết quả giống nhau
- Khi so sanh ket qua tu API va UI khong can sort truoc khi so sanh vi thu tu tren UI va API da giong nhau

## 4. So sánh
- Với cùng một từ khóa
    - Số sản phẩm trên UI bằng số sản phẩm API trả về
    - Thứ tự giống nhau

# NOTE AE05
- Chạy nhiều worker bị 503, chạy 1 worker thì pass, nên đã giới hạn workers.
- Lỗi không lặp lại, chỉ do hệ thống bên ngoài.

## Workflow
name: Playwright Tests 
on: -> Môĩ lần push/pull code từ nhánh main hoặc masterr
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs: 
  test:
    timeout-minutes: 60 -> Set timeout là 60min, nếu test chạy quá 60min thì sẽ bị hủy
    runs-on: ubuntu-latest -> Chạy trên máy ảo ubuntu phiên bản latest
    steps:
    - uses: actions/checkout@v4 -> tải code của repo về máy ảo. Không có bước này thì máy ảo trống
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies -> cài đặt dependencies đúng phiên bản trong package-lock.json, xóa node modules cũ trước khi cài. Khác npm install ở chỗ không tự nâng phiên bản nên kết quả lần nào cũng giống nhau
      run: npm ci
    - name: Install Playwright Browsers 
      run: npx playwright install --with-deps --> cài đặt cả 3 browser(chromium, firefox, webkit) cùng thư viện hệ điều hành chúng cần.
    - name: Run Playwright tests -> chạy toàn bộ test
      run: npx playwright test
    - uses: actions/upload-artifact@v4 -> tải thư mục playwright/report lên github để tải về xem
      if: ${{ !cancelled() }} -> Vẫn upload kể cả fail. Chỉ bỏ qua khi job bị hủy. Lúc test fail mới là lúc cần report nhất
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30 -> giữ file 30 ngày

## Hiện tại CI có chạy được không? Thiếu gì? (Gợi ý: .env không có trên CI, vậy requireEnv sẽ làm gì?)
- Hiện tại CI không chạy được do thiếu file .env
- .env không có trên CI nên requireEnv sẽ throw lỗi
- env.ts được import ngay trong playwright.config.ts, mà requireEnv chạy lúc import. Vì vậy khi thiếu biến, cả lần chạy fail ngay lúc đọc config, không test nào chạy, kể cả test AE04 vốn không cần đăng nhập.

## Test nào cần tài khoản thật (USER_EMAIL…), test nào tự tạo tài khoản (AE02/AE03)? Liệt kê.
- Test cần tài khoản thật: AE01
- Test tự tạo tài khoản: AE02, AE03

## Đọc tài liệu: GitHub Secrets khác Variables thế nào? BASE_URL nên đặt ở đâu, USER_PASSWORD nên đặt ở đâu? Vì sao?
- Secrets: Dùng để lưu trữ thông tin nhạy cảm trong github ví dụ username/password, api token, access token, DB username/password, ssh private key, các thông tin đăng nhập môi trường UAT, PROD, playwright test account
-> github secrests giúp sử dụng các thông tin này trong github actions mà không cần hardcode vào source code hoặc commit lên github
- Variables: Lưu trữ các thông tin cấu hình không nhạy cảm của repository hoặc môi trường chạy github actions
- Secrets khác variables: 
  - secrets lưu thông tin nhạy cảm, bảo mật còn variables lưu thông tin không nhạy cảm
  - Secret bị che thành *** trong log, và sau khi lưu thì không xem lại được giá trị, chỉ ghi đè.
  - Variable xem và sửa thoải mái, không bị che.
  - Cách dùng
    - {{ secrets.USER_PASSWORD }}
    - ${{ vars.BASE_URL }}
- BASE_URL nên đặt ở variables vì là thông tin không nhạy cảm có thể public
- USER_PASS nên đặt ở secrets do là thông tin nhạy cảm không thể public

## Pull request từ fork có đọc được secrets không? Ảnh hưởng gì?
- Pull request từ fork có đọc được secrets không: Không đọc được secrets trong repo gốc
- Khi có pull request từ fork:
  - Workflow vẫn chạy. Chỉ là các biến secret thành chuỗi rỗng, nên requireEnv throw và job đỏ.
- Vì sao GitHub làm vậy: chống người lạ fork repo, sửa workflow để in hoặc gửi secret ra ngoài.

## Gan tag @smoke
- Gan tag @smoke cho AE01-01, AE02-06, AE03-06, AE04-01 “jean” (API) và AE04-UI-01 “jean”
  - Mỗi luồng chính 1 test, search chỉ 1 từ khóa, đánh dấu bằng cờ smoke trong data
- Gan tag @unit: parsePrice -> Can unit test nen gan mot tag moi khi can check lai cac ham unit test

## github đã che secret nhưng vẫn không được echo ra vì
- GitHub thường che giá trị Secret khi tìm thấy đúng chuỗi đã đăng ký
- Nếu secret bị biến đổi như mã hóa base64, viết ngược… -> GitHub không đảm bảo hiển che được
- GitHub masking chủ yếu áp dụng cho log, không tự động đảm bảo xóa Secret khỏi các artifact này.
- Nếu repository là public, người khác có thể tải artifact được chia sẻ và phân tích dữ liệu bên trong.
- Ví dụ trong dự án của em: trace của test login có bước fill ô password, mở trace là đọc được mật khẩu dạng chữ thường, không bị che. Vì vậy em dùng tài khoản test riêng, đặt retention-days: 7 cho artifact tự xoá, và chỉ ghi trace khi retry (trace: "on-first-retry").

## AE03-06 Checkout lần đầu fail
- Hiện tượng: AE03-06 timeout ở bước click “View Product”, retry thì pass, nên report đánh dấu flaky.
- Nguyên nhân: screenshot cho thấy trang báo “heavy load (queue full)”, tức là server quá tải, không phải lỗi locator hay lỗi logic.
- Bài học: lỗi trong log là “locator timeout”, không nói thật nguyên nhân. Phải xem screenshot/video mới biết. retries: 1 trên CI giúp vượt qua các lỗi môi trường kiểu này, nhưng vẫn phải theo dõi test flaky trong report, không bỏ qua.

## concurrency, workflow_dispatch chỉ chạy khi đã có trên main
- concurrency: Nhóm theo workflow+nhánh. Push commit mới lên mà job cũ chưa chạy xong thì job cũ bị hủy chạy job mới. Lợi ích là chỉ chạy job của commit cuối cùng, đỡ tốn tài nguyên và thời gian
- workflow_dispatch: nút Run workflow chỉ hiện khi file workflow đã nằm trên nhánh mặc định.
  - Ví dụ: Phải merge PR#1 vào main rồi mới chạy tay được(run #32, @api ra 15 passed)

# Cau hoi phong van
1. CI là gì? Vì sao chạy test trên CI thay vì chỉ chạy ở máy? Test pass local nhưng fail trên CI thường vì những lý do nào (nêu ít nhất 3)?
- CI (Continuous Integration – Tích hợp liên tục) là quá trình tự động kiểm tra và tích hợp code mỗi khi developer push code hoặc tạo Pull Request. Vi du khi pull code
	- Khi bạn push code lên GitHub:
		- GitHub nhận code mới.
		- GitHub Actions tự động kích hoạt workflow.
		- Tạo môi trường chạy test trên máy ảo (runner).
		- Cài đặt Node.js và dependencies.
		- Cài đặt browser Chromium.
		- Chạy Playwright test.
		- Trả về kết quả Pass/Fail và lưu report.
- Chay test tren CI thay vi chay o may
	- Tester khong can phai chay tay moi khi co code moi
	- Moi truong sach, doc lap
	- Phat hien loi som khi co push hoac pull code truoc khi merge vao main
- Test pass o local nhung fail tren CI
	- Thieu thong tin tai khoan: Vi du trong bai thieu bien BASE_URL -> Chay fail
	- Do luc chay trang bi qua tai: Vi du trong bai chay test AE06 luc dau fail do trang bi heavy load, lan sau retry thanh cong
	- Moi truong khac nhau. CI la linux may local la windown
2. Bạn quản lý thông tin đăng nhập trong CI thế nào? Secret khác variable ra sao? Nếu lỡ commit mật khẩu lên repo thì phải làm gì (đủ các bước)?
- Quan ly thong tin dang nhap trong CI:
	- Thong tin quan trong, khong the de lo: Khai bao trong secrets
	- Thong tin co the public: Khai bao trong variables
- Secret khac variable: Secrets luu thong tin quan trong khong the public con variable thi luu thong tin co the public
- Neu lo commit mat khau len repo: 
	- Xoa log da chay de khong luu lai mat khau
	- Tao lai tai khoan moi
	- Cau hinh thong tin tai khoan vao secrets
3. Tag @smoke dùng để làm gì? Chọn test smoke theo tiêu chí nào? Khi nào chạy smoke, khi nào chạy full?
- Tag @smoke: de chay cac case chinh dam bao luong chinh khong bi loi khi co code moi
- Chon test smole theo tieu chi: Dam bao mot luong chinh cua he thong chay duoc. Vi du trong bai nay chon smoke chay du mot luong Tao moi tai khoan -> Dang nhap -> Search -> Add produc -> Thanh toan
- smoke chay khi: Can kiem tra nhanh he thong co chay on dinh khong va chuc nang chinh co hoat dong binh thuong khong
	- Dev vua push code moi
	- Pull code truoc khi merge
	- Vua deploy UAT, STG, PROD
	- Co ban build moi
- Chay full test: Khi can kiem tra xem code moi co anh huong den he thong khong
	- Chay truoc khi deploy PROD
	- Khi tich hop nhieu chuc nang
4. Trace viewer cho bạn thấy những gì? Vì sao dùng on-first-retry thay vì on? Khi CI đỏ, bạn debug theo thứ tự nào?
- Trace viewer cho thấy: 
	- action: Cac thao tac playwright da thuc hien click, fill...
	- timeline: thoi gian thuc hien tung action
	- Screenshots: anh chup giao dien trong qua trinh test
	- Source: Code test tương ứng với từng action
	- Logs: Thông tin log của quá trình thực thi
	- Network: Các request/response liên quan, nếu được ghi lại
	- Errors: Lỗi xảy ra trong quá trình chạy test
	- Vi du: Trong bai tap nay, khi chay ae05-ci-selfcheck -> Mo trace thay duoc bi fail do 
		- Locator:  getByText(' Logged in as')
			Expected: "Logged in as name Auto User bda40eb1-27eb-4cb2-bc45-4626d4f7b3bb"
			Received: " Logged in as Auto User bda40eb1-27eb-4cb2-bc45-4626d4f7b3bb 
		- Anh chup man hinh tai luc fail
		- Code fail tai dong nao
		- Thoi gian bi fail
- Vì sao dùng on-first-retry thay vì on
	- Tiết kiệm dung lượng lưu trữ artifact trên CI.
	- Giảm overhead khi chạy test so với ghi trace cho mọi lần chạy.
	- Khi test bị lỗi, có trace để phân tích lần retry.
- Khi CI đỏ, bạn debug theo thứ tự nào?
	- Xem log tai buoc run test xem fail o dau
	- Tai log artifact -> Xem log cu the: sai tai buoc nao, anh chup va video ghi lai buoc thuc hien
	- Xac dinh nguen nhan loi la gi: thieu bien, timeout..
	- Re-procedue bug
5. retries trên CI có lợi và có hại gì? Một test chỉ pass ở lần retry (flaky) thì bạn xử lý thế nào?
- Loi ich
	- Giảm ảnh hưởng của lỗi tạm thời: Ví dụ mạng chậm hoặc server phản hồi không ổn định
	- Phát hiện flaky test: Nhận diện test có kết quả không nhất quán
	- Có thêm dữ liệu debug: Có thể phân tích kết quả giữa lần chạy đầu và lần retry
- Tac hai
	- Tăng thời gian chạy: Test Fail phải chạy lại
	- Tốn tài nguyên CI: Nhiều test retry làm tăng thời gian và chi phí
- Một test chỉ pass ở lần retry
	- Xac dinh test co thuc su flaky hay khong: Chi loi o CI hay ca local, tan suat loi, co fail tai cung 1 buoc hay khong...
	- Xem trace viewr: Xem loi tai buoc nao,thong tin loi cu the
	- Xac dinh nguyen nhan goc va sua loi
	- Vi du test AE03-06 bi fail sau khi trace loi thi do trang bi qua tai, bi ca local va CI -> Do server trang bi qua tai tai thoi diem do
### NOTE on va on-first-retry
|Tiêu chí|on|on-first-retry
|-----|----------|----------|
|Khi nào ghi trace?|Mọi lần chạy test|Khi test chạy retry lần đầu
|Test Pass lần đầu|Có trace|Không có trace
|Test Fail lần đầu|Có trace|Ghi trace ở lần retry
|Dung lượng lưu trữ|Lớn hơn|Thường nhỏ hơn
|Overhead|Có thể cao hơn|Thường thấp hơn

# AE06

## Chuẩn bị

### 1. Đăng ký tài khoản

- **URL:** https://conduit-api.bondaracademy.com/api/users

- **Request Body:**

```json
{
    "user": {
        "email": "autoplaywright-new@example.com",
        "password": "********",
        "username": "auto-new"
    }
}
```

- **Status Code:**
  - Thành công: `201 Created`
  - Email đã tồn tại: `422 Unprocessable Content`

- **Response:**

**Trường hợp đăng ký thành công:**

```json
{
  "user": {
    "id": 92187,
    "email": "autoplaywright@example.com",
    "username": "AutoPlaywright",
    "bio": null,
    "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
    "token": "********"
  }
}
```

**Trường hợp email đã tồn tại:**

```json
{
  "errors": {
    "email": ["has already been taken"]
  }
}
```

### 2. Đăng nhập tài khoản

- **URL:** https://conduit-api.bondaracademy.com/api/users/login

- **Request Body:**

```json
{
  "email": "autoplaywright@example.com",
  "password": "********"
}
```

- **Status Code:** `200 OK`

- **Response:**

```json
{
  "user": {
    "email": "autoplaywright@example.com",
    "username": "AutoPlaywright",
    "bio": null,
    "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
    "token": "********"
  }
}
```

- Token nằm trong trường `token` của Response.

### Header

Request GET `/user` sau khi đăng nhập gửi Header:

| Key | Value |
| --- | --- |
| authorization | Token ******** |

### Local storage
- Key chứa token: jwtToken
- Xóa key rồi F5: Trang không còn đăng nhập

### Mã Lỗi
- Sai token
  - Status: 401
  - Response
```json
{
    "status": "error",
    "message": "missing authorization credentials"
}
```

- Không header
  - Status: 401
  - Response
```json
{
    "status": "error",
    "message": "missing authorization credentials"
}
```

### Bài viết
#### Tạo bài viết mới
- URL: https://conduit-api.bondaracademy.com/api/articles/
- Body
```json
{
    "title": "Test auto",
    "description": "Test auto playwright",
    "body": "- Create by UI\n- Verify by API",
    "tagList": [
        "#playwright"
    ]
}
```
- Trường slug trong response
"slug": "Test-auto-92187", -> title - account id

#### Xóa bài viết
- URL: 
https://conduit-api.bondaracademy.com/api/articles/Auto-test-new-92187 (Auto-test-new-92187-> slug trong response khi tạo bài viết)
- Status code: 204
- Response: Trắng

### Xóa user
- API không có enpoint xóa user. Đã gọi thử API DELETE /api/user với token hợp lệ nhưng trả về lỗi 404
- Hiện tại với trang web này thì không thể xóa user, user vẫn tồn tại
- Nếu là công ty thì có thể
  - Hỏi DEV xem có API xóa user không
  - Script dọn dẹp data ở DB loc theo tien to ae06_txv
- Giai phap de khong tao nhieu user
  - email cố định theo worker (${prefix}_w${parallelIndex}@example.com), fixture login trước, fail thì mới register, password từ .env.
    - Kết quả: số user luôn bằng số worker (2 user w0/w1), không tăng theo số lần chạy. 
    - Nhược điểm và rủi ro:
      - Máy bạn và CI chạy cùng lúc thì cùng dùng w0: bài viết không đụng nhau (title có Date.now()), nhưng các test sửa thông tin user (nếu sau này có) sẽ ảnh hưởng nhau.
      - Đổi CONDUIT_PASSWORD thì user cũ login fail → register báo 422 → phải đổi CONDUIT_EMAIL_PREFIX.
      - Dữ liệu dồn lại trên user cố định nếu dọn dẹp lỗi, ví dụ bài bị bỏ lại ở tự kiểm 2. Đây là lý do dùng try/finally hoặc fixture dọn dẹp.
- So sánh với cách moi lan chay tao 1 user: user mới mỗi lần chạy thì sạch hơn, không đụng nhau, nhưng tạo user mãi mãi vì không xoá được.
## Ly do chon parallelIndex thay vi workerIndex
- workerIndex: Không phải “worker số mấy trong số N worker”. Mỗi khi Playwright khởi động lại worker thì số này tăng tiếp, ví dụ khi chuyển sang project khác hoặc sau một test fail. Vì vậy email ..._w${workerIndex} sẽ tăng dần theo thời gian, và hướng “email cố định, không tạo thêm user” bị phá.
- parallelIndex: Giá trị luôn nằm trong khoảng 0 … workers-1 (2 worker → chỉ có 0 và 1), và worker khởi động lại sẽ dùng lại số cũ.

# AE07
## Sửa bài
- Method: PUT
- URL: https://conduit-api.bondaracademy.com/api/articles/<slug-cu>
- Body
```json
{
    "title": "test three edit",
    "description": "auto three",
    "body": "- New three\n- Auto",
    "tagList": [
        "#auto #new",
        "#auto#new"
    ],
    "slug": "test-three-92187"
}
```
- Status: 200
- Slug: Khi gửi lên là slug cũ, reponse trả vể slug mới
- Response
```json
{
    "article": {
        "slug": "test-three-edit-92187",
        "title": "test three edit",
        "description": "auto three",
        "body": "- New three\n- Auto",
        "tagList": [
            "#auto #new",
            "#auto#new"
        ],
        "createdAt": "2026-11-15T16:08:12.961Z",
        "updatedAt": "2026-11-16T16:50:14.153Z",
        "favorited": false,
        "favoritesCount": 0,
        "author": {
            "username": "AutoPlaywright",
            "bio": null,
            "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
            "following": false
        }
    }
}
```
- URL trang không đổi

## Bình luận
### Thêm bình luận
- URL: 
https://conduit-api.bondaracademy.com/api/articles/test-three-edit-92187/comments
- Body
```json
{
    "body": "Comment one"
}
```
- Status: 200
- Response
```json
{
    "comment": {
        "id": 109585,
        "createdAt": "2026-11-16T17:02:49.988Z",
        "updatedAt": "2026-11-16T17:02:49.988Z",
        "body": "Comment one",
        "author": {
            "username": "AutoPlaywright",
            "bio": null,
            "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
            "following": false
        }
    }
}
```

### Xóa bình luận
- URL: https://conduit-api.bondaracademy.com/api/articles/test-three-edit-92187/comments/109585
- Body: Trống
- Status: 200
- Comment có trường id

### NOTE: Comment trả về theo user, chỉ nhìn thấy comment của chính mình, không nhìn thấy được comment của người khác
- A xem bài viêt
```json
{
    "comments": [
        {
            "id": 109674,
            "createdAt": "2026-11-18T16:42:56.870Z",
            "updatedAt": "2026-11-18T16:42:56.870Z",
            "body": "comment 1",
            "author": {
                "username": "AutoPlaywright",
                "bio": null,
                "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
                "following": false
            }
        },
        {
            "id": 109675,
            "createdAt": "2026-11-18T16:43:02.489Z",
            "updatedAt": "2026-11-18T16:43:02.489Z",
            "body": "comment 2",
            "author": {
                "username": "AutoPlaywright",
                "bio": null,
                "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
                "following": false
            }
        },
        {
            "id": 109676,
            "createdAt": "2026-11-18T16:49:23.045Z",
            "updatedAt": "2026-11-18T16:49:23.045Z",
            "body": "comment 1",
            "author": {
                "username": "AutoPlaywright",
                "bio": null,
                "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
                "following": false
            }
        }
    ]
}
```
- B xem bài viết
```json
{
    "comments": [
        {
            "id": 109677,
            "createdAt": "2026-11-18T16:53:46.971Z",
            "updatedAt": "2026-11-18T16:53:46.971Z",
            "body": "comment auto-one 1",
            "author": {
                "username": "auto-one",
                "bio": null,
                "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
                "following": false
            }
        },
        {
            "id": 109678,
            "createdAt": "2026-11-18T16:53:54.700Z",
            "updatedAt": "2026-11-18T16:53:54.700Z",
            "body": "comment auto-one 2",
            "author": {
                "username": "auto-one",
                "bio": null,
                "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
                "following": false
            }
        }
    ]
}
```

## Yêu thích
### Bài viết của người khác
- Method: Post
- URL: https://conduit-api.bondaracademy.com/api/articles/<slug>/favorite
- Status: 200
- Response:
```json
{
    "article": {
        "id": 11,
        "slug": "The-value-of-pre-recorded-video-classes.-The-most-efficient-approach-to-tranfer-the-knowledge-1",
        "title": "The value of pre-recorded video classes. The most efficient approach to tranfer the knowledge",
        "description": "As educational practices evolve, video tutorials have emerged as the most efficient method for imparting theoretical knowledge. At Bondar Academy, we prioritize expertly structured and crafted video tutorials, ensuring you learn quickly and effectively and advance your skills.",
        "body": "At Bondar Academy, we prioritize the value of your time and the efficiency of your education, distinguishing our approach from traditional colleges and live boot camps. Forget long, tedious live lectures on a fixed schedule. With us, you learn at your convenience and pace through optimized, structured video lectures. \n\nWe understand your goal is rapid knowledge acquisition. Our pre-recorded and well-organized lectures are designed precisely for this, ensuring no slowdowns from group dynamics or unrelated instructor anecdotes. \n\nDive straight into the subject matter, learn efficiently, and if questions arise, our immediate support on the Slack Workspace is there to streamline your learning process and swiftly remove any roadblocks.",
        "createdAt": "2024-01-27T21:50:38.825Z",
        "updatedAt": "2024-01-27T21:50:38.825Z",
        "favoritesCount": 509,
        "tagList": [
            "Bondar Academy",
            "Video Lectures",
            "Tutorials"
        ],
        "author": {
            "username": "Artem Bondar",
            "bio": null,
            "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
            "following": false
        },
        "favorited": true
    }
}
```
### Bấm bài viết của chính mình tương tự như bấm thích bài viết của người khác

## Phân quyền
### Dùng token của user B
#### Delete bài viết của A
- Status: 403
- Body lỗi
```json
{
    "message": "You are not authorized to delete this article"
}
```
- Bài viết của A vẫn còn

#### Edit bài viết của A
- Status: 403
- Body lỗi
```json
{
    "message": "You are not authorized to update this article"
}
```
- Bài viết của A vẫn còn nguyên

## Đăng ký lỗi
### Request
```json
{
    "user": {
        "email": "autoplaywright-new@example.com",
        "password": "Mk135790@",
        "username": "auto-new"
    }
}
```
### username rỗng
- Status: 422
- Response
```json
{
    "errors": {
        "username": [
            "can't be blank"
        ]
    }
}
```

### email sai định dạng
- Status: 422
- Response
```json
{
    "errors": {
        "email": [
            "is invalid"
        ]
    }
}
```

### email đã tồn tại
- Status: 422
- Response
```json
{
    "errors": {
        "email": [
            "has already been taken"
        ]
    }
}
```

### password rỗng
- Status: 422
- Response
```json
{
    "errors": {
        "password": [
            "can't be blank"
        ]
    }
}
```
- Không có trường hợp nào cho phép đăng kí

## Global Feed
### Tải danh sách ở trang chủ
- URL: https://conduit-api.bondaracademy.com/api/articles
- Param:
  - limit=10
  - offset=0
- Status: 304
- Response
```json
{
    "articles": [
        {
            "slug": "Discover-Bondar-Academy:-Your-Gateway-to-Efficient-Learning-1",
            "title": "Discover Bondar Academy: Your Gateway to Efficient Learning",
            "description": "Discover Bondar Academy's unique place in the educational landscape, where value-focused and efficient learning approaches converge. Our goal is to rapidly enhance your professional technical skills, boosting your market competitiveness and paving the way for higher-paying job opportunities. The speed of your progress is in your hands – you set the pace, and we provide the solutions and support to help you achieve your desired outcomes.",
            "body": "Bondar Academy is a leading platform for efficient education, designed to boost your technical skills and advance your career in Quality Assurance (QA). Our program features a balanced mix of pre-recorded lectures and live sessions, allowing each student to study at their own pace and at a time that suits them. \n\nOur instructors are readily available on our Slack Workspace for support. Whether it's a quick question or a more complex issue requiring a Zoom call or Slack Huddle for screen sharing and live discussion, we're here to assist. Additionally, each class comes with a comprehensive question bank for self-assessment. Following each lecture, you have the opportunity to validate your understanding and readiness to progress to the next topic. You set the pace, and we provide the solutions to ensure you achieve your desired outcomes.\n\nSignUp today: https://www.bondaracademy.com",
            "tagList": [
                "qa career",
                "Bondar Academy",
                "QA Skills",
                "Value-Focused"
            ],
            "createdAt": "2024-01-27T21:52:32.682Z",
            "updatedAt": "2024-01-27T21:52:32.682Z",
            "favorited": false,
            "favoritesCount": 2312,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "The-value-of-pre-recorded-video-classes.-The-most-efficient-approach-to-tranfer-the-knowledge-1",
            "title": "The value of pre-recorded video classes. The most efficient approach to tranfer the knowledge",
            "description": "As educational practices evolve, video tutorials have emerged as the most efficient method for imparting theoretical knowledge. At Bondar Academy, we prioritize expertly structured and crafted video tutorials, ensuring you learn quickly and effectively and advance your skills.",
            "body": "At Bondar Academy, we prioritize the value of your time and the efficiency of your education, distinguishing our approach from traditional colleges and live boot camps. Forget long, tedious live lectures on a fixed schedule. With us, you learn at your convenience and pace through optimized, structured video lectures. \n\nWe understand your goal is rapid knowledge acquisition. Our pre-recorded and well-organized lectures are designed precisely for this, ensuring no slowdowns from group dynamics or unrelated instructor anecdotes. \n\nDive straight into the subject matter, learn efficiently, and if questions arise, our immediate support on the Slack Workspace is there to streamline your learning process and swiftly remove any roadblocks.",
            "tagList": [
                "Bondar Academy",
                "Video Lectures",
                "Tutorials"
            ],
            "createdAt": "2024-01-27T21:50:38.825Z",
            "updatedAt": "2024-01-27T21:50:38.825Z",
            "favorited": false,
            "favoritesCount": 508,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Mastering-Knowledge-with-Self-Assessments:-Identifying-and-Bridging-Learning-Gaps-in-Education-1",
            "title": "Mastering Knowledge with Self-Assessments: Identifying and Bridging Learning Gaps in Education",
            "description": "Self-assessment is an essential tool for gauging your understanding of lecture material. It answers critical questions: Have you grasped everything correctly? Is there anything you've missed? Are you prepared for the next lesson? These assessments ensure that you build a solid foundation of knowledge, confidently and efficiently paving the way for swift progress and effective learning outcomes.",
            "body": "Traditional educational institutions, such as colleges and universities, commonly use tests and assessments to measure knowledge. This approach is effective for gauging student performance, but it's not without drawbacks. In these settings, assessments after every lecture aren't feasible due to the time required for teachers to evaluate them. This often leads to students having a false sense of understanding, believing they've comprehended all aspects of a lecture when, in reality, small but crucial details might be missed. These 'knowledge gaps' can accumulate, making more complex topics difficult to grasp later on.\n\nAt Bondar Academy, we address this challenge by implementing self-assessments after every lecture. These are designed to cover key questions that ensure a thorough understanding of the material, essential for comfort and success in future lectures. The number of questions varies, ranging from 3-4 to 15-20, depending on the lecture's significance and the volume of critical information. With these self-assessments, students receive immediate feedback, helping them determine if they've fully understood the lecture or if they need to revisit certain parts or seek assistance from our instructors in the Slack Workspace.",
            "tagList": [
                "Self-Assessment",
                "Test",
                "Exam"
            ],
            "createdAt": "2024-01-27T21:48:36.340Z",
            "updatedAt": "2024-01-27T21:48:36.340Z",
            "favorited": false,
            "favoritesCount": 252,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Practical-Implementation-of-Skills:-Homework-Assignments-with-Instructor-Supervision-1",
            "title": "Practical Implementation of Skills: Homework Assignments with Instructor Supervision",
            "description": "Knowledge or skills not reinforced through practical exercises can quickly fade, often faster than anticipated. Homework, particularly in tasks like writing your own code, is crucial for honing these skills and cementing your understanding. At Bondar Academy, we ensure this vital step by assigning homework, rigorously evaluating the outcomes, and providing valuable feedback to guide your learning journey.",
            "body": "Homework assignments are a fundamental component of the educational methodology at Bondar Academy, especially in technical education where learning a new programming language or framework is involved. The key to mastering these skills lies in writing code; the more you write, the better you become. However, merely replicating code seen in lectures leads to minimal learning. Often, this approach leaves students unclear about why their code works the way it does, as they focus on copying rather than understanding.\n\nA homework assignment at Bondar Academy starts with a blank page, challenging students to apply all their knowledge to write the first line of code. This process is more demanding than it appears. As you write each line, understanding and reasoning grow, making your code meaningful and comprehensible. You learn to write code that makes sense to you, enhancing your understanding.\n\nIn completing these assignments, you engage the 'thinking' part of your brain, transforming theoretical knowledge into practical skills. Recognizing the crucial role of homework in learning, our instructors at Bondar Academy are always available to assist with any challenges. Just reach out on Slack, and you'll receive the guidance and support needed for successful completion. At Bondar Academy, we fully understand the importance of homework assignments for the best outcome, so our instructors are always here to assist if you have any difficulties with completing them. Just ask in Slack and you'll be guided and assisted.",
            "tagList": [
                "Homework",
                "Assignments",
                "Practice",
                "Coding"
            ],
            "createdAt": "2024-01-27T21:46:09.512Z",
            "updatedAt": "2024-01-27T21:46:09.512Z",
            "favorited": false,
            "favoritesCount": 118,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Embracing-Daily-Git-Routines:-Real-Code-Reviews-on-GitHub-for-Effective-Coding-Practice.-1",
            "title": "Embracing Daily Git Routines: Real Code Reviews on GitHub for Effective Coding Practice.",
            "description": "Learning to code is just one part of a larger skill set; effectively managing and organizing code is equally crucial. At Bondar Academy, we integrate Git and platforms like GitHub into the core learning cycle. With us, using Git becomes a regular routine, where organizing code in branches, storing it in remote repositories, and collaborating with others through strategies like branching, merging, pull requests, and code reviews are standard practice.",
            "body": "At Bondar Academy, mastering Git and GitHub is a fundamental step before delving into frameworks or programming languages. Effective code management, organization, and storage are crucial skills, and Git is the premier tool for this purpose. However, many learners initially find Git challenging due to its complexity and non-intuitive nature. To address this, our instructors have developed structured lectures on Git and GitHub, ensuring an efficient and thorough understanding of these essential tools. Git lessons are a mandatory prerequisite in every class. For a glimpse into our teaching approach, visit our YouTube channel: https://www.youtube.com/@BondarAcademy/playlists.\n\nIn our courses, all homework assignments are reviewed using GitHub pull requests, mirroring the workflow in real-world software development environments. Students submit their code to their working branch for review. Our instructors then provide feedback, suggesting modifications or adjustments for pull request approval. This iterative process is repeated throughout the course, establishing Git usage as a natural and routine part of your coding practice.",
            "tagList": [
                "YouTube",
                "Git",
                "GitHub"
            ],
            "createdAt": "2024-01-27T21:42:31.491Z",
            "updatedAt": "2024-01-27T21:42:31.491Z",
            "favorited": false,
            "favoritesCount": 108,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Engaging-in-Live-Zoom-Sessions:-Interact-with-Instructors-and-Peers-Ask-Questions-in-Real-Time-1",
            "title": "Engaging in Live Zoom Sessions: Interact with Instructors and Peers, Ask Questions in Real-Time",
            "description": "In our increasingly online world, personal engagement remains a crucial element of effective learning. At Bondar Academy, we address this by hosting live Zoom sessions. These sessions provide a platform for live interaction between instructors and students, and among students themselves. Complementing our Slack channel, these live sessions offer an additional avenue for asking questions and engaging in meaningful discussions.",
            "body": "In our increasingly online world, personal engagement remains a crucial element of effective learning. \nAt Bondar Academy, we address this by hosting live Zoom sessions. These sessions provide a platform for live interaction between instructors and students and among students themselves. Complementing our Slack channel, these live sessions offer an additional avenue for asking questions and engaging in meaningful discussions.",
            "tagList": [
                "Zoom",
                "Live Sessions"
            ],
            "createdAt": "2024-01-27T21:39:50.587Z",
            "updatedAt": "2024-01-27T21:39:50.587Z",
            "favorited": false,
            "favoritesCount": 79,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Utilizing-Slack-for-Continuous-Engagement:-Connect-with-Instructors-Share-Insights-and-Collaborate-1",
            "title": "Utilizing Slack for Continuous Engagement: Connect with Instructors, Share Insights, and Collaborate",
            "description": "Slack stands out as a widely-used messaging and collaboration platform, celebrated for its convenience and versatility. It enables simultaneous participation in multiple conversations, supports comments and emoji reactions, and allows users to share screenshots, videos, and code snippets. Its functionality extends to making calls in huddle sessions. Given these robust features, Bondar Academy has chosen Slack as our primary communication platform, facilitating seamless interaction and collaboration.",
            "body": "As a new member of Bondar Academy, one of your initial steps should be registering for the Bondar Academy Slack Workspace. Upon registration at Bondar Academy, you'll receive a welcome email containing the URL to join. This Workspace serves as a central hub for communication with instructors and fellow students. Whether you have a question, need to share code, or want to upload screenshots, Slack makes it easy and efficient. Moreover, its compatibility with both desktop and mobile devices, by downloading and installing the app, ensures you can stay connected with your instructors and the community wherever you go.",
            "tagList": [
                "Slack",
                "Community",
                "Collaboration"
            ],
            "createdAt": "2024-01-27T21:38:27.992Z",
            "updatedAt": "2024-01-27T21:38:27.992Z",
            "favorited": false,
            "favoritesCount": 78,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Stay-Ahead-with-Bondar-Academy:-Subscribe-to-Our-YouTube-channel-for-Latest-Tech-and-Education-Updates-1",
            "title": "Stay Ahead with Bondar Academy: Subscribe to Our YouTube channel for Latest Tech and Education Updates",
            "description": "Who doesn't appreciate high-quality free resources? YouTube serves as an ideal platform for sharing the latest news, updates, and a wealth of tips and tricks in test automation and technology. Keep abreast of these invaluable insights by subscribing to the @bondaracademy YouTube channel.",
            "body": "Who doesn't appreciate high-quality free resources? \n\nYouTube serves as an ideal platform for sharing the latest news, updates, and a wealth of tips and tricks in test automation and technology. \n\nKeep abreast of these invaluable insights by subscribing to our YouTube channel: https://www.youtube.com/@bondaracademy",
            "tagList": [
                "YouTube"
            ],
            "createdAt": "2024-01-27T21:36:32.360Z",
            "updatedAt": "2024-01-27T21:36:32.360Z",
            "favorited": false,
            "favoritesCount": 70,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Explore-the-Latest-in-Learning:-Bondar-Academy-Blog's-Educational-Insights-from-Our-Experts-1",
            "title": "Explore the Latest in Learning: Bondar Academy Blog's Educational Insights from Our Experts",
            "description": "Discover a treasure trove of knowledge on the Bondar Academy blog. Here, we share an array of tips, techniques, and valuable educational materials, all designed to keep you abreast of the latest technological trends and best practices. For easy access and continual learning, consider bookmarking our blog in your browser.",
            "body": "On the Bondar Academy blog, we consistently provide insightful and pertinent updates on the latest in technology, test automation, and industry best practices. For your convenience, we recommend adding our blog to your browser's bookmarks. Our commitment to keeping you informed is reflected in our weekly posts, each focusing on a significant topic of the week.\n\nWe value your input and invite you to contribute to our ever-evolving content. If you have any suggestions or specific topics you'd like us to explore, please feel free to share your ideas in the Bondar Academy Slack workspace. \n\nDiscover our blog here: https://www.bondaracademy.com/blog\n",
            "tagList": [
                "Blog"
            ],
            "createdAt": "2024-01-27T21:34:04.531Z",
            "updatedAt": "2024-01-27T21:34:04.531Z",
            "favorited": false,
            "favoritesCount": 68,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        },
        {
            "slug": "Take-the-Next-Step:-Join-Bondar-Academy-Today-and-Enroll-into-the-class-1",
            "title": "Take the Next Step: Join Bondar Academy Today and Enroll into the class",
            "description": "Are you prepared to transform your educational journey? Begin by signing up at Bondar Academy, then register for our Slack Workspace to start exploring. We offer a range of classes, with some being completely free and others featuring free previews of the initial sections. This allows you to experience our content and teaching approach firsthand, helping you make an informed decision before enrolling in a class.",
            "body": "Are you prepared to transform your educational journey? \n\nBegin by signing up at Bondar Academy, then register for our Slack Workspace to start exploring. We offer a range of classes, with some being completely free and others featuring free previews of the initial sections. This allows you to experience our content and teaching approach firsthand, helping you make an informed decision before enrolling in a class.\n\nClick here to enroll: https://www.bondaracademy.com",
            "tagList": [
                "Enroll",
                "Start for Free"
            ],
            "createdAt": "2024-01-27T21:32:21.056Z",
            "updatedAt": "2024-01-27T21:32:21.056Z",
            "favorited": false,
            "favoritesCount": 80,
            "author": {
                "username": "Artem Bondar",
                "bio": null,
                "image": "https://storage.googleapis.com/bondar-academy-visuals/Android.png",
                "following": false
            }
        }
    ],
    "articlesCount": 10
}
```

### Tag
- URL: https://conduit-api.bondaracademy.com/api/tags
- Status: 304
- Response:
```json
{
    "tags": [
        "Test",
        "Git",
        "Blog",
        "YouTube",
        "Coding",
        "Value-Focused",
        "Bondar Academy",
        "GitHub",
        "Slack",
        "Zoom"
    ]
}
```
## Following flow
### Follow
- URL: https://conduit-api.bondaracademy.com/api/profiles/<username>/follow
- Method: POST
- Status: 200
- Request: {}
- Response
```json
{
    "profile": {
        "username": "AutoPlaywright",
        "bio": null,
        "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
        "following": true
    }
}
```

### Unfollow
- URL: https://conduit-api.bondaracademy.com/api/profiles/<username>t/follow
- Method: Delete
- Status: 200
- Request
```json
{
    "username": "AutoPlaywright",
    "bio": null,
    "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
    "following": false
}
```
- Response
```json
{
    "profile": {
        "username": "AutoPlaywright",
        "bio": null,
        "image": "https://conduit-api.bondaracademy.com/images/smiley-cyrus.jpeg",
        "following": false
    }
}
```

## Câu hỏi phóng vấn
### 1. Test phân quyền (authorization) thế nào? Vì sao test 403 phải kiểm thêm "dữ liệu không đổi" sau khi nhận 403?
- Test phân quyền thế nào

Authorization là kiểm tra một người đã đăng nhập có được làm hành động đó trên tài nguyên đó không. Khác authentication: 401 = chưa xác thực (không có token, token sai), 403 = xác thực rồi nhưng không có quyền.
Cần 2 user thật: user A sở hữu dữ liệu, user B là người khác. Dùng token của B gọi API sửa/xoá dữ liệu của A, rồi kiểm status chính xác (toBe(403), không dùng not.toBe(200)).
Luôn có test dương đi kèm: chính A sửa/xoá được (API-01 A sửa bài → 200). Nếu không, test 403 có thể pass vì API hỏng với mọi người.
Ví dụ AE07: fixture otherUser/otherApi (user B, cùng logic ensureUser với A). API-02: B DELETE bài của A → 403. API-03: B PUT bài của A → 403.

- Vì sao kiểm thêm dữ liệu không đổi

Status chỉ là thứ server nói; dữ liệu mới là thứ server làm. Có thể có bug: server vẫn xoá/sửa rồi mới trả 403, hoặc sửa một phần. Chỉ kiểm status thì test vẫn pass.
Ví dụ AE07: sau 403, A GET lại bài → vẫn 200 và title vẫn là title cũ. Bài học thêm: dữ liệu B gửi phải thật sự khác ({ ...article.data, title: mới }); lần đầu tôi viết { ...article, title } nên B gửi lại dữ liệu y hệt → test pass giả kể cả khi server cho B sửa.
Tự kiểm: tạm cho API-02 dùng authApi (chính A) → test fail vì nhận 204, chứng minh test phân biệt được.

### 2. Khi nào cần nhiều BrowserContext trong 1 test? Context khác page và browser thế nào?
- Khi nào cần nhiều context

Khi một test cần nhiều người dùng cùng lúc, mỗi người có phiên đăng nhập riêng: chat, comment, phân quyền trên UI, một người sửa người kia thấy thay đổi.
Ví dụ AE07-UI-01: B (ortherPage, context mới với token B) viết comment vào bài của A; A (loggedInPage) reload và không thấy comment của B, vì server bondaracademy lọc comment theo người gọi. Không cần logout/login lại giữa 2 user.
Browser – context – page

- Browser: một tiến trình trình duyệt (chromium) đã khởi chạy. Tốn tài nguyên, thường 1 cái cho cả worker.
- Context: một phiên độc lập trong browser, giống cửa sổ ẩn danh: cookie, localStorage, cache riêng. Tạo rẻ và nhanh hơn mở browser mới. Tự tạo bằng browser.newContext() thì phải tự close().
- Page: một tab trong context. Các tab cùng context dùng chung cookie/localStorage.
Ví dụ tự kiểm 3: nếu ortherPage là tab mới trong context của A (page.context().newPage()), hai tab dùng chung một jwtToken (so token 2 tab → true). Test vẫn pass vì init script ghi lại token mỗi lần tải trang, nhưng thật ra hai user không tách biệt: request tiếp theo của tab B có thể chạy bằng token của A. Vì vậy 2 user phải là 2 context.

### 3. route.fulfill thuần, route.fetch + sửa response, route.abort: mỗi cách dùng khi nào? Rủi ro chung của mock?
- route.fulfill thuần: tự dựng toàn bộ response, không gọi server. Dùng để giả trạng thái khó tạo thật: lỗi 500, danh sách rỗng, dữ liệu biên. Ví dụ UI-03: Global Feed → fulfill({ status: 500 }), UI kẹt ở "Loading articles..." và không hiện bài nào (bug UX: không có thông báo lỗi).
- route.fetch + sửa response: gọi server thật, lấy response, sửa một phần rồi fulfill({ response, json }). Giữ nguyên status/headers thật, không phải tự dựng cả JSON. Dùng khi chỉ cần đổi một trường. Ví dụ UI-04: đổi title bài đầu tiên thành Mocked title ..., các bài còn lại vẫn là dữ liệu thật, so với response gốc (không gõ cứng). Lưu ý: luôn gọi fulfill, kể cả khi danh sách rỗng, nếu không request treo tới timeout.
- route.abort: huỷ request, browser không nhận response. Dùng để chặn tài nguyên không cần (quảng cáo ở AE01: googlesyndication, doubleclick) hoặc giả lỗi mạng (mất kết nối, timeout) để xem UI xử lý.
- Rủi ro chung:
  - Mock lệch hợp đồng API thật (schema đổi mà mock không đổi) → test pass nhưng app thật lỗi. Giảm rủi ro: mock có type/satisfies, ưu tiên route.fetch.
  - Mock không chạy (sai pattern URL) mà test vẫn pass → phải tự kiểm: bỏ page.route thì test phải fail (UI-03 nhận 200 thay vì 500, UI-04 realTitles rỗng).
  - Mock quá nhiều → không còn test tích hợp thật; vẫn cần test chạy với backend thật.

### 4. expect.poll, toPass, waitForTimeout khác nhau thế nào? Vì sao waitForTimeout là xấu?
- expect.poll(fn): lặp lại một hàm trả về giá trị rồi áp matcher lên giá trị đó tới khi đúng hoặc hết timeout. Dùng khi dữ liệu thay đổi không đồng bộ, thường là gọi API. Ví dụ UI-02: B bấm ♥ trên UI, poll GET article bằng authApi tới khi favoritesCount === before + 1. Tự kiểm 4: bỏ bấm ♥ → fail sau 10s với "Expected: 1, Received: 0".
- expect(async () => {...}).toPass(): lặp lại cả một khối code có nhiều expect tới khi tất cả pass. Dùng khi cần kiểm nhiều thứ cùng lúc. Ví dụ có thể viết lại UI-02: trong khối, GET bài rồi kiểm cả favoritesCount và favorited.
Khác biệt: poll kiểm 1 giá trị, message rõ giá trị nhận được; toPass bọc nhiều assertion/hành động.
- waitForTimeout(ms): dừng cứng một khoảng cố định, không gắn với điều kiện nào.

- Vì sao xấu:
  - Ngắn quá → flaky: máy CI chậm hơn máy local, dữ liệu chưa kịp đổi thì test fail ngẫu nhiên.
  - Dài quá → luôn chờ hết thời gian dù dữ liệu đã sẵn sàng, cả bộ test chậm.
  - Che nguyên nhân: không biết đang chờ cái gì. poll/toPass/web-first assertion dừng ngay khi điều kiện đúng và báo rõ khi fail.

### 5. Data-driven cho test âm: tổ chức dữ liệu ra sao để thêm case mới không phải sửa code test? Khi nào không nên gộp các case vào một vòng lặp?
- Tổ chức dữ liệu

Mỗi case là một object chứa cả input và expected: tên case, dữ liệu gửi, status, trường lỗi, message. Đặt trong mảng có type + satisfies để TS bắt lỗi thiếu trường.
Test viết một lần: for...of ngoài test(), tên test lấy từ data nên mỗi test có tên khác nhau. Thêm case mới chỉ cần thêm 1 object vào mảng.
Ví dụ AE07-API-05 (registerErrorCases): username rỗng / email sai định dạng / password rỗng → mỗi case kiểm 422 + errors[field] chứa message riêng ("can't be blank", "is invalid"). Dữ liệu duy nhất dùng Date.now() để không trùng.
Khi nào không gộp

Khi case cần setup khác (fixture, dữ liệu có sẵn) hoặc luồng/assertion khác, phải viết if theo loại case trong test → tách test riêng.
Ví dụ AE07: case "email đã tồn tại" cần email thật của workerUser (không gõ cứng) nên tách thành test riêng thay vì nhét vào mảng.
Ví dụ khác: test dương (đăng ký thành công) có assertion khác hoàn toàn, không gộp với test âm.

## NOTE storage
- newContext → false: mỗi user có localStorage riêng.
- Dùng chung context → true: 2 tab chung token, navbar B vẫn hiện tên B nhưng request tiếp theo sẽ chạy bằng token A, test vẫn pass nên lỗi bị che.

# AE08 - INTERNET
## 1. Upload
- Locator: page.getByRole("link",{name:"File upload"})
- Url: https://the-internet.herokuapp.com/upload
- Upload screen
  - Title: File Uploader, locator=page.getByRole("heading",{name:"File Uploader",level:3})
  - Button choose file: locator=page.locator("#file-upload")
  - Button upload: locator=page.getByRole("button",{name:"Upload"}) 
  - Drag and drop: locator=page.locator("drag-drop-upload")
  - Sau khi chọn file -> Tên file get value của button choose file(Tab Accessibility -> Value=ten_file)
  - Tất cả locator không bị ẩn
  - Vùng drag-drop 
    - Không dùng được: Kéo file vào vùng drag-drop -> Upload báo server error
    - Khi click vào vùng drag-drop thì hiển thị popup chọn file giống với khi click button choose file
  - Sau khi upload xong
    - Title: File uploaded!; locatorpage.getByRole("heading",{name:"File Uploaded!",level:3});
    - Tên file: locator=page.locator("#uploaded-files")

# 2.Download
- Locator: page.getByRole("link",{name:"File Download"})
- Url: https://the-internet.herokuapp.com/download
- Download screen
  - Có hiển thị file đã upload ở bước upload
  - Locator: locator=page.getByRole("link",{name:${ten_file}}) 
  - Click vào download file và vẫn giữ nguyên url

## 3. Dialog
- Locator: page.getByRole("link",{name:"Native Dialog"})
- Url: https://the-internet.herokuapp.com/dialog
- Dialog screen
  - Title: Native Dialog, locator=page.getByRole("Native Dialog",{name:"File Uploader",level:3})
  - Button
    - Open modal dailog:
      - Locator=page.getByRole("button",{name:"Open modal dialog"}) 
      - Click
        - Open dialog: locator=page.locator("#modal-dialog")
        - Textbox Your name: locator=this.dialog.getByRole("textbox",{name:"Your name"})
        - Button Confirm: locator=this.dialog.getByRole("button",{name:"Confirm"})
        - Button Cancel: locator=this.dialog.getByRole("button",{name:"Cancel"})
        - Sau khi click confirm
          - thẻ p: locator=page.locator("#result") have text=`Modal dialog closed with: confirm (name: ${your-name}$)`
        - Sau khi click cancel
          - Không input name: locator=page.locator("#result") have text=`Modal dialog closed with: cancel`
          - Nếu input name->cancel: locator=page.locator("#result") have text=`Modal dialog closed with: cancel (name: ${your-name}$)`
    - Open non-model dialog
      - Locator=page.getByRole("button",{name:"Open modal dialog"}) 
      - Sau khi click show dialog
        - locator=locator=page.locator("#non-modal-dialog")
        - Dialog có button close; locator=locator=this.dialog.getByRole("button",{name:"Close"})
        - Thẻ p hiển thị thông báo: locator=page.locator("#result") have text=`Non-modal dialog is open`
        - Sau khi close dialog -> thẻ p hiển thị: locator=page.locator("#result") have text=`Non-modal dialog closed`

## 4. Cửa sổ mới
- Locator=page.getByRole("link",{name:"Multiple Windows"})
- Url: https://the-internet.herokuapp.com/windows
- Screen
  - Title: Opening a new window, locator=page.getByRole("heading",{name:"Opening a new window",leve:3})
  - link: page.getByRole("link",{name:"Click here"})
  - Sau khi click link
    - Open new window
    - Url: https://the-internet.herokuapp.com/windows/new
    - Title: locator=page.getByRole("heading",{name:"New Window",leve:3})

## 5: iframe lồng
- Locator=page.getByRole("link",{name:"Frames"})
- Url: https://the-internet.herokuapp.com/frames
- Screen
  - link Nested Frames: locator=page.getByRole("link",{name:"Nested Frames"})
  - link iFrame: locator=page.getByRole("link",{name:"iFrame"})
    - Click nested frames
      - URL: https://the-internet.herokuapp.com/nested_frames
      - Frame top: locator=page.frameLocator('frame[name="frame-top"]');
        - Frame left: text=LEFT, locator=page.frameLocator('frame[name="frame-left"]');
        - Frame middle: text=MIDDLE, locator=page.frameLocator('frame[name="frame-middle"]');
        - Frame right: text=RIGHT, locator=page.frameLocator('frame[name="frame-right"]');
      - Frame bottom: text=BUTTOM, locator=page.frameLocator('frame[name="frame-bottom"]');
## 6. Dynamic loading
- Locator=page.getByRole("link",{name:"Dynamic Loading"})
- Url: https://the-internet.herokuapp.com/dynamic_loading
- Screen
  - Example 1:
    - Url: https://the-internet.herokuapp.com/dynamic_loading/1
    - Locator=page.getByRole("link",{name:"Example 1: Element on page that is hidden"})
    - Heading: locator=page.getByRole("heading",{name:"Dynamically Loaded Page Elements",leve:3}) -> text='Dynamically Loaded Page Elements'
    - Button start=page.getByRole("button",{name:"Start"})
    - Click button start -> hiển thị text='Hello World!' -> locator=age.getByRole("heading",{name:"Hello World!",leve:4}) -> Mất khoảng 31s để hiển thị text
  - Example 2:
    - Url: https://the-internet.herokuapp.com/dynamic_loading/2
    - Locator=page.getByRole("link",{name:"Example 2: Element rendered after the fact"})
    - Heading: locator=page.getByRole("heading",{name:"Dynamically Loaded Page Elements",leve:3}) -> text='Dynamically Loaded Page Elements'
    - Button start=page.getByRole("button",{name:"Start"})
    - Click button start -> hiển thị text='Hello World!' -> locator=age.getByRole("heading",{name:"Hello World!",leve:4}) -> Mất khoảng 54s để hiển thị text

## 7. Hover
- Locator=page.getByRole("link",{name:"Hovers"})
- Url: https://the-internet.herokuapp.com/hovers
- Trước khi hover
  - Text=name: user1 có trong DOM
  - div class=figcaption -> display=none
- Sau khi hover
  - Hiển thị text=name: user1 -> locator=page.getByRole("heading",{name:"name: user1",leve:5}) 
  - Link view profile, locator=locator=page.getByRole("link",{name:"View profile"}) 
  div class=figcaption -> display=block

## 8. Basic Auth
- Locator=page.getByRole("link",{name:"Basic Auth"})
- User/pass: admin -> text lấy từ locator trên, Basic Auth (user and pass: admin)
- Sau khi click link -> Hiển thị popup nhập username, pass
  - Url: https://the-internet.herokuapp.com/basic_auth
  - Heading=Basic Auth, locator=page.getByRole("heading",{name:"name: Basic Auth",leve:3}) 