import BaseUser from "./BaseUser.ts";


class StaffUser extends BaseUser {

    private  _employeeNumber: string;
    private  _role: string;
    private  _personal: string | null;

    constructor(employeeNumber: string, role: string, personal: string | null, id: string, email: string, phoneNumber: string, firstname: string, lastname: string, dateOfBirth: string, gender: string, addressLineFirst: string, addressLineSecond: string | null, city: string, postcode: string, county: string | null, createdAt: string) {
        super(id, email, phoneNumber, firstname, lastname, dateOfBirth, gender, addressLineFirst, addressLineSecond, city, postcode, county, createdAt);
        this._employeeNumber = employeeNumber;
        this._role = role;
        this._personal = personal;

    }

    get employeeNumber(): string {
        return this._employeeNumber;
    }

    get role(): string {
        return this._role;
    }

    get personal(): string | null {
        return this._personal;
    }
}


export default StaffUser;

