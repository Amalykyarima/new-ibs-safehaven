type AccountType =
    | "Savings"
    | "Current";

export class AddMainAccount {
    suffix: string = "";
    accountType: AccountType = "Current";
    metadata: object = {}
}

export class AddSubAccount {
    firstName: string = "";
    lastName: string = "";
    phoneNumber: string = "";
    emailAddress: string = "";
    externalReference: string = "AC_"+ Math.random().toString(36).substring(2, 7);
    bvn: string ="";
    metadata: object = {}
}
