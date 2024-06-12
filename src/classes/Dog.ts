class Dog {
    private _id: string;
    private _customerId: string;
    private _callerName: string;
    private _officialName: string | null;
    private _breed: string;
    private _dateOfBirth: string;
    private _chipNumber: string;
    private _vetName: string;
    private _lastFleaTreatmentDate: string;
    private _nextFleaTreatmentDate: string | null;
    private _lastVaccinationDate: string;
    private _nextVaccinationDate: string | null;
    private _passportNumber: string | null;
    private _favouriteFood: string | null;
    private _emergencyPhoneNumber: string;
    private _other: string | null;
    private _createdAt: string;

    constructor(id: string, customerId: string, callerName: string, officialName: string | null, breed: string, dateOfBirth: string, chipNumber: string, vetName: string, lastFleaTreatmentDate: string, nextFleaTreatmentDate: string | null, lastVaccinationDate: string, nextVaccinationDate: string | null, passportNumber: string | null, favouriteFood: string | null, emergencyPhoneNumber: string, other: string | null, createdAt: string) {
        this._id = id;
        this._customerId = customerId;
        this._callerName = callerName;
        this._officialName = officialName;
        this._breed = breed;
        this._dateOfBirth = dateOfBirth;
        this._chipNumber = chipNumber;
        this._vetName = vetName;
        this._lastFleaTreatmentDate = lastFleaTreatmentDate;
        this._nextFleaTreatmentDate = nextFleaTreatmentDate;
        this._lastVaccinationDate = lastVaccinationDate;
        this._nextVaccinationDate = nextVaccinationDate;
        this._passportNumber = passportNumber;
        this._favouriteFood = favouriteFood;
        this._emergencyPhoneNumber = emergencyPhoneNumber;
        this._other = other;
        this._createdAt = createdAt;
    }


    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get callerName(): string {
        return this._callerName;
    }

    get officialName(): string | null {
        return this._officialName;
    }

    get breed(): string {
        return this._breed;
    }

    get dateOfBirth(): string {
        return this._dateOfBirth;
    }

    get chipNumber(): string {
        return this._chipNumber;
    }

    get vetName(): string {
        return this._vetName;
    }

    get lastFleaTreatmentDate(): string {
        return this._lastFleaTreatmentDate;
    }

    get nextFleaTreatmentDate(): string | null {
        return this._nextFleaTreatmentDate;
    }

    get lastVaccinationDate(): string {
        return this._lastVaccinationDate;
    }

    get nextVaccinationDate(): string | null {
        return this._nextVaccinationDate;
    }

    get passportNumber(): string | null {
        return this._passportNumber;
    }

    get favouriteFood(): string | null {
        return this._favouriteFood;
    }

    get emergencyPhoneNumber(): string {
        return this._emergencyPhoneNumber;
    }

    get other(): string | null {
        return this._other;
    }

    get createdAt(): string {
        return this._createdAt;
    }
}

export default Dog;