import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";

interface ResFromApi {
    data : Array<listFromApi>
}

interface listFromApi {
    data : Array<Object>
}

@Injectable()
export class EntityService {
  constructor(private http: HttpClient) {}

  getAllEntities(name) {
    return this.http
      .get("/api/" + name + "/")
      .toPromise()
      .then(res => {
        let entities = (<ResFromApi>res).data;
        var properties = [];
         if(entities.length > 0) {
          for (var prop in (<ResFromApi>res).data[0]) {
            properties.push(prop);
          }
        }
        return { entities: entities, properties: properties };
      });
  }

  deleteEntity(name, params) {
    console.log("delete" + JSON.stringify(params))
    return this.http.delete("/api/" + name + "/" + JSON.stringify(params)).toPromise();
  }

  editEntity(name, entity) {
    console.log("edit" + JSON.stringify(entity))
    return this.http.put("/api/" + name + "/", entity).toPromise();
  }

  addEntity(name, entity) {
    console.log("create"+ JSON.stringify(entity))

    return this.http.post("/api/" + name + "/", entity).toPromise();
  }
}
