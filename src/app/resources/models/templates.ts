export class Templates {
    info: any = {};
    table: string = '';
    statementTemplateString: string =``;
    statementTemplateStringSecondPage: string =``;
    constructor() {
    }

    setStatementHTML() {
        this.statementTemplateString =
        `<link href="assets/template/STATEMENT 01.css" rel="stylesheet" />
    <div class="statement-body">
        <section class="top">
            <div class="left">
                <img src="assets/images/logo2.svg" />
            </div>
            <div class="right">
                <p class="heading">${this.info.name}</p>
                <p class="subheading">Customer Account Statement</p>
            </div>
        </section>
        <section class="content">
            <div class="top-section">
                <div class="left">
                    <div class="info-content">
                        <div class="info">
                            <p class="title">Address</p>
                            <p class="description">${this.info.address}</p>
                        </div>
                        <div class="info">
                            <p class="title">Currency</p>
                            <p class="description">${this.info.currency}</p>
                        </div>
                    </div>
                    <div class="info-content">
                        <div class="info">
                            <p class="title">Period </p>
                            <p class="description">${this.info.fromDate} - ${this.info.toDate}</p>
                        </div>
                        <div class="info">
                            <p class="title">Print Date</p>
                            <p class="description">${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="info-content">
                        <div class="info">
                            <p class="title">Account Number</p>
                            <p class="description">${this.info.accountNumber}</p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="balance-content">
                        <p class="title">Opening Balance </p>
                        <p class="amount">${this.info.openingBalance}</p>
                    </div>
                    <div class="balance-content">
                        <p class="title">Closing Balance</p>
                        <p class="amount">${this.info.closingBalance}</p>
                    </div>
                </div>
            </div>
            <table rules=none>${this.table}</table>
            <div class="bottom">
                <div class="left">
                    <p class="title">DISCLAIMER</p>
                    <p class="description">This is a computer generated statement requiring no signature and it represents
                        our records of your
                        transactions with us. Any exceptions must be advised to the bank immediately. If we do not hear from
                        you within 2 weeks. We will assume that you are in agreement with the details stated. All products
                        are subject to the bank's terms and conditions. For any enquiries, please contact our business
                        concierge team on 0700SAFEHAVEN (0700 7233 42836) or send an email to hello@safehavenmfb.com.</p>
                </div>
                <div class="right">
                    <div class="images"><img src="assets/images/stamp.svg" /></div>
                </div>
            </div>
        </section>
    </div>`;

    this.statementTemplateStringSecondPage =
        `<link href="assets/template/STATEMENT 01.css" rel="stylesheet" />
    <div class="statement-body">
        <section class="top" style="padding:48px">
            <div class="left">
                <img src="assets/images/logo2.svg" />
            </div>
            <div class="right">
                <p class="heading">${this.info.name}</p>
                <p class="subheading">Customer Account Statement</p>
            </div>
        </section>
        <section class="content">
            <div class="top-section" style="visibility:hidden">
                <div class="left">
                    <div class="info-content">
                        <div class="info">
                            <p class="title">Address</p>
                            <p class="description">${this.info.address}</p>
                        </div>
                        <div class="info">
                            <p class="title">Currency</p>
                            <p class="description">${this.info.currency}</p>
                        </div>
                    </div>
                    <div class="info-content">
                        <div class="info">
                            <p class="title">Period </p>
                            <p class="description">${this.info.fromDate} - ${this.info.toDate}</p>
                        </div>
                        <div class="info">
                            <p class="title">Print Date</p>
                            <p class="description">${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="info-content">
                        <div class="info">
                            <p class="title">Account Number</p>
                            <p class="description">${this.info.accountNumber}</p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="balance-content">
                        <p class="title">Opening Balance </p>
                        <p class="amount">${this.info.openingBalance}</p>
                    </div>
                    <div class="balance-content">
                        <p class="title">Closing Balance</p>
                        <p class="amount">${this.info.closingBalance}</p>
                    </div>
                </div>
            </div>
            <table rules=none>${this.table}</table>
            <div class="bottom">
                <div class="left">
                    <p class="title">DISCLAIMER</p>
                    <p class="description">This is a computer generated statement requiring no signature and it represents
                        our records of your
                        transactions with us. Any exceptions must be advised to the bank immediately. If we do not hear from
                        you within 2 weeks. We will assume that you are in agreement with the details stated. All products
                        are subject to the bank's terms and conditions. For any enquiries, please contact our business
                        concierge team on 0700SAFEHAVEN (0700 7233 42836) or send an email to hello@safehavenmfb.com.</p>
                </div>
                <div class="right">
                    <div class="images"><img src="assets/images/stamp.svg" /></div>
                </div>
            </div>
        </section>
    </div>`;
    }
}
