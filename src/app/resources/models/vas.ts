export class Vas {
}

export class verifyVas {
    serviceCategoryId: string = "";
    entityNumber: string = "";
}

export class PayCableOrUtility {
    serviceCategoryId: string = "";
    bundleCode?: string = "";
    amount: string = "";
    debitAccountNumber: string = "";
    channel: "POS" | "ATM" | "WEB" = "WEB";
    cardNumber?: string = "";
    meterNumber?: string = "";
    vendType?: "POSTPAID" | "PREPAID" = "PREPAID";
    saveAccount: boolean = false;
    autoRenew: boolean = false;
    renewalInterval?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}

export class PayAirtimeOrData {
    serviceCategoryId: string = "";
    amount: number = 0;
    channel: "POS" | "ATM" | "WEB" = "WEB";
    debitAccountNumber: string = "";
    phoneNumber: string = "";
    statusUrl: string = "empty";
    bundleCode?: string = "";
    saveAccount: boolean = false;
    autoRenew: boolean = false;
    renewalInterval?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}
