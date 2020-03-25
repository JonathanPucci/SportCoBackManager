import { Component, OnInit, Input, ViewChild } from "@angular/core";
// import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { IUser } from '../Models/user';
// import { DBOperation } from '../Shared/enum';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/toPromise";

import { EntityService } from "./entity-service.service";
import { Event, User, Puppy } from "../../models";
@Component({
  selector: "app-entity",
  templateUrl: "./entity.component.html",
  styleUrls: ["./entity.component.css"]
})
export class EntityComponent implements OnInit {
  @Input() name: string;
  @Input() properties: string[];
  entities: any[];

  adding: boolean = false;
  editing: boolean[];

  constructor(private entityService: EntityService) {}

  ngOnInit() {
    this.editing = [];
    this.getData();
  }

  getData() {
    this.entityService
      .getAllEntities(this.name)
      .then((res: { entities: any; properties: any[] }) => {
        this.entities = res.entities;
        this.properties = res.properties;
        this.editing = [];
        this.entities.forEach((item, index, array) => {
          this.editing.push(false);
        });
      });
  }

  addEntity() {
    this.adding = true;
    this.editing.push(true);
    this.entities.push({});
  }

  editEntity(i) {
    this.editing[i] = true;
  }

  inputChanged($event, i, property) {
    this.entities[i][property] = $event.target.value;
  }

  doneEditingEntity(i) {
    if (!this.adding) {
      this.entityService
        .editEntity(
          this.name,
          this.entities[i]
        )
        .then(() => {
          this.getData();
          this.editing[i] = false;
        });
    } else {
      this.entityService.addEntity(this.name, this.entities[i]).then(() => {
        this.getData();
        this.editing[i] = false;
        this.adding = false;
        this.entities.pop();
      });
    }
  }

  deleteEntity(i) {
    let entity = this.entities[i];
    let params = entity
    // var params = this.properties[0].toLowerCase() + "=" + entity[this.properties[0]];
    // switch(this.name){
    //   case "eventparticipant":
    //     params += "&event_id=" + entity['Event_ID']
    // }
    this.entityService.deleteEntity(this.name, params).then(any => this.getData());
  }
}
