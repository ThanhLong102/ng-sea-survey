import { BaseModel } from '../../_base/crud';

export class Permission extends BaseModel {
  id: number;
  title: string;
  level: number;
  parentId: number;
  isSelected: boolean;
  name: string;
  // tslint:disable-next-line
  _children: Permission[];

  clear(): void {
    this.title = '';
    this.level = 1;
    this.isSelected = false;
    this.name = '';
    this._children = [];
  }
}
