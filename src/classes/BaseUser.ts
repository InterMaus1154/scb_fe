abstract class BaseUser {

    private _id: string;
    private _email: string;
    private _firstname: string;
    private _lastname: string;
    private _dateOfBirth: string;
    private _gender: string;
    private _phoneNumber: string;
    private _addressLineFirst: string;
    private _addressLineSecond: string | null;
    private _city: string;
    private _postcode: string;
    private _county: string | null;
    private _createdAt: string;

    protected constructor(id: string, email: string, phoneNumber:string, firstname: string, lastname: string, dateOfBirth: string, gender: string, addressLineFirst: string, addressLineSecond: string | null, city: string, postcode: string, county: string | null, createdAt: string) {
        this._id = id;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._firstname = firstname;
        this._lastname = lastname;
        this._dateOfBirth = dateOfBirth;
        this._gender = gender;
        this._addressLineFirst = addressLineFirst;
        this._addressLineSecond = addressLineSecond;
        this._city = city;
        this._postcode = postcode;
        this._county = county;
        this._createdAt = createdAt;
    }


    get id(): string {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    get firstname(): string {
        return this._firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    get dateOfBirth(): string {
        return this._dateOfBirth;
    }

    get gender(): string {
        return this._gender;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    get addressLineFirst(): string {
        return this._addressLineFirst;
    }

    get addressLineSecond(): string | null {
        return this._addressLineSecond;
    }

    get city(): string {
        return this._city;
    }

    get postcode(): string {
        return this._postcode;
    }

    get county(): string | null {
        return this._county;
    }

    get createdAt(): string {
        return this._createdAt;
    }
}

export default BaseUser;