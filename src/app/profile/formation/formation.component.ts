import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  formationId: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('id');
    console.log(this.formationId)
  }

}
