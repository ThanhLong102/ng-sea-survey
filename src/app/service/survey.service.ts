import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ENDPOINT_URL} from '../constant/app.constants';
import {ProjectRequestModel} from '../model/projectRequest.model';
import {ProjectViewModel} from '../model/projectView.model';
import {ResponseData} from '../model/responseData';


@Injectable({
    providedIn: 'root'
})
export class SurveyService {

    public formData = new FormData();

    resetForm() {
        this.formData = new FormData();
    }

    constructor(private http: HttpClient) {
    }
    getCustomHeaders(): HttpHeaders {
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZ2poZ2pnaiIsImF1dGgiOiJMREFQX1VTRVJfREVGQVVMVCIsInNiX2siOiJmMTEwMDc2YmM2ZTA1NzY4Iiwic2JfZHQiOiJhYmZmNTVlYTM0Mjc1YjczM2MyZTM3ZjYxZGEyMWI4OTU0YjQzY2ZjYmNmODAyMTI2YTkwZGU4MTI1MTcwZWE0NTNhMWEzZjc2MzJmOGE3NjhlN2U4YmY5ZmI0ZmFiODk5MTk1YzUwNjUxZDIxM2RlNDg4ZDI2MGJjNWUwN2Y5NzU0YjIzMGRmYWYzMzViNzJiM2M3MzUzNTQ1ZTI5OGEyNGMzMmViZmFhMmJmMTE2MGExNDgxZmI0ZWNiNmNjNzJhZGY5ZDcyZGZjODUwNGI2NjRkNTA3YzM2NWU3MDMyNjY3NDVjY2ZhODc2YmNhNjUwMzExMWE2YzgzMGZhNWU3OWMwY2FlODEzMGY3YzUwMDk1ZTcwODNmM2MxMmYxMGIiLCJleHAiOjE2NjEzNTcwMDh9.aBum4RgkpxwZFbmcdjdMf_6XHc5oJCjyqek58PgQtXyAU4xO6PJrZ2wKH8fSvZk9Yd516FsEIMnpFIbnbTBGiw';
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .set('Cookie', 'sk-token=' + token + '; Path=/; HttpOnly');
    }

    getCustomHeadersUpload(): HttpHeaders {
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZ2poZ2pnaiIsImF1dGgiOiJMREFQX1VTRVJfREVGQVVMVCIsInNiX2siOiJmMTEwMDc2YmM2ZTA1NzY4Iiwic2JfZHQiOiJhYmZmNTVlYTM0Mjc1YjczM2MyZTM3ZjYxZGEyMWI4OTU0YjQzY2ZjYmNmODAyMTI2YTkwZGU4MTI1MTcwZWE0NTNhMWEzZjc2MzJmOGE3NjhlN2U4YmY5ZmI0ZmFiODk5MTk1YzUwNjUxZDIxM2RlNDg4ZDI2MGJjNWUwN2Y5NzU0YjIzMGRmYWYzMzViNzJiM2M3MzUzNTQ1ZTI5OGEyNGMzMmViZmFhMmJmMTE2MGExNDgxZmI0ZWNiNmNjNzJhZGY5ZDcyZGZjODUwNGI2NjRkNTA3YzM2NWU3MDMyNjY3NDVjY2ZhODc2YmNhNjUwMzExMWE2YzgzMGZhNWU3OWMwY2FlODEzMGY3YzUwMDk1ZTcwODNmM2MxMmYxMGIiLCJleHAiOjE2NjEzNTcwMDh9.aBum4RgkpxwZFbmcdjdMf_6XHc5oJCjyqek58PgQtXyAU4xO6PJrZ2wKH8fSvZk9Yd516FsEIMnpFIbnbTBGiw';
        return new HttpHeaders()
            .set('reportProgress', 'true')
            .set('responseType', 'json')
            .set('Authorization', token)
            .set('Cookie', 'sk-token=' + token + '; Path=/; HttpOnly');
    }

    create(project: ProjectRequestModel): Observable<ProjectViewModel> {

        return this.http.post<any>(`${ENDPOINT_URL}/projects`, project, { headers: this.getCustomHeaders(), withCredentials: true });
    }

    update(project: ProjectRequestModel) {
        // @ts-ignore
        return this.http.patch(`${ENDPOINT_URL}/projects`, project, { headers: this.getCustomHeaders(), withCredentials: true });
    }

    getProject(id: string): Observable<ResponseData> {
        return this.http.get<ResponseData>(`${ENDPOINT_URL}/projects/${id}`,
            { headers: this.getCustomHeaders(), withCredentials: true });
    }

    postUpload(uploadFileRequest: any): Observable<any> {
        this.resetForm();
        this.formData.append('file', uploadFileRequest.file);
        this.formData.append('basePath', uploadFileRequest.basePath);
        this.formData.append('storageType', uploadFileRequest.storageType);
        return this.http.post<any>(`${ENDPOINT_URL}/files`, this.formData,
            { headers: this.getCustomHeadersUpload(), withCredentials: true });
    }
}
