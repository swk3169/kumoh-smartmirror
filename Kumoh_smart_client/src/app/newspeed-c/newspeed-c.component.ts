import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../service/timeline.service';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newspeed-c',
  templateUrl: './newspeed-c.component.html',
  styleUrls: ['./newspeed-c.component.css']
})

export class NewspeedCComponent implements OnInit {
  isLogin: string;
  user_id: string; //현재 접속한 계정의 user_id
  user_name: string;
  user_image: string;
  user_email: string;

  select_user_id: string;

  totalCount: number;
  page: number;
  startPage: number;
  endPage: number;
  totalPage: number;
  numOfPage: number;
  pageArr: Array<any>;

  //row: number;
  arr: Array<any>;

  //commentRow: number;
  commentArr: Array<any>;

  //likeListRow: number;
  likeListArr: Array<any>;


  commentForm: FormGroup;
  currentContentIdx: number; //댓글을 로드할 때 댓글 작성을 염두하여 댓글 번호를 변수에 미리 등록하기 위한 용도

  isLove: boolean;

  constructor(private fb: FormBuilder, private router: Router, private timelineService: TimelineService, private authenticateService: AuthenticateService) {
    this.page = 1;
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      comment: ['']
    });

    if (!sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/main']);
    }

    var sessionData = sessionStorage.getItem('currentUser');

    this.authenticateService.isLogin(sessionData).subscribe((res: any) => {
      this.isLogin = res.status;

      if (this.isLogin == "illegal") {
        sessionStorage.clear();
        alert("잘못 된 세션입니다. 다시 로그인 해주세요");
        this.router.navigate(['/main']);
      }

      this.user_id = res.user_id;
      this.user_name = res.user_name;
      this.user_image = res.user_image;
      this.user_email = res.user_email;
      this.select_user_id = this.user_id;


      this.timelineService.loadSpecificTimeline(this.user_id, this.select_user_id, this.page).subscribe((res: any) => {
        this.arr = res.rows;
        //this.row = this.arr.length;
        this.startPage = res.startPage;
        this.endPage = res.endPage;
        this.numOfPage = this.endPage - this.startPage + 1; //html에서 반복문을 수행하기 위해 현재 페이지 기준 전페 페이징 숫자를 계산
        this.pageArr = new Array(this.numOfPage);
        this.totalCount = res.totalCount;
        console.log(res.rows);
      });
    });
  }

  onLoadPage(page: number) {
    this.timelineService.loadSpecificTimeline(this.user_id, this.select_user_id, page).subscribe((res: any) => {
      this.arr = res.rows;
      //this.row = this.arr.length;
      this.page = res.page;
      this.startPage = res.startPage;
      this.endPage = res.endPage;
      this.numOfPage = this.endPage - this.startPage + 1; //html에서 반복문을 수행하기 위해 현재 페이지 기준 전페 페이징 숫자를 계산
      this.pageArr = new Array(this.numOfPage);
      window.scrollTo(0,0);
    });
  }

  reloadPage() {
    this.timelineService.loadSpecificTimeline(this.user_id, this.select_user_id, this.page).subscribe((res: any) => {
      this.arr = res.rows;
      //this.row = this.arr.length;
      this.page = res.page;
      this.startPage = res.startPage;
      this.endPage = res.endPage;
      this.numOfPage = this.endPage - this.startPage + 1; //html에서 반복문을 수행하기 위해 현재 페이지 기준 전페 페이징 숫자를 계산
      this.pageArr = new Array(this.numOfPage);
    });
  }

  onLoadComment(board_idx: number) {
    //console.log(board_idx + " " + this.user_id);
    this.currentContentIdx = board_idx;
    this.timelineService.loadComment(this.user_id, board_idx).subscribe((res: any) => {
      this.commentArr = res.rows;
      //this.commentRow = this.commentArr.length;
    });
  }

  onClickLike(board_idx: number) {
    this.currentContentIdx = board_idx;
    this.timelineService.clickLike(this.user_id, board_idx).subscribe((res: any) => {
      if (res.status == true) {
        this.reloadPage();
      }
    });
  }

  onLoadLikeList(board_idx: number) {
    this.currentContentIdx = board_idx;
    this.timelineService.loadLikeList(board_idx).subscribe((res: any) => {
      this.likeListArr = res.rows;
      //this.likeListRow = this.likeListArr.length;
    });
  }

  checkUser(user_id: string) {
    console.log(user_id);
    if (user_id == this.user_id) {
      return true;
    } else {
      return false;
    }
  }

  writeComment(form: FormGroup) {
    const post = form.controls.comment.value;

    var temp_post = post;
    temp_post = temp_post.trim();

    if (temp_post == "") {
      alert("공백은 입력할 수 없어요~");
    } else {
      this.timelineService.writeComment(this.user_id, this.user_name, this.currentContentIdx, post).subscribe((res: any) => {
        this.onLoadComment(this.currentContentIdx);
        form.controls.comment.setValue(null);
      });
    }
  }

  deletePost(board_idx: number) {
    this.timelineService.deletePost(board_idx).subscribe((res: any) => {
      console.log("delete : " + board_idx);
      if (res.status == true) {
        alert("게시글이 삭제되었습니다.");
        this.reloadPage();
      }
    });
  }
}