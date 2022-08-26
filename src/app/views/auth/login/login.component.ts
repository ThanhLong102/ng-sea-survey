import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../core/auth/_services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    // Public params
    loginForm: FormGroup;
    loading = false;
    errors: any = [];

    private unsubscribe: Subject<any>;

    returnUrl: any;
    title: string;
    description: string;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
    ) {
        this.unsubscribe = new Subject();
    }

    ngOnInit(): void {
        this.initLoginForm();

        // redirect back to the returnUrl before login
        this.route.queryParams.subscribe(params => {
            this.returnUrl = params.returnUrl || '/';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        this.loading = false;
    }

    /**
     * Form initalization
     * Default params, validators
     */
    initLoginForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(25)
            ])
            ],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ]
        });
    }

    /**
     * Form Submit
     */
    submit() {
        const controls = this.loginForm.controls;
        /** check form */
        if (this.loginForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.loading = true;

        this.loginService.login({
            username: controls.username.value.trim(),
            password: controls.password.value,
            rememberMe: false
        }).subscribe(
            (response) => {
                this.router.navigate(['home']);
            },
            (errorBody) => {
                console.log(errorBody);
            }
        );
    }

    /**
     * Checking control validation
     *
     * @param controlName: string => Equals to formControlName
     * @param validationType: string => Equals to valitors name
     */
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.loginForm.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

    openDialog(type?: number) {
    }

}
