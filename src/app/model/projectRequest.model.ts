import {ProjectModeEnum} from './projectModeEnum';
import {SurveySchemaModel} from './surveySchema.model';
import {ProjectSettingModel} from './projectSetting.model';

export class ProjectRequestModel {
    id: string;
    name: string;
    mode:  ProjectModeEnum;
    survey: SurveySchemaModel;
    setting: ProjectSettingModel;
    status: number;
    belongGroup: string;
    settingKey: string;
    settingValue: any;
}
