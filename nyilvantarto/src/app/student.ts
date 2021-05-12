export class Student {
    readonly _id: string;
    public name: string;
    public hourfee: number;
    public balance: number = 0;
    public isModifyingBalance = false;

    constructor() {
        this.name = "";
        this.hourfee = 0;
    }

    public getValidation () {
        if (!this.name) return {isValide: false, validationMsg: "Hiányzó név"};
        if (!this.hourfee) return {isValide: false, validationMsg: "Hiányzó óradíj"};
        if (!Number(this.hourfee) || this.hourfee < 1) return {isValide: false, validationMsg: "Nem megfelelő formátumú óradíj"};
        return {isValide: true, validationMsg: ""}
    }
}
