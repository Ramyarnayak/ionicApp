import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AppRegExp } from '../enums/app-regexp.enum';
import { SubmitUserDetailResponse } from '../models/submit-user-detail-response.model';
import { UserDetail } from '../models/user-detail.model';

@Injectable()
export class SubmitUserDataService {

    hasEmailCaptured: boolean;
    userDetail: UserDetail;

    constructor(private http: HttpClient) { }

    submitUserDetail(userDetails: UserDetail): Observable<SubmitUserDetailResponse> {
        const headers: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Ocp-Apim-Subscription-Key', environment.submitUserDetails.OcpApimSubscriptionKey);

        return this.http.post<SubmitUserDetailResponse>(environment.submitUserDetails.url, userDetails, { headers })
            .pipe(
                catchError(this.handleError),
                tap(() => this.userEmailSubmitted(userDetails.emailAddress))
            );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(error);
    }

    userEmailSubmitted(email: string): void {
        this.hasEmailCaptured = RegExp(AppRegExp.EMAIL_VALIDATOR_REGEXP).test(email);
    }

    setUserData(userDetails: UserDetail) {
        this.userDetail = userDetails;
    }

}
