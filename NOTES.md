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