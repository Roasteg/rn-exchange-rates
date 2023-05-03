class Rate {
    amount: number;
    base: string;
    date: string;
    rates: {
        [key: string]: number;
    }

    constructor(amount: number, base: string, date: string, rates: {[key: string]: number}){
        this.amount = amount;
        this.base = base;
        this.date = date;
        this.rates = rates;
    }
}