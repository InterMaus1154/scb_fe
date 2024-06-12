/*
* Booking class representing Booking model
* */
class Booking {
    get bookingStartDate(): string {
        return this._bookingStartDate;
    }

    get bookingEndDate(): string {
        return this._bookingEndDate;
    }

    private _id: string;
    private _customerId: string;
    private _dogId: string;
    private _dogName: string;
    private _bookingStartDate: string;
    private _bookingEndDate: string;
    private _foodTypeId: string;
    private _foodTypeName: string;
    private _foodTypeSpecial: string;
    private _kennelTypeId: string;
    private _kennelTypeName: string;
    private _message: string;
    private _status: string;
    private _feedingFreq: string;
    private _specialFeeding: string;
    private _createdAt: string;

    constructor(id: string, customerId: string, dogId: string, dogName: string, foodTypeId: string, foodTypeName: string, foodTypeSpecial: string, kennelTypeId: string, kennelTypeName: string, bookingStartDate: string, bookingEndDate : string, message: string, status: string, feedingFreq: string, specialFeeding: string, createdAt: string) {
        this._id = id;
        this._customerId = customerId;
        this._dogId = dogId;
        this._dogName = dogName;
        this._foodTypeId = foodTypeId;
        this._foodTypeName = foodTypeName;
        this._foodTypeSpecial = foodTypeSpecial;
        this._kennelTypeId = kennelTypeId;
        this._kennelTypeName = kennelTypeName;
        this._message = message;
        this._status = status;
        this._feedingFreq = feedingFreq;
        this._specialFeeding = specialFeeding;
        this._createdAt = createdAt;
        this._bookingStartDate = bookingStartDate;
        this._bookingEndDate = bookingEndDate;
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get dogId(): string {
        return this._dogId;
    }

    get dogName(): string {
        return this._dogName;
    }

    get foodTypeId(): string {
        return this._foodTypeId;
    }

    get foodTypeName(): string {
        return this._foodTypeName;
    }

    get foodTypeSpecial(): string {
        return this._foodTypeSpecial;
    }

    get kennelTypeId(): string {
        return this._kennelTypeId;
    }

    get kennelTypeName(): string {
        return this._kennelTypeName;
    }

    get message(): string {
        return this._message;
    }

    get status(): string {
        return this._status;
    }

    get specialFeeding(): string {
        return this._specialFeeding;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get feedingFreq(): string {
        return this._feedingFreq;
    }

}

export default Booking;