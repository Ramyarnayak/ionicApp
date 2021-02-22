export class UserDetail {

    emailAddress: string;
    optOut: boolean = false;
    score40ResultsConsolidatedCode: string;
    score40ResultsSummary: string;
    score40Results: boolean;
    articleSubscription: boolean;
    firstName?: string;
    lastName?: string;

    constructor(
        emailAddress: string,
        score40ResultsConsolidatedCode?: string,
        score40ResultsSummary?: string,
        score40Results?: boolean,
        articleSubscription?: boolean,
        optOut?: boolean,
        firstName?: string,
        lastName?: string
    ) {

        this.emailAddress = emailAddress;

        this.score40ResultsConsolidatedCode = score40ResultsConsolidatedCode;

        this.score40ResultsSummary = score40ResultsSummary;

        this.score40Results = score40Results;

        this.articleSubscription = articleSubscription;

        this.optOut = optOut;

        if (firstName) {
            this.firstName = firstName;
        }

        if (lastName) {
            this.lastName = lastName;
        }
    }
}
