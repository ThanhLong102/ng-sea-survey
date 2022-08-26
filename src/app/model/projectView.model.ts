import {ProjectModeEnum} from './projectModeEnum';
import {SurveySchemaModel} from './surveySchema.model';

export class ProjectViewModel {
    id: string;
    name: string;
    mode: ProjectModeEnum;
    status: number;
    survey: SurveySchemaModel;
    total: number;
}
