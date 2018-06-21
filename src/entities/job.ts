import {Entity, EntityBuilder, Type} from "@decahedron/entity";
import {Moment} from "moment";
import * as moment from "moment";

export class Job extends Entity {

  public id = '';
  public createdAt: Moment|null = null;

  @Type(String, 'otsikko')
  public title = '';
  @Type(String, 'kuvausteksti')
  public description = '';
  @Type(String, 'tyonantajanNimi')
  public company = '';

  fromJson (jsonData: any): this {
    super.fromJson(jsonData);

    if (jsonData.hasOwnProperty('ilmoituspaivamaara')) {
      this.createdAt = moment(jsonData['ilmoituspaivamaara']);
    }

    return this;
  }

}