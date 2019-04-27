import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/service/store/app-data.service';
import { TSMap } from 'typescript-map';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  jobs:any = [];
  show:any = [];
  id:string;
  data:TSMap<String,Object>;
  user:User;
  constructor(public rest:ApplicantService, private route: ActivatedRoute, private router: Router, private appDataService: AppDataService) { }

  /**
   * Initialize data on component initialization
   */
  ngOnInit() {
    this.data = this.appDataService.getData();
    this.user = Object.assign(new User("",""),this.data.get('user'));
    //this.getJobs();
    this.getCandidate();
  }
  /**
   * Get all jobs applied by the candidate
   */
  getJobs(){
    this.jobs = [];
    this.rest.getJobs().subscribe((data: {}) => {
      this.jobs = data[0].concat(data[1]);
      this.id = localStorage.getItem("id");
      this.jobs.forEach( job => {
        if( this.id === job.jobid){
          this.show = this.show.concat(job);
        }
      });
    });
  }

/**
   * Get all jobs applied by the candidate
   */
  getCandidate(){
    this.jobs = [];
    console.log("user");
    console.log(this.user);
    this.rest.getCandidate().subscribe( data => {
      
      data[0].forEach( (list) => {
        console.log(list);
        if(list.email === this.user.email){
          console.log("email");
          this.jobs = this.jobs.concat(list);
          console.log(this.jobs);
        }
        /*list.forEach( (job:Object) => {
            console.log(job);
        })*/
      });
      data[1].forEach( (list) => {
        if(list.email === this.user.email){
          this.jobs = this.jobs.concat(list);
        }
        /*list.forEach( (job:Object) => {
            console.log(job);
        })*/
      });
      console.log(this.jobs);
    });
  }
}
