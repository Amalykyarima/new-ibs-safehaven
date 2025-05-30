


export class NewApp {
    name: string = "";
    description?: string;
    scopes: ["READ"] | ["READ", "WRITE"] | ["READ", "WRITE", "PAY"] = ["READ"];
    grantType: "client_credentials" | "authorization_code" = "client_credentials"
    publicKey: string = "";
    redirectUri?: Array<string>;
    websiteUrl?: string;
    iconUrl?: string;
}

export class UpdateApp {
    name: string = "";
    description?: string;
    scopes: ["READ"] | ["READ", "WRITE"] | ["READ", "WRITE", "PAY"] = ["READ"];
    grantType: "client_credentials" | "authorization_code" = "client_credentials"
    publicKey: string = "";
    redirectUri?: Array<string>;
    websiteUrl?: string;
    iconUrl?: string;
}
