import { Component, OnInit } from '@angular/core';

import { IRecord } from '../record.interface';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.html',
  styleUrls: ['./record-list.css']
})
export class RecordListComponent implements OnInit {
  records: IRecord [];

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.recordsService.getRecords().subscribe(next => {
      this.records = next;
      next.forEach(element => {
        console.log(element.id);
      });
    },
  error => {
    alert(error);
  });
  }
}
