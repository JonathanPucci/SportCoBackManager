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

        console.log(res);
      });
  }

  deleteEntity(name, id) {
    return this.http.delete("/api/" + name + "/" + id).toPromise();
  }

  editEntity(name, entity, id) {
    return this.http.put("/api/" + name + "/" + id, entity).toPromise();
  }

  addEntity(name, entity) {
    return this.http.post("/api/" + name + "/", entity).toPromise();
  }
}
