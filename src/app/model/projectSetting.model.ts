import {ProjectModeEnum} from './projectModeEnum';

export class ProjectSettingModel {
    status: number;
    mode: ProjectModeEnum;

    answerSetting: AnswerSetting = new AnswerSetting();

    submittedSetting: SubmittedSetting = new SubmittedSetting();

    examSetting: ExamSetting = new ExamSetting();

}

export class AnswerSetting {

}

export class SubmittedSetting {

}

export class ExamSetting {

}

