import { Component, OnInit } from '@angular/core';
import { FriendService } from '../service/friend.service';

@Component({
  selector: 'app-newspeed-b',
  templateUrl: './newspeed-b.component.html',
  styleUrls: ['./newspeed-b.component.css']
})
export class NewspeedBComponent implements OnInit {
  allUserNumber: number;
  row: number;
  arr: Array<any>;

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.friendService.getUserList().subscribe((res: any) => {
      this.allUserNumber = res.user_num;
      this.arr = res.rows;
      this.row = this.arr.length;
    });
  }
}
