export class SurveyModel {
    id: string;
    title: string;
    description: string;
    type: string;
    attribute: Attribute;
    children: Child[];
}

export class Attribute {
    suffix: string;
    submitButton: string;
    required: boolean;
}

export class Child {
    id: string;
    title: string;
    type: string;
    attribute: Attribute;
    children: Child[];
}
