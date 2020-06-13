import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TimelineService } from '../service/timeline.service';
import { AuthenticateService } from '../service/authenticate.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})

export class WriteComponent implements OnInit {
  isLogin: string;
  user_id: string;
  user_name: string;
  user_image: string;
  date: string;
  contentForm: FormGroup;
  url: SafeResourceUrl;
  imageSrc = '';
  @Output() reloadRequest = new EventEmitter();

  constructor(
    private fb: FormBuilder, private router: Router, private timelineService: TimelineService, private authenticateService: AuthenticateService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.contentForm = this.fb.group({
      content: [''],
      image: ['', Validators.required]
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
      this.date = res.date;
      console.log(res);
    });
  }

  write(form: FormGroup, files: FileList) {
    if (this.url == null) {
      const post = form.controls.content.value;
      var temp_post = post;
      temp_post = temp_post.trim();

      if (temp_post == "") {
        alert("공백은 입력할 수 없어요~");
      } else {
        this.timelineService.writePost(this.user_id, this.user_name, post).subscribe((res: any) => {
          if (res.status == true) {
            form.controls.content.setValue(null);
            //this.file = null;
            this.url = null;
            this.imageSrc = null;
            this.reloadeNewsfeed();
          }
        })
      }
    } else { //이미지 파일이 첨부 된 경우 실행
      const post = form.controls.content.value;

      var temp_post = post;
      if (temp_post == "") {
        temp_post = " ";
      }

      const formData = new FormData();
      formData.append('image', files[0]);

      this.timelineService.writePostIncludeImage(formData).subscribe((res: any) => { //폼데이터에 포함된 파일 먼저 서버에 저장
        if (res.filename) {
          this.timelineService.writePostIncludeImageName(this.user_id, this.user_name, temp_post, res.filename).subscribe((res: any) => {
            if (res.status == true) { //그 후 쓴 글 저장
              form.controls.content.setValue(null);
              //this.file = null;
              this.url = null;
              this.imageSrc = null;
              formData.delete('image');
              this.reloadeNewsfeed();
            }
          });
        }
      });
    }
  }

  reloadeNewsfeed() {
    this.reloadRequest.emit();
  }

  testFunction() {
    console.log("testSuccess");
  }

  change(files: FileList) {
    if (files && files.length > 0) {
      //this.file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result;
      }
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(files[0]));
    }
  }
}

