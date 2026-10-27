import { Locator, Page } from "playwright";
import { NewUser } from "../types/NewUser";

export class SignUpPage{
    readonly url="/signup";
    readonly page: Page;
    readonly titleMr: Locator;
    readonly titleMrs: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly dayDOB: Locator;
    readonly monthDOB: Locator;
    readonly yearDOB: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly phone: Locator;
    readonly createAccountBtn: Locator;

    constructor(page:Page){
        this.page=page;
        this.titleMr=this.page.getByRole("radio",{name:"Mr."});
        this.titleMrs=this.page.getByRole("radio",{name:"Mrs."});
        this.name=this.page.getByRole("textbox",{name:"Name"});
        this.email=this.page.getByRole("textbox",{name:"Email"});
        this.password=this.page.getByRole("textbox",{name:"Password"});
        this.dayDOB=this.page.locator("#days");
        this.monthDOB=this.page.locator("#months");
        this.yearDOB=this.page.locator("#years");
        this.firstName=this.page.getByRole("textbox",{name:"First name *"});
        this.lastName=this.page.getByRole("textbox",{name:"Last name *"});
        this.company=this.page.locator("#company");
        this.address=this.page.getByRole("textbox",{name:"Address * (Street address, P.O. Box, Company name, etc.)"});
        this.address2=this.page.getByRole("textbox",{name:"Address 2"});
        this.country=this.page.getByRole("combobox",{name:"Country *"});
        this.state=this.page.getByRole("textbox",{name:"State *"});
        this.city=this.page.getByRole("textbox",{name:"City * Zipcode *"});
        this.zipcode=this.page.locator("#zipcode");
        this.phone=this.page.getByRole("textbox",{name:"Mobile Number *"});
        this.createAccountBtn=this.page.getByRole("button",{name:"Create Account"});
    }

    async registerUser(newUser:NewUser){
        //Title
        if(newUser.title==='Mr'){
            await this.titleMr.click();
        }else{
            await this.titleMrs.click();
        };
        await this.password.fill(newUser.password);
        await this.dayDOB.selectOption(newUser.birth_date);
        await this.monthDOB.selectOption(newUser.birth_month);
        await this.yearDOB.selectOption(newUser.birth_year);
        await this.firstName.fill(newUser.firstname);
        await this.lastName.fill(newUser.lastname);
        await this.company.fill(newUser.company);
        await this.address.fill(newUser.address1);
        await this.address2.fill(newUser.address2);
        await this.country.selectOption(newUser.country);
        await this.state.fill(newUser.state);
        await this.city.fill(newUser.city);
        await this.zipcode.fill(newUser.zipcode);
        await this.phone.fill(newUser.mobile_number);
        await this.createAccountBtn.click();
    }
}