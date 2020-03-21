import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class EntityService {
  constructor(private http: HttpClient) {}

  getAllEntities(name) {
    return this.http
      .get("/api/" + name + "/")
      .toPromise()
      .then(res => {
        let entities = res;
        var properties = [];
        console.log(res);
        /*if (entities.length > 0) {
          for (var prop in res.data[0]) {
            properties.push(prop);
          }
        }*/
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
