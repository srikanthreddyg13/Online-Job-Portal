import { Injectable, Input, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import { AddDataAction } from './app.action';
import { PersistenceService, StorageType } from 'angular-persistence';
import { TSMap } from "typescript-map"
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  
  /**
   * map for storing persistent data
   */
  map : TSMap<String,Object>;
  mapSubject= new Subject<TSMap<String,Object>>();
  constructor( private store: Store<AppState>, private persistenceService: PersistenceService) { 
   
    this.map = new TSMap<String,Object>();
   
  }

  setMap(key:string,value:Object){
    this.map.set(key,value);
  }
/**
 * store data in session
 */
  saveData = () => {
    let val: string = JSON.stringify(this.map.toJSON());
    console.log("Storage type 1");
    this.persistenceService.set("data",val,{type:StorageType.SESSION});
    this.mapSubject.next(this.map);
  }

  /**
   * Get persistent data
   */
  getData():TSMap<String, Object> {
    //let obj = Object.assign(Map,this.persistenceService.get('data',StorageType.SESSION))
    //let obj = (this.persistenceService.get('data',StorageType.SESSION)) ? this.persistenceService.get('data',StorageType.SESSION): null;
    //console.log( JSON.parse(this.persistenceService.get('data',StorageType.SESSION)) );
    //let test = new Map<String,Object>();

    let data = (this.persistenceService.get("data",StorageType.SESSION) === undefined)? null:this.persistenceService.get("data",StorageType.SESSION);
    if(data != null){
      this.map.fromJSON(JSON.parse(data));
      /*
      this.store.pipe( select('data') ).subscribe( data => {
        if(data != undefined){
          this.map = data;
        }
      });*/
    }
    return this.map;
  }
/**
 * Get data from events
 */
  getSubject(){
    return this.mapSubject;
  }
/**
 * Reset email
 */
  clearData(key:string,val:Object):void{
    let data = this.persistenceService.get('data',StorageType.SESSION);
    this.map.fromJSON(JSON.parse(data));
    this.setMap(key,val);
    this.saveData();
  }
}
