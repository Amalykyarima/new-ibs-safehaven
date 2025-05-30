export class ClientDocuments {
	passportUrl: string = "";
	idCardUrl: string = "";
	signatureUrl: string = "";
	certificateUrl: string = "";
	mematUrl: string = "";
	boardResolutionUrl: string = "";
    utilityBillUrl: string = "";
}

export class UpdateClient {
    emailAddress: string = "";
    phoneNumber: string = "";
    tin: string = "";
    nextOfKin: any = {};
    employmentInformation:any = {};
    documents:ClientDocuments = new ClientDocuments();
    notificationSettings: any = {}
    constructor() {
        this.notificationSettings = {
            loginNotification: false,
            newsletter: false,
            productNotification: false,
            webhookNotifcation: {
                enabled: false,
                url: "",
            }
        }
    }
}
