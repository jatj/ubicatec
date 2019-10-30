import { Model } from 'objection';
import { DbErrors } from 'objection-db-errors';

export class BaseModel extends DbErrors(Model) {

}
